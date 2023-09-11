import { Home, CalendarDays, CalendarPlus, Settings } from 'lucide-react'

import Link from 'next/link'

import styles from './Actions.module.css'

import { lucidIcons } from '@/libs/icon-config'

const Actions = () => {
  return (
    <>
      <div className={styles['container-icons']}>
        <Link className={styles['link']} href="/">
          <div className={styles['container-icon']}>
            <Home
              absoluteStrokeWidth={false}
              className={styles['icon']}
              color={lucidIcons.color.dark}
              size={lucidIcons.size}
              strokeWidth={lucidIcons.strokeWidth}
            />
            <span className={styles['name']}>Home</span>
          </div>
        </Link>

        <Link className={styles['link']} href="/events">
          <div className={styles['container-icon']}>
            <CalendarDays
              absoluteStrokeWidth={false}
              className={styles['icon']}
              color={lucidIcons.color.dark}
              size={lucidIcons.size}
              strokeWidth={lucidIcons.strokeWidth}
            />
            <span className={styles['name']}>Events</span>
          </div>
        </Link>

        <Link className={styles['link']} href="/events/create">
          <div className={styles['container-icon']}>
            <CalendarPlus
              absoluteStrokeWidth={false}
              className={styles['icon']}
              color={lucidIcons.color.dark}
              size={lucidIcons.size}
              strokeWidth={lucidIcons.strokeWidth}
            />
            <span className={styles['name']}>Create events</span>
          </div>
        </Link>

        <Link className={styles['link']} href="/settings">
          <div className={styles['container-icon']}>
            <Settings
              absoluteStrokeWidth={false}
              className={styles['icon']}
              color={lucidIcons.color.dark}
              size={lucidIcons.size}
              strokeWidth={lucidIcons.strokeWidth}
            />
            <span className={styles['name']}>Settings</span>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Actions
