import { getTranslations } from 'next-intl/server'

import { getServerSession } from 'next-auth'

import { Events } from '@prisma/client'

import styles from './page.module.css'

import { UserEvents } from '@/components/molecules/user-events/UserEvents'

import { authOptions } from '@/libs/auth'
import { getEventsByUserName } from '@/services/event'

import Title from '@/components/atoms/ui/Title'

export const generateMetadata = async () => {
  const t = await getTranslations('Events')

  return {
    title: t('title'),
  }
}

const EventsPage = async () => {
  const t = await getTranslations('Events')

  const session = await getServerSession(authOptions)

  const body = {
    userName: session?.user?.name ?? '',
  }

  const { signal } = new AbortController()
  const { data } = await getEventsByUserName(body, signal)

  return (
    <>
      <div className={styles['container-events']}>
        <Title>{t('title')}</Title>
        <main className={styles['events']}>
          {/* TODO: ADD MESSAGE WHEN STATUS ISN'T 200 */}
          {data?.map((event: Events) => {
            return <UserEvents key={event.id} {...event} />
          })}
        </main>
      </div>
    </>
  )
}

export default EventsPage
