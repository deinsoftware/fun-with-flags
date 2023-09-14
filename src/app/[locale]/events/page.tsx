import { getTranslator } from 'next-intl/server'

import Title from '../components/atoms/ui/Title'

import styles from './page.module.css'

import { MetadataProps } from '@/app/layout.types'

import { UserEvents } from '@/components/user-events/UserEvents'

export const generateMetadata = async ({
  params: { locale },
}: MetadataProps) => {
  const t = await getTranslator(locale, 'Events')

  return {
    title: t('title'), // TODO: <- this doesn't exist
  }
}

// FIXME: replace with real function
const fetchEventsByUsername = async () => {
  const res = await fetch('https://api.npoint.io/ea816db8fdd340c3518d')
  return await res.json()
}

const EventsPage = async () => {
  const events = await fetchEventsByUsername()

  return (
    <>
      <div className={styles['container-events']}>
        <Title>Eventos</Title> {/* TODO: <- this doesn't exist in messages */}
        <main className={styles['events']}>
          {events.map((event) => {
            return (
              <UserEvents
                key={event.id}
                date={event.createdAt}
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
