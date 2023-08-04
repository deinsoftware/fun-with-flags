import { Countries } from './countries.types'

import { Zone } from '@/helpers/events.types'

export type OriginDate = {
  countryCode: Countries | Promise<Countries | null>
  date: string
  name: string
}
export type TimeZoneData = {
  list: Zone[]
  origin: OriginDate
}
