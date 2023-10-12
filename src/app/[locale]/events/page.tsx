import { getTranslator } from 'next-intl/server'

import { MetadataProps } from '@/app/layout.types'

export const generateMetadata = async ({
  params: { locale },
}: MetadataProps) => {
  const t = await getTranslator(locale, 'Events')

  return {
    title: t('title'),
  }
}

const EventsPage = () => {
  return <></>
}

export default EventsPage
