import { OriginDate } from './context.types'

import { Zone } from '@/helpers/events.types'

export type EventBody = {
  description: string
  eventName: string
  timeZone: {
    origin: OriginDate
    list: Zone[]
  }
  url: string
  userName: string
  tags?: string[]
  lang?: string
}
