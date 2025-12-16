import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

/**
 * This layout reads an optional startup background color from environment variables:
 * - `NEXT_PUBLIC_STARTUP_BACKGROUND` (preferred for client visibility)
 * - `STARTUP_BACKGROUND` (server-only)
 *
 * If provided, the color will be applied as an inline `background-color` style on the <body>,
 * which takes precedence over the CSS variable-driven background. Accepts any valid CSS color
 * (hex, rgb(a), hsl(a), color name, etc).
 *
 * Example usage:
 *   NEXT_PUBLIC_STARTUP_BACKGROUND="#fffae6" npm run build
 */

const startupBg =
  process.env.NEXT_PUBLIC_STARTUP_BACKGROUND ?? process.env.STARTUP_BACKGROUND ?? undefined

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  // If a startupBg is provided, apply it inline to the body so it overrides the default CSS background.
  // The existing Tailwind classes and theme handling remain intact; inline style has higher priority.
  const bodyStyle = startupBg ? { backgroundColor: startupBg } : undefined

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />
      </head>
      <body style={bodyStyle}>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <h1>czy kolor istneje</h1>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
    creator: '@payloadcms',
  },
}
