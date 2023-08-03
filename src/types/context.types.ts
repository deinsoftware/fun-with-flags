import { Countries } from './countries.types'

import { Zone } from '@/helpers/events.types'

export type TimeZoneData = {
  list: Zone[]
  origin:
    | {
        countryCode: Countries | Promise<Countries>
        date: string
        name: string
      }
    | {}
}
export type OriginDate = {
  countryCode: Countries | Promise<Countries>
  date: string
  name: string
}
