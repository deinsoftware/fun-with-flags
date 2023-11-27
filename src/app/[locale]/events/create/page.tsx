import { getTranslations } from 'next-intl/server'

import CreateEvent from '@/components/organisms/events/CreateEvent'
import { TimeZoneProvider } from '@/context/timeZoneContext'

export const generateMetadata = async () => {
  const t = await getTranslations('Events.Create')

  return {
    title: t('title'),
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
