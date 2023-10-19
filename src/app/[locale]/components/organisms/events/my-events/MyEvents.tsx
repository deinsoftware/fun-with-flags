'use client'

import { useTranslations } from 'next-intl'

import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

import styles from './MyEvents.module.css'

import Title from '@/components/atoms/ui/Title'
import { UserEvents } from '@/components/user-events/UserEvents'
import { getEventsByUserName } from '@/services/event'

export const MyEvents = () => {
  const t = useTranslations('Events')
  const { data: session } = useSession()

  const [signal, setSignal] = useState<AbortSignal>()
  const [userName, setUserName] = useState('')
  const [myEvents, setMyEvents] = useState([])

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

    // please, don't use any type in the newData 😂
    getEventsByUserName(body, signal).then((newData: any) => {
      setMyEvents(newData.data)

      // response : {
      //   message: Boolean
      //   status: number
      //   data: {}
      // }
      
      //   console.log(newData)
    })
  }, [userName])


  // ¿cuál es el lugar adecuado para este componente?
  // ¿hay que crear carpetas para createEvent?

  return (
    <>
      <div className={styles['container-events']}>
        <Title>{t('title')}</Title>
        <main className={styles['events']}>
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
