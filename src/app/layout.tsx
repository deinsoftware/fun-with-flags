import '../styles/globals.css'
import '/node_modules/minireset.css/minireset.min.css'
// import { Inter } from 'next/font/google'

import Provider from '@/app/components/organisms/auth/Provider'
import Header from '@/app/components/organisms/ui/Header'
import Footer from '@/app/components/organisms/ui/Footer'
import TitleOnPage from '@/app/components/atoms/ui/TitleOnPage'

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

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <Provider>
        
          <body>
            <Header />
            <TitleOnPage />

            {children}

            <Footer />
          </body>
        
      </Provider>
    </html>
  )
}

export default RootLayout
