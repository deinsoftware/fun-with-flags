import '../../styles/globals.css'
// import { Inter } from 'next/font/google'
import Provider from './components/Provider'
import Header from './components/Header'
// import Footer from './components/Footer'
import FooterTwo from './components/FooterTwo'
import TitleOnPage from './components/TitleOnPage'

// const inter = Inter({ subsets: ['latin']})

export const metadata = {
  title: 'Fun With Flags',
  description: 'Time zone with country flags for events',
}

export default function RootLayout({
  children
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

          {/* <Footer /> */}
          <FooterTwo />
        </body> 
      </Provider>
      
    </html>
  )
}
