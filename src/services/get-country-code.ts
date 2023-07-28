import { Countries } from '@/types/countries.types'

const { NEXT_PUBLIC_API_URL = '' } = process?.env || {}
export async function getCountryCode(zone: string): Promise<Countries> {
  zone = zone.replaceAll('/', '%2F')
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/timezones/${zone}`)
    const data = await response.json()
    const countryCode = data.countryCode
    return countryCode
  } catch (error) {
    throw new Error('Error to get country code:' + error)
  }
}
