import CreateEvent from '@/app/[locale]/components/organisms/events/CreateEvent'
import { TimeZoneProvider } from '@/app/[locale]/context/timeZoneContext'

export const metadata = {
  title: 'Create event',
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
