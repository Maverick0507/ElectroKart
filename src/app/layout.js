
import { Inter } from 'next/font/google'
import { Providers } from "@/app/provider";
import './globals.css'
import Navbar from '@/components/Navbar/index'
import { AuthProvider } from '@/context/authContext';
import { CartProvider } from '@/context/cartContext';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] })


export const metadata = {
  title: "ElectroMart",
  description: "Designed and Developed by Prashant",
};

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

<Script src ="https://checkout.razorpay.com/v1/checkout.js"/>
    </html>
  )
}
