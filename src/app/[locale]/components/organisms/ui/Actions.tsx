import { Home, CalendarDays, CalendarPlus, Settings } from 'lucide-react'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import styles from './Actions.module.css'

import { lucidIcons } from '@/libs/icon-config'

const Actions = () => {
  const t = useTranslations('Header.Actions')

  return (
    <>
      <div className={styles['container-icons']}>
        <Link className={styles['link']} href="/">
          <div className={styles['container-icon']}>
            <Home
              absoluteStrokeWidth={false}
              className={styles['icon']}
              color={lucidIcons.color.main}
              size={lucidIcons.size}
              strokeWidth={lucidIcons.strokeWidth}
            />
            <span className={styles['name']}>{t('home')}</span>
          </div>
        </Link>

        <Link className={styles['link']} href="/events">
          <div className={styles['container-icon']}>
            <CalendarDays
              absoluteStrokeWidth={false}
              className={styles['icon']}
              color={lucidIcons.color.main}
              size={lucidIcons.size}
              strokeWidth={lucidIcons.strokeWidth}
            />
            <span className={styles['name']}>{t('events')}</span>
          </div>
        </Link>

        <Link className={styles['link']} href="/events/create">
          <div className={styles['container-icon']}>
            <CalendarPlus
              absoluteStrokeWidth={false}
              className={styles['icon']}
              color={lucidIcons.color.main}
              size={lucidIcons.size}
              strokeWidth={lucidIcons.strokeWidth}
            />
            <span className={styles['name']}>{t('createEvent')}</span>
          </div>
        </Link>

        <Link className={styles['link']} href="/settings">
          <div className={styles['container-icon']}>
            <Settings
              absoluteStrokeWidth={false}
              className={styles['icon']}
              color={lucidIcons.color.main}
              size={lucidIcons.size}
              strokeWidth={lucidIcons.strokeWidth}
            />
            <span className={styles['name']}>{t('settings')}</span>
          </div>
        </Link>
      </div>
    </>
  )
}

export default Actions
