import { getTranslator } from 'next-intl/server'

import { useTranslations } from 'next-intl'

import { useSession } from 'next-auth/react'

import Title from '../components/atoms/ui/Title'

import styles from './page.module.css'

import { MetadataProps } from '@/app/layout.types'

import { UserEvents } from '@/components/user-events/UserEvents'
import { getEventsByUserName } from '@/services/event'

export const generateMetadata = async ({
  params: { locale },
}: MetadataProps) => {
  const t = await getTranslator(locale, 'Events')

  return {
    title: t('title'),
  }
}

const controller = new AbortController()
const signal = controller.signal
controller.abort()

const EventsPage = async () => {
  // const t = useTranslations('Events')
  // const { data: session } = useSession()
  const body = {
    // userName: session?.user?.name as string,
    userName: 'ejrb1234',
  }
  const response = await getEventsByUserName(body)
  const { data: events } = response
  // console.log(response)

  /*
  TODO:
  - used 'any' in typeScript -> inside .map
  */

  return (
    <>
      <div className={styles['container-events']}>
        <Title>{'Mis eventos'}</Title>
        {/* <Title>{t('title')}</Title> */} {/* error de async */}
        <main className={styles['events']}>
          {/* <p>{JSON.stringify(events)}</p> */}
          {events?.map((event: any) => {
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

export default EventsPage
