import CreateEvent from '@/components/organisms/events/CreateEvent'
import { TimeZoneProvider } from '@/context/timeZoneContext'

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
