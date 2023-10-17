import { getTranslator } from 'next-intl/server'

import { MyEvents } from '@/components/organisms/events/my-events/MyEvents'

import { MetadataProps } from '@/app/layout.types'

export const generateMetadata = async ({
  params: { locale },
}: MetadataProps) => {
  const t = await getTranslator(locale, 'Events')

  return {
    title: t('title'),
  }
}

const EventsPage = async () => {
  return (
    <>
      <MyEvents />
    </>
  )
}

export default EventsPage
