import { Countries } from './countries.types'

import { TimeZones } from './timeZones.types'

import { Zone } from '@/helpers/events.types'

export type OriginDate = {
  countryCode: Countries | ''
  date: string
  name: TimeZones
}
export type TimeZoneData = {
  list: Zone[]
  origin: OriginDate
}
