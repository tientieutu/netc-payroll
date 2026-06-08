import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

// 1. Cấu hình màu chủ đạo cho PWA (Thay cho thẻ <meta name="theme-color">)
export const viewport: Viewport = {
  themeColor: '#4f46e5',
}

// 2. Tích hợp Manifest và Apple Icon thẳng vào Metadata
export const metadata: Metadata = {
  title: 'NETC | Hệ thống Tính lương',
  description: 'Hệ thống tính lương doanh nghiệp NETC theo quy chế nội bộ',
  generator: 'v0.app',
  manifest: '/manifest.json', // <-- Khai báo PWA ở đây
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/icon-192.png', // <-- Logo riêng cho thiết bị iOS
  },
}

// 3. Giữ nguyên khung xương HTML của ứng dụng
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="vi">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* Nơi chứa toàn bộ giao diện app của bạn */}
        {children} 
        <Analytics />
      </body>
    </html>
  )
}