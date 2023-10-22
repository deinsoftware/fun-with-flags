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

import { useState } from 'react'

import Button from '../../atoms/ui/Button'

import styles from './UserEvents.module.css'

import { lucidUserEvents } from '@/libs/icon-config'

type Props = {
  name: string
  url: string
  timeZone: {
    origin: {
      name: string
    }
  }
  date: string
  description: string
}

export const UserEvents = ({
  name,
  url,
  timeZone,
  date,
  description,
}: Props) => {
  const getMonthName = (monthIndex: number) => {
    const months = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ]

    return months[monthIndex]
  } // <- How to do this better?

  const capitalizeFirstLetter = (string: string | undefined) => {
    if (!string) return ''
    return string?.charAt(0).toUpperCase() + string?.slice(1)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const formattedDay = date.getDate()
    const month = getMonthName(date.getMonth())?.substring(0, 3).toLowerCase()
    const formattedMonth = capitalizeFirstLetter(month)
    const hours = date.getHours()
    const ampm = hours >= 12 ? 'p. m.' : 'a. m.'
    const formattedHours = hours.toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${formattedDay} ${formattedMonth} ${formattedHours}:${minutes} ${ampm}`
  }

  const formattedDate = formatDate(date)

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
