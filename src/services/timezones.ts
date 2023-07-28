import { FlagCountry } from '@/helpers/flags.types'
import { Countries } from '@/types/countries.types'
import { Locale } from '@/types/locale.types'

const { NEXT_PUBLIC_API_URL = '' } = process?.env || {}

export const getAllTimeZones = async ({
  locale,
  date,
  signal,
}: {
  locale?: Locale
  date?: Date
  signal?: AbortSignal
}): Promise<FlagCountry[] | null> => {
  const payload = JSON.stringify({
    locale,
    date,
  })

  const params: RequestInit = {
    method: 'POST',
    body: payload,
    signal,
  }

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/timezones`, params)
  if (response.status !== 200) {
    return null
  }
  const result = await response.json()
  return result
}

export async function getCountryByZone(
  zone: string,
): Promise<Countries | null> {
  zone = zone.replaceAll('/', '%2F')
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/timezones/${zone}`)
    if (!response.ok) {
      return null
    }
    const data = await response.json()
    const countryCode = data.countryCode
    return countryCode
  } catch (error) {
    console.error('Error to get country code:' + error)
    return null
  }
}
