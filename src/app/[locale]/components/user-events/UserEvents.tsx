import { MapPin, Link as LinkIcon } from 'lucide-react'

import Link from 'next/link'

import styles from './UserEvents.module.css'

type Props = {
  name: string
  url: string
  timeZone: {
    origin: {
      name: string
    }
  }
  date: string
}

export const UserEvents = ({ name, url, timeZone, date }: Props) => {
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
    const formatHours = hours.toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${formattedDay} ${formattedMonth} ${formatHours}:${minutes} ${ampm}`
  }

  const formattedDate = formatDate(date)

  // TODO: move this component in correct place
  // TODO: move this component in correct place
  // TODO: move this component in correct place
  // TODO: move this component in correct place

  return (
    <>
      <div className={styles['container']}>
        <aside className={styles['aside']}>
          <time className={styles['date']}>{formattedDate}</time>
        </aside>
        <div className={styles['body']}>
          <Link className={styles['title-link']} href="#">
            <h2 className={styles['title']}>{name}</h2>
          </Link>
          <div className={styles['location']}>
            <MapPin size={14} />
            <span className={styles['location-text']}>
              {timeZone.origin.name}
            </span>
          </div>
          <div className={styles['link-container']}>
            <LinkIcon color="#888" size={14} />
            <Link className={styles['link']} href="#" target="_blank">
              {url}
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
