import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import NavBar from './components/nav/NavBar'
import Footer from './components/footer/Footer'
import CartProvider from '@/providers/CartProvider'
import { Toaster } from 'react-hot-toast'

const font = Roboto({subsets: ["latin"], weight:["400"]})

export const metadata: Metadata = {
  title: 'SipDrop',
  description: 'ecommerce app',
  icons: {
    icon: '/sipdrop.logo.png', 
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="pt-br">
      <body className={`${font.className} text-slate-950`}>
        <Toaster 
          toastOptions={{
            style:{
              background: 'rgba(51 65 85)',
              color: '#fff'
            }
          }}
        />
        <CartProvider>
          <div className='flex flex-col min-h-screen'>
            <NavBar/>
              <main className='flex-grow bg-gray-100'>
                {children}
              </main>
            <Footer/>
          </div>
        </CartProvider>
      </body>
    </html>
  )
}
