import CreateEvent from '@/app/components/organisms/events/CreateEvent'
import { Locale } from '@/types/locale.types'

export const metadata = {
  title: 'Create event',
}

const CreateEventPage = () => {
  const locale = Intl.NumberFormat().resolvedOptions().locale as Locale

  return (
    <>
      <CreateEvent locale={locale} />
    </>
  )
}
export default CreateEventPage
