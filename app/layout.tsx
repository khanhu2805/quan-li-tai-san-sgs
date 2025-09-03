import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-sans', // Gán biến CSS để có thể dùng trong tailwind.config
})

export const metadata: Metadata = {
  title: 'Quản lí tài sản SGS',
  description: 'Created with v0',
  generator: 'v0.app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${beVietnamPro.variable} font-sans`}>
        {children}
      </body>
    </html>
  )
}
