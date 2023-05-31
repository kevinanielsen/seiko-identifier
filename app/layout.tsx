import AuthContext from './context/AuthContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Seiko Identifier',
  description: 'A website that helps you identify your seiko watch',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          {children}
        </AuthContext>
      </body>
    </html>
  )
}
