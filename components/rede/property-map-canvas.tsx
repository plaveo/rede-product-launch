'use client'

import { useEffect, useRef } from 'react'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'

export type MapProperty = {
  id: string
  name: string
  district: string
  score: number
  grade: string
  verdict: string
  lng: number
  lat: number
}

function toneFor(score: number) {
  if (score >= 80) return 'oklch(0.7 0.14 150)'
  if (score >= 55) return 'oklch(0.78 0.14 85)'
  return 'oklch(0.6 0.16 25)'
}

const METRO_CENTER: [number, number] = [121.035, 14.554]

export function PropertyMapCanvas({
  properties,
  activeId,
  onSelect,
}: {
  properties: MapProperty[]
  activeId: string
  onSelect: (id: string) => void
}) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const markersRef = useRef<Record<string, maplibregl.Marker>>({})
  const onSelectRef = useRef(onSelect)
  onSelectRef.current = onSelect

  // init map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return

    const map = new maplibregl.Map({
      container: containerRef.current,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: METRO_CENTER,
      zoom: 10.6,
      pitch: 30,
      bearing: -18,
      attributionControl: false,
      antialias: true,
    })
    mapRef.current = map

    map.addControl(
      new maplibregl.NavigationControl({ showCompass: true, visualizePitch: true }),
      'top-right',
    )
    map.addControl(
      new maplibregl.AttributionControl({ compact: true }),
      'bottom-right',
    )

    map.on('load', () => {
      // 3D building extrusions from the OpenMapTiles "building" source-layer
      const layers = map.getStyle().layers ?? []
      const firstSymbol = layers.find((l) => l.type === 'symbol')?.id

      if (!map.getLayer('rede-3d-buildings')) {
        map.addLayer(
          {
            id: 'rede-3d-buildings',
            source: 'carto',
            'source-layer': 'building',
            type: 'fill-extrusion',
            minzoom: 13,
            paint: {
              'fill-extrusion-color': [
                'interpolate',
                ['linear'],
                ['coalesce', ['get', 'render_height'], ['get', 'height'], 12],
                0,
                '#2a3150',
                80,
                '#3a4675',
              ],
              'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                13,
                0,
                15.5,
                ['coalesce', ['get', 'render_height'], ['get', 'height'], 12],
              ],
              'fill-extrusion-base': ['coalesce', ['get', 'render_min_height'], 0],
              'fill-extrusion-opacity': 0.7,
            },
          },
          firstSymbol,
        )
      }
    })

    // build custom markers
    properties.forEach((p) => {
      const el = document.createElement('button')
      el.type = 'button'
      el.setAttribute('aria-label', `${p.name}, decision score ${p.score}`)
      el.className = 'rede-map-marker'
      el.dataset.id = p.id
      el.textContent = p.grade
      const tone = toneFor(p.score)
      el.style.setProperty('--tone', tone)
      el.addEventListener('click', (e) => {
        e.stopPropagation()
        onSelectRef.current(p.id)
      })

      const marker = new maplibregl.Marker({ element: el, anchor: 'center' })
        .setLngLat([p.lng, p.lat])
        .addTo(map)
      markersRef.current[p.id] = marker
    })

    return () => {
      Object.values(markersRef.current).forEach((m) => m.remove())
      markersRef.current = {}
      map.remove()
      mapRef.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // reflect active state: highlight marker + cinematic aerial → descend
  useEffect(() => {
    const map = mapRef.current
    Object.entries(markersRef.current).forEach(([id, marker]) => {
      const el = marker.getElement()
      el.classList.toggle('is-active', id === activeId)
      el.style.zIndex = id === activeId ? '20' : '10'
    })

    const active = properties.find((p) => p.id === activeId)
    if (!map || !active) return

    const target: [number, number] = [active.lng, active.lat]

    // Cinematic two-stage move:
    //   Stage 1 — rise to a high, near top-down aerial directly over the target.
    //   Stage 2 — descend and tilt down into the 3D building view.
    const descend = () => {
      // Stage 1: pull straight up to a high aerial (flatten pitch, zoom out).
      map.flyTo({
        center: target,
        zoom: 9.6,
        pitch: 0,
        bearing: 0,
        duration: 1100,
        curve: 1.5,
        essential: true,
      })
      map.once('moveend', () => {
        // brief hold at altitude, then descend into the property.
        window.setTimeout(() => {
          map.flyTo({
            center: target,
            zoom: 16,
            pitch: 64,
            bearing: -28,
            duration: 3000,
            curve: 1.9,
            speed: 0.6,
            essential: true,
          })
        }, 220)
      })
    }

    if (map.isStyleLoaded()) {
      descend()
    } else {
      map.once('load', descend)
    }
  }, [activeId, properties])

  return (
    <div
      ref={containerRef}
      className="h-[340px] w-full md:h-[460px]"
      aria-label="Interactive 3D property map of Metro Manila"
      role="application"
    />
  )
}
