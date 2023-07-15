import '../styles/globals.css'
// import { Inter } from 'next/font/google'
import Provider from './components/Provider'
import Header from './components/Header'
import Footer from './components/Footer'
import TitleOnPage from './components/TitleOnPage'

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
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
