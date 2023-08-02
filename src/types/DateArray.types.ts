import { EventDate } from '@/helpers/events.types'

export type DatesFilteredArray = [
  string,
  {
    [gmt: string]: EventDate[]
  },
]
