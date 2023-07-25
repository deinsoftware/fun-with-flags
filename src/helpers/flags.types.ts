import { Countries } from '@/types/countries.types'
import { TimeZones } from '@/types/timeZones.types'

export type FlagZone = {
  capital: boolean
  initial: string
  offset: number
  dst: boolean
  zoneNames: TimeZones[]
}

export type FlagCountry = {
  id: string
  countryCode: Countries
  regionName?: string
  timeZone: FlagZone[]
}
