import { FlagCountry } from '@/helpers/flags.types'
import { Locale } from '@/types/locale.types'

const { NEXT_PUBLIC_API_URL } = process.env ?? ''

export const getAllTimeZones = async ({
  locale,
  date,
}: {
  locale?: Locale
  date?: Date
}): Promise<FlagCountry[] | null> => {
  const payload = JSON.stringify({
    locale,
    date,
  })

  const params: RequestInit = {
    method: 'POST',
    body: payload,
  }

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/timezones`, params)
  if (response.status !== 200) {
    return null
  }
  const result = await response.json()
  return result
}
