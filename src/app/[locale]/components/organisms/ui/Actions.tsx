'use client'

import { Home, CalendarDays, CalendarPlus, Settings } from 'lucide-react'

import Link from 'next/link'

import { useTranslations } from 'next-intl'

import { usePathname } from 'next/navigation'

import { useSession } from 'next-auth/react'

import styles from './Actions.module.css'

import { lucidIcons } from '@/libs/icon-config'

const pathnameWithoutLanguageCode = (pathname: string) => {
  const prefixRegex = /^\/[a-z]{2}\//i
  let pathnameWithoutCode = pathname.replace(prefixRegex, '/')

  // In case of root path
  if (pathnameWithoutCode.length === 3) {
    pathnameWithoutCode = '/'
  }

  return pathnameWithoutCode
}

const Actions = () => {
  const t = useTranslations('Header.Actions')

  const pathname = usePathname()
  const navLinks = [
    {
      href: '/',
      name: t('home'),
      icon: (
        <Home
          absoluteStrokeWidth={false}
          className={styles['icon']}
          color={lucidIcons.color.main}
          size={lucidIcons.size}
          strokeWidth={lucidIcons.strokeWidth}
        />
      ),
    },
    {
      href: '/events/create',
      name: t('createEvent'),
      icon: (
        <CalendarPlus
          absoluteStrokeWidth={false}
          className={styles['icon']}
          color={lucidIcons.color.main}
          size={lucidIcons.size}
          strokeWidth={lucidIcons.strokeWidth}
        />
      ),
    },
    {
      href: '/settings',
      name: t('settings'),
      icon: (
        <Settings
          absoluteStrokeWidth={false}
          className={styles['icon']}
          color={lucidIcons.color.main}
          size={lucidIcons.size}
          strokeWidth={lucidIcons.strokeWidth}
        />
      ),
    },
  ]

  const session = useSession()

  if (session?.data) {
    navLinks.splice(1, 0, {
      href: '/events',
      name: t('events'),
      icon: (
        <CalendarDays
          absoluteStrokeWidth={false}
          className={styles['icon']}
          color={lucidIcons.color.main}
          size={lucidIcons.size}
          strokeWidth={lucidIcons.strokeWidth}
        />
      ),
    })
  }

  return (
    <>
      <div className={styles['container-icons']}>
        {navLinks.map(({ href, name, icon }) => (
          <Link
            key={href}
            className={`${styles['link']} ${
              pathnameWithoutLanguageCode(pathname) === href
                ? styles['is-active']
                : undefined
            }`}
            href={href}
          >
            <div className={styles['container-icon']}>
              {icon}
              <span className={styles['name']}>{name}</span>
            </div>
          </Link>
        ))}
      </div>
    </>
  )
}

export default Actions
