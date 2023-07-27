import { Countries } from '@/types/countries.types'

export async function getCountryCode(): Promise<Countries> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()
    const countryCode = data.country
    return countryCode
  } catch (error) {
    throw new Error('Error to get country code:' + error)
  }
}
