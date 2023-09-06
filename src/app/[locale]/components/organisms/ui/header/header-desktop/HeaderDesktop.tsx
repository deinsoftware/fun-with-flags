import { Home, CalendarDays, CalendarPlus, Settings } from 'lucide-react'

import Link from 'next/link'

import Image from 'next/image'

import styles from './HeaderDesktop.module.css'

import { lucidIcons } from '@/libs/icon-config'
import LoginButton from '@/components/atoms/auth/LoginButton'

const HeaderDesktop = () => {
  return (
    <>
      <header className={styles['header']}>
        <h1 className={styles['title']}>{`<HeaderDesktop>`}</h1>
        <Image alt="Logo" height={60} src="/img/logo.png" width={200} />
        <nav className={styles['nav']}>
          <ul className={styles['nav-list']}>
            <li>
              <Link className={styles['nav-item']} href="/">
                <Home
                  absoluteStrokeWidth={false}
                  className={styles['icon']}
                  color={lucidIcons.color.dark}
                  size={lucidIcons.size}
                  strokeWidth={lucidIcons.strokeWidth}
                />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link className={styles['nav-item']} href="/events">
                <CalendarDays
                  absoluteStrokeWidth={false}
                  className={styles['icon']}
                  color={lucidIcons.color.dark}
                  size={lucidIcons.size}
                  strokeWidth={lucidIcons.strokeWidth}
                />
                <span>Events</span>
              </Link>
            </li>
            <li>
              <Link className={styles['nav-item']} href="/events/create">
                <CalendarPlus
                  absoluteStrokeWidth={false}
                  className={styles['icon']}
                  color={lucidIcons.color.dark}
                  size={lucidIcons.size}
                  strokeWidth={lucidIcons.strokeWidth}
                />
                <span>Create Event</span>
              </Link>
            </li>
            <li>
              <Link className={styles['nav-item']} href="/settings">
                <Settings
                  absoluteStrokeWidth={false}
                  className={styles['icon']}
                  color={lucidIcons.color.dark}
                  size={lucidIcons.size}
                  strokeWidth={lucidIcons.strokeWidth}
                />
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <LoginButton />
        </div>
      </header>
    </>
  )
}

export default HeaderDesktop
