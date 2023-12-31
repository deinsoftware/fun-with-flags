import { Toaster } from 'react-hot-toast'
import { useLocale, NextIntlClientProvider } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'

import Provider from '@/components/organisms/auth/Provider'
import Header from '@/components/organisms/ui/Header'
import Footer from '@/components/organisms/ui/Footer'
import Notice from '@/components/molecules/gdpr/Notice'

import getRequestConfig from '@/libs/i18n'

import '@/styles/globals.css'
import '/node_modules/minireset.css/minireset.min.css'

// import { Inter } from 'next/font/google'
// const inter = Inter({ subsets: ['latin']})

export const generateMetadata = async () => {
  const t = await getTranslations('Index')

  return {
    title: {
      template: `%s | ${t('title')}`,
      default: t('title'),
    },
    description: t('description'),
    keywords: ['timezone', 'country', 'flags', 'events'],
    themeColor: [
      // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta/name/theme-color
      // ! pay attention, here should be the base color of each theme in hexadecimal
      { media: '(prefers-color-scheme: dark)', color: '#202020' },
      { media: '(prefers-color-scheme: light)', color: 'EMPTY' },
    ],
  }
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
        <Notice />
      </body>
    </Provider>
  )
}

type LocaleProps = { children: React.ReactNode; params: { locale: string } }

const LocaleLayout = async ({ children, params }: LocaleProps) => {
  const locale = useLocale()
  if (params.locale !== locale) {
    notFound()
  }

  let messages
  try {
    const config = await getRequestConfig(params)
    messages = config.messages
  } catch (error) {
    notFound()
  }

  return (
    <html lang={locale}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        <RootLayout>{children}</RootLayout>
      </NextIntlClientProvider>
    </html>
  )
}

export default LocaleLayout
