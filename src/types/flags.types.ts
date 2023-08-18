import { EventDate } from '@/helpers/events.types'

export type DatesFiltered = {
  [date: string]: {
    [gmt: string]: EventDate[]
  }
}
export type DatesFilteredArray = [keyof DatesFiltered, DatesFiltered['date']]
