import '../styles/globals.css'
import '/node_modules/minireset.css/minireset.min.css'
// import { Inter } from 'next/font/google'

import { Toaster } from 'react-hot-toast'

import Provider from '@/app/components/organisms/auth/Provider'
import Header from '@/app/components/organisms/ui/Header'
import Footer from '@/app/components/organisms/ui/Footer'
import CookiePolicy from '@/app/components/molecules/gdpr/CookiePolicy'

// const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: {
    template: '%s | Fun With Flags',
    default: 'Fun With Flags',
  },
  description: 'Time zone with country flags for events',
  keywords: ['EMPTY', 'EMPTY', 'EMPTY'],
  themeColor: [
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
    // ! pay attention, here should be the base color of each theme in hexadecimal
    { media: '(prefers-color-scheme: dark)', color: '#202020' },
    { media: '(prefers-color-scheme: light)', color: 'EMPTY' },
  ],
}

type Props = { children: React.ReactNode }

const RootLayout = ({ children }: Props) => {
  return (
    <html lang="en">
      <Provider>
        <body>
          <Toaster position="top-center" reverseOrder={false} />
          <Header />
          {children}
          <Footer />
          <CookiePolicy />
        </body>
      </Provider>
    </html>
  )
}

export default RootLayout
