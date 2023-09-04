import {  getTranslator } from 'next-intl/server'

import CreateEvent from '@/components/organisms/events/CreateEvent'
import { TimeZoneProvider } from '@/context/timeZoneContext'
import { MetadataProps } from '@/app/layout.types'

export const generateMetadata = async({params: {locale}}: MetadataProps) => {
  const t = await getTranslator(locale, 'Events.Create')

  return {
    title: t('title')
  }
}

const CreateEventPage = () => {
  return (
    <>
      <TimeZoneProvider>
        <CreateEvent />
      </TimeZoneProvider>
    </>
  )
}
export default CreateEventPage
