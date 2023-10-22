'use client'

import { useTranslations } from 'next-intl'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import styles from './MyEvents.module.css'

import Title from '@/components/atoms/ui/Title'
import { UserEvents } from '@/components/molecules/user-events/UserEvents'
import { getEventsByUserName } from '@/services/event'
import { TimeZoneData } from '@/types/context.types'

export const MyEvents = () => {
  const t = useTranslations('Events')
  const { data: session } = useSession()

  const [signal, setSignal] = useState<AbortSignal>()
  const [userName, setUserName] = useState('')
  const [myEvents, setMyEvents] = useState<object[]>([])

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    setSignal(signal)

    return () => {
      controller.abort()
    }
  }, [])

  useEffect(() => {
    const username = session?.user?.name
    setUserName(username as string)
  }, [session])

  useEffect(() => {
    if (!userName) return

    const body = {
      userName: userName,
    }

    type ResponseEvents = {
      ok: boolean
      status: number
      data: object[]
    }

    getEventsByUserName(body, signal).then((newData: ResponseEvents) => {
      const { data } = newData
      setMyEvents(data as object[])
    })
  }, [userName])

  type Event = {
    id: string
    createdAt: string // definir cuál es la fecha que se utilizará, esta fue por el ejemplo
    description: string
    name: string
    timeZone: TimeZoneData
    url: string
  }

  return (
    <>
      <div className={styles['container-events']}>
        <Title>{t('title')}</Title>
        <main className={styles['events']}>
          {/* FIXME: Type 👇🏻👇🏻👇🏻 */}
          {myEvents?.map((event: any) => {
            return (
              <UserEvents
                key={event.id}
                date={event.createdAt}
                description={event.description}
                name={event.name}
                timeZone={event.timeZone}
                url={event.url}
              />
            )
          })}
        </main>
      </div>
    </>
  )
}
