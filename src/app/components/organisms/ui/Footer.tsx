import Link from 'next/link'

import { Home, CalendarDays, CalendarPlus, Settings } from 'lucide-react'

import styles from './Footer.module.css'

import { lucidIcons } from '@/libs/iconConfig'

const Footer = () => {
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
                color={lucidIcons.color.dark}
                size={lucidIcons.size}
                strokeWidth={lucidIcons.strokeWidth}
              />
            </div>
          </Link>

          <Link className="" href="/events">
            <div className={styles['container-icon']}>
              <CalendarDays
                absoluteStrokeWidth={false}
                className={styles['icon']}
                color={lucidIcons.color.dark}
                size={lucidIcons.size}
                strokeWidth={lucidIcons.strokeWidth}
              />
            </div>
          </Link>

          <Link className="" href="/events/create">
            <div className={styles['container-icon']}>
              <CalendarPlus
                absoluteStrokeWidth={false}
                className={styles['icon']}
                color={lucidIcons.color.dark}
                size={lucidIcons.size}
                strokeWidth={lucidIcons.strokeWidth}
              />
            </div>
          </Link>

          <Link className="" href="/settings">
            <div className={styles['container-icon']}>
              <Settings
                absoluteStrokeWidth={false}
                className={styles['icon']}
                color={lucidIcons.color.dark}
                size={lucidIcons.size}
                strokeWidth={lucidIcons.strokeWidth}
              />
            </div>
          </Link>
        </div>
      </footer>
    </>
  )
}

export default Footer
