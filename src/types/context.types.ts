import { Countries } from './countries.types'

import { Zone } from '@/helpers/events.types'

export type OriginDate = {
  countryCode: Countries | ''
  date: string
  name: string
  offset: number
}
export type TimeZoneData = {
  list: Zone[]
  origin: OriginDate
}
