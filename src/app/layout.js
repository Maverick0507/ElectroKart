
import { Inter } from 'next/font/google'
import { Providers } from "@/app/provider";
import './globals.css'
import Navbar from '@/components/Navbar/index'
import { AuthProvider } from '@/context/authContext';
import { CartProvider } from '@/context/cartContext';


const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>

        <Providers>
          <CartProvider>
            <AuthProvider>

              <Navbar />
              {children}


            </AuthProvider>
          </CartProvider>
        </Providers>
      </body>


    </html>
  )
}
