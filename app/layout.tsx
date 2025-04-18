import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Banca Electrónica',
  description: 'La Koope',
  generator: 'banca.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
