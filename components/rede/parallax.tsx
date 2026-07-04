'use client'

import { useEffect, useRef, type ReactNode } from 'react'

/**
 * Subtle, GPU-accelerated scroll parallax.
 * As the element travels through the viewport it gently scales and lifts.
 * Uses a single rAF loop driven by scroll, transform-only (no layout thrash).
 */
export function Parallax({
  children,
  className = '',
  scaleFrom = 0.94,
  lift = 26,
}: {
  children: ReactNode
  className?: string
  scaleFrom?: number
  lift?: number
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let ticking = false

    const update = () => {
      ticking = false
      const rect = node.getBoundingClientRect()
      const vh = window.innerHeight || 1
      // progress: 0 when entering from bottom, 1 when centered/above
      const raw = 1 - (rect.top + rect.height * 0.35) / vh
      const p = Math.min(Math.max(raw, 0), 1)
      const scale = scaleFrom + (1 - scaleFrom) * p
      const translate = lift * (1 - p)
      node.style.transform = `translate3d(0, ${translate.toFixed(2)}px, 0) scale(${scale.toFixed(4)})`
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [scaleFrom, lift])

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: 'transform', transformOrigin: 'center top' }}
    >
      {children}
    </div>
  )
}
