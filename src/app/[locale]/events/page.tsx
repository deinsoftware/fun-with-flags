import { getTranslator } from 'next-intl/server'

import { useTranslations } from 'next-intl'

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

const fetchEventsByUsername = async () => {
  const res = await fetch('https://api.npoint.io/ea816db8fdd340c3518d')
  return await res.json()
}

const EventsPage = async () => {
  // const t = useTranslations('Events')
  const events = await fetchEventsByUsername()

  /*
  TODO:
  - used 'any' in typeScript -> inside .map
  - titleOnPage doesn't exist in messages
  - metadata title doesn't exist in messages
  - titleOnPage doesn't exist in messages
  - replace with real function (fetching)
  */

  return (
    <>
      <div className={styles['container-events']}>
        {/* <Title>{t('title')}</Title> */}
        <Title>{`Eventos`}</Title>
        <main className={styles['events']}>
          {events.map((event: any) => {
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
