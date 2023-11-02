'use client'

import {
  MapPin,
  Link as LinkIcon,
  ChevronDown,
  Pencil,
  Copy,
  Trash2,
  Share2,
} from 'lucide-react'

import Link from 'next/link'

import { useFormatter } from 'next-intl'

import { useState } from 'react'

import { Events } from '@prisma/client'

import styles from './UserEvents.module.css'

import Button from '@/components/atoms/ui/Button'

import { lucidUserEvents } from '@/libs/icon-config'

type Props = Pick<Events, 'timeZone' | 'description' | 'name' | 'url'>

export const UserEvents = ({ name, url, timeZone, description }: Props) => {
  const date = new Date(timeZone.origin.date)
  const format = useFormatter()

  const dateToShow = (date: Date) => {
    const DAY_IN_SECONDS = 24 * 60 * 60 * 1000
    const now = new Date()
    const ONE_DAY_MORE = new Date(now.getTime() + DAY_IN_SECONDS)

    if (date < now) {
      return format.relativeTime(date, now)
    }
    if (date < ONE_DAY_MORE) {
      return format.relativeTime(date, { now, unit: 'hours' });
    }
    if (date > ONE_DAY_MORE) {
      return format.dateTime(date, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    }
  }

  const formattedDate = dateToShow(date)

  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className={styles['container']}>
        <aside className={styles['aside']}>
          <time className={styles['date']}>{formattedDate}</time>
          <div
            className={`${styles['icons']} ${
              isOpen ? styles['is-open'] : styles['']
            }`}
          >
            <div className={styles['icon']}>
              <Pencil
                color={lucidUserEvents.actions.color.main}
                size={lucidUserEvents.actions.size}
                strokeWidth={lucidUserEvents.actions.strokeWidth}
              />
            </div>
            <div className={styles['icon']}>
              <Copy
                color={lucidUserEvents.actions.color.main}
                size={lucidUserEvents.actions.size}
                strokeWidth={lucidUserEvents.actions.strokeWidth}
              />
            </div>
            <div className={styles['icon']}>
              <Trash2
                color={lucidUserEvents.actions.color.main}
                size={lucidUserEvents.actions.size}
                strokeWidth={lucidUserEvents.actions.strokeWidth}
              />
            </div>
            <div className={styles['icon']}>
              <Share2
                color={lucidUserEvents.actions.color.main}
                size={lucidUserEvents.actions.size}
                strokeWidth={lucidUserEvents.actions.strokeWidth}
              />
            </div>
          </div>
        </aside>
        <div className={styles['body']}>
          <div className={styles['content']}>
            <Link className={styles['title-link']} href="#">
              <h2 className={styles['title']}>{name}</h2>
            </Link>
            <div className={styles['location']}>
              <MapPin
                color={lucidUserEvents.content.color.gray}
                size={lucidUserEvents.content.size}
                strokeWidth={lucidUserEvents.content.strokeWidth}
              />
              <span className={styles['location-text']}>
                {timeZone.origin.name}
              </span>
            </div>
            <div
              className={`${styles['description-container']} ${
                isOpen ? styles['is-open'] : styles['']
              }`}
            >
              <p className={styles['description']}>{description}</p>
            </div>
            <div className={styles['link-container']}>
              <LinkIcon
                color={lucidUserEvents.content.color.gray}
                size={lucidUserEvents.content.size}
                strokeWidth={lucidUserEvents.content.strokeWidth}
              />
              <Link className={styles['link']} href="#" target="_blank">
                {url}
              </Link>
            </div>
          </div>
          <div
            className={`${styles['button-is-open']} ${
              isOpen ? styles['is-open'] : styles['']
            }`}
          >
            <Button handleClick={() => setIsOpen(!isOpen)}>
              <ChevronDown
                color={lucidUserEvents.actions.color.white}
                size={lucidUserEvents.actions.size}
                strokeWidth={lucidUserEvents.actions.strokeWidth}
              />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
