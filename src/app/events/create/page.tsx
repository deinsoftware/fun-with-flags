import CreateEvent from '@/app/components/organisms/events/CreateEvent'
import { TimeZoneProvider } from '@/app/context/timeZoneContext'

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
