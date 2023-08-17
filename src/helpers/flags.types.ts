import { Countries } from '@/types/countries.types'
import { Timezones } from '@/types/timezones.types'

export type FlagZone = {
  capital: boolean
  initial: string
  offset: number
  dst: boolean
  zoneNames: Timezones[]
}

export type FlagCountry = {
  id: string
  countryCode: Countries
  regionName?: string
  timeZone: FlagZone[]
}
