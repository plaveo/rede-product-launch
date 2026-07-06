import type { Metadata } from 'next'
import QRCode from 'qrcode'
import { PrintButton } from '@/components/rede/print-button'

export const metadata: Metadata = {
  title: 'REDE Pilot — Booth QR Codes',
  description:
    'Scan-to-open QR codes for field work: apply to the REDE Pilot Program or answer the stress test survey on the spot.',
}

const BASE_URL = 'https://rede-product-launch.vercel.app'

const CODES = [
  {
    key: 'survey',
    title: 'Answer the Survey',
    caption: 'For agents who just tried REDE at the booth.',
    url: `${BASE_URL}/survey`,
    label: 'rede-product-launch.vercel.app/survey',
  },
  {
    key: 'apply',
    title: 'Join the Pilot',
    caption: 'For those who want early access to REDE.',
    url: `${BASE_URL}/stress-test`,
    label: 'rede-product-launch.vercel.app/stress-test',
  },
] as const

async function makeQr(url: string) {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: 'M',
    margin: 1,
    width: 640,
    color: { dark: '#0b1220', light: '#ffffff' },
  })
}

export default async function QrPage() {
  const rendered = await Promise.all(
    CODES.map(async (c) => ({ ...c, dataUrl: await makeQr(c.url) })),
  )

  return (
    <main className="min-h-dvh bg-background px-5 py-12 print:bg-white print:py-6">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 text-center print:mb-6">
          <p className="font-rede text-sm font-semibold tracking-tight text-primary print:text-black">
            REDE Pilot Program
          </p>
          <h1 className="font-display mt-2 text-balance text-3xl font-bold text-foreground sm:text-4xl print:text-black">
            Scan to Join
          </h1>
          <p className="mx-auto mt-3 max-w-md text-pretty leading-relaxed text-muted-foreground print:text-neutral-600">
            Point your phone camera at a code below. No app to install — it opens
            right in your browser.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2">
          {rendered.map((c) => (
            <section
              key={c.key}
              className="flex flex-col items-center rounded-2xl border border-border bg-card p-6 text-center print:break-inside-avoid print:border-neutral-300 print:bg-white"
            >
              <h2 className="font-display text-xl font-bold text-foreground print:text-black">
                {c.title}
              </h2>
              <p className="mt-1 mb-5 min-h-10 text-sm leading-relaxed text-muted-foreground print:text-neutral-600">
                {c.caption}
              </p>
              <div className="rounded-xl bg-white p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={c.dataUrl || '/placeholder.svg'}
                  alt={`QR code linking to ${c.label}`}
                  width={240}
                  height={240}
                  className="h-56 w-56"
                />
              </div>
              <p className="mt-4 break-all text-xs text-muted-foreground print:text-neutral-500">
                {c.label}
              </p>
            </section>
          ))}
        </div>

        <div className="mt-10 flex justify-center print:hidden">
          <PrintButton />
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground print:hidden">
          Tip: Print this page or save it as PDF to display at the booth.
        </p>
      </div>
    </main>
  )
}
