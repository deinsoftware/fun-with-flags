import { Countries } from './countries.types'

import { Timezones } from './timezones.types'

import { Zone } from '@/helpers/events.types'

export type OriginDate = {
  countryCode: Countries | ''
  date: string
  name: Timezones
}
export type TimeZoneData = {
  list: Zone[]
  origin: OriginDate
}
