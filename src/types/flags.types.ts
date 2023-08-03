import { EventDate } from '@/helpers/events.types'

export type DatesFilteredArray = [
  string,
  {
    [gmt: string]: EventDate[]
  },
]

export type DatesFiltered = {
  [date: string]: {
    [gmt: string]: EventDate[]
  }
}
