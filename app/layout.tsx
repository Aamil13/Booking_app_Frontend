import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/shared/Navbar'
import { Providers } from '@/redux/Provider'

import dynamic from 'next/dynamic'
import { Toaster } from 'react-hot-toast'
 
const NoSSR = dynamic(() => import('@/app/components/shared/Navbar'), { ssr: false })
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
        <NoSSR/>
        <div><Toaster/></div>
        {children}
        </Providers>
        </body>
    </html>
  )
}
