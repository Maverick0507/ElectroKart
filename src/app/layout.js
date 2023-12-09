
import { Inter } from 'next/font/google'
import { Providers } from "@/app/provider";
import './globals.css'
import Navbar from '@/components/Navbar/index'
import  { AuthProvider } from '@/context/authContext';

const inter = Inter({ subsets: ['latin'] })



export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={inter.className}>

        <Providers>
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
        </Providers>
      </body>


    </html>
  )
}
