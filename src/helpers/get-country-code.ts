import { Countries } from '@/types/countries.types'

export async function getCountryCode(zone: string): Promise<Countries> {
  zone = zone.replaceAll('/', '%2F')
  try {
    const response = await fetch(`http://localhost:3000/api/timezones/${zone}`)
    const data = await response.json()
    const countryCode = data.countryCode
    return countryCode
  } catch (error) {
    throw new Error('Error to get country code:' + error)
  }
}
