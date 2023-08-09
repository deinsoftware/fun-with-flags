import Link from 'next/link'

import { Home, CalendarDays, CalendarPlus, Settings } from 'lucide-react'

import styles from './Footer.module.css'

const Footer = () => {
  const sizeIcon = 24
  const colorIcon = '#454545'
  const strokeWidthIcon = 2

  return (
    <>
      <div className={styles['footer-pusher']} />

      <footer className={styles['footer']}>
        <div className={styles['container-icons']}>
          <Link className="" href="/">
            <div className={styles['container-icon']}>
              <Home
                absoluteStrokeWidth={false}
                className={styles['icon']}
                color={colorIcon}
                size={sizeIcon}
                strokeWidth={strokeWidthIcon}
              />
            </div>
          </Link>

          <Link className="" href="/events">
            <div className={styles['container-icon']}>
              <CalendarDays
                absoluteStrokeWidth={false}
                className={styles['icon']}
                color={colorIcon}
                size={sizeIcon}
                strokeWidth={strokeWidthIcon}
              />
            </div>
          </Link>

          <Link className="" href="/events/create">
            <div className={styles['container-icon']}>
              <CalendarPlus
                absoluteStrokeWidth={false}
                className={styles['icon']}
                color={colorIcon}
                size={sizeIcon}
                strokeWidth={strokeWidthIcon}
              />
            </div>
          </Link>

          <Link className="" href="/settings">
            <div className={styles['container-icon']}>
              <Settings
                absoluteStrokeWidth={false}
                className={styles['icon']}
                color={colorIcon}
                size={sizeIcon}
                strokeWidth={strokeWidthIcon}
              />
            </div>
          </Link>
        </div>
      </footer>
    </>
  )
}

export default Footer
