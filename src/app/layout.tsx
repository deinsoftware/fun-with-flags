import '../../styles/globals.css'
// import { Inter } from 'next/font/google'

// import Head from 'next/head' // old <Head>

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
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*   
    //  <Head>
    //     <title>Fun With Flags</title>
    //     <meta
    //       name="description"
    //       content="Time zone with country flags for events"
    //     />
    //     <link rel="icon" href="favicon.ico" />
    //   </Head>
    */}

      <body>
        <Header />
        <TitleOnPage />

        {children}

        <Footer />
      </body>
    </html>
  )
}
