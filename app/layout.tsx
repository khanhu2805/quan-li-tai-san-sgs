import type { Metadata } from 'next'
import { Be_Vietnam_Pro } from 'next/font/google'
import './globals.css'
import { Sidebar } from '@/components/ui-custom/sidebar'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import { useState } from 'react'
import { AppLayout } from '@/components/ui-custom/app-layout'

const beVietnamPro = Be_Vietnam_Pro({
  subsets: ['vietnamese', 'latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
  variable: '--font-sans',
})

// Cập nhật metadata để thêm icon
export const metadata: Metadata = {
  title: 'Quản lý tài sản SGS',
  description: 'Hệ thống quản lý và bàn giao tài sản chuyên nghiệp SGS.',
  icons: {
    // Icon chính cho trình duyệt
    icon: 'favicon_io/favicon-32x32.png',
    // Icon cho các lối tắt (shortcut) trên màn hình desktop
    shortcut: 'favicon_io/favicon-32x32.png',
    // Icon cho thiết bị Apple khi ghim ra màn hình chính
    apple: 'favicon_io/apple-touch-icon.png',
    // Các loại icon khác, ví dụ cho các phiên bản Android cũ
    other: [
      {
        rel: 'apple-touch-icon-precomposed',
        url: 'favicon_io/android-chrome-512x512.png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${beVietnamPro.variable} font-sans`}>
        {/* Render Client Component mới để xử lý layout tương tác */}
        <AppLayout>
          <div className="lg:ml-64">
            {children}
          </div>
        </AppLayout>
      </body>
    </html>
  )
}
