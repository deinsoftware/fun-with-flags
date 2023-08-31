import { Toaster } from 'react-hot-toast'
import { useLocale } from 'next-intl'
import { notFound } from 'next/navigation'

import Provider from '@/app/[locale]/components/organisms/auth/Provider'
import Header from '@/app/[locale]/components/organisms/ui/Header'
import Footer from '@/app/[locale]/components/organisms/ui/Footer'
import CookiePolicy from '@/app/[locale]/components/molecules/gdpr/CookiePolicy'

import '@/styles/globals.css'
import '/node_modules/minireset.css/minireset.min.css'

// import { Inter } from 'next/font/google'
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

type RootProps = { children: React.ReactNode }

const RootLayout = ({ children }: RootProps) => {
  return (
    <Provider>
      <body>
        <Toaster position="top-center" reverseOrder={false} />
        <Header />
        {children}
        <Footer />
        <CookiePolicy />
      </body>
    </Provider>
  )
}

type LocaleProps = { children: React.ReactNode; params: { locale: string } }

const LocaleLayout = ({ children, params }: LocaleProps) => {
  const locale = useLocale()

  // Validate that the incoming `locale` parameter is a valid locale
  if (params.locale !== locale) {
    notFound()
  }

  return (
    <html lang={locale}>
      <RootLayout>{children}</RootLayout>
    </html>
  )
}

export default LocaleLayout
