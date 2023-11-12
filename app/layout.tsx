import Link from 'next/link'
import './globals.css'
import { Inter } from 'next/font/google'
import { Analytics } from '@/components/analytics'
import { IM } from '@/components/icons'

const inter = Inter({ subsets: ['latin'] })

export const runtime = 'edge'

export const metadata = {
  title: {
    default: 'Igor Matheus',
    template: '%s | Igor Matheus',
  },
  description: 'Brazilian web developer',
  metadataBase: new URL('https://igormatheus.com.br/'),
  twitter: {
    title: 'Igor Matheus',
    description: 'Brazilian web developer',
    card: 'summary_large_image',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  icons: {
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  openGraph: {
    title: 'Igor Matheus',
    siteName: 'Igor Matheus',
    description: 'Brazilian web developer',
    url: 'https://igormatheus.com.br/',
    type: 'website',
    locale: 'pt-BR',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang='en'>
      <body className={`min-h-screen antialiased ${inter.className}`}>
        <div className='mx-auto max-w-2xl px-4 py-10'>
          <header>
            <div className='flex items-center justify-between'>
              <Link href='/'>
                <IM className='h-10 w-10' />
              </Link>
              <nav className='ml-auto space-x-6 text-sm font-medium'>
                <Link href='/'>Home</Link>
                <Link href='/about'>About</Link>
              </nav>
            </div>
          </header>
          <main>{children}</main>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
