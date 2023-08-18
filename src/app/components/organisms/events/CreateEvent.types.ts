import { Countries } from '@/types/countries.types'
import { DatePattern, GmTPattern, TimePattern } from '@/types/dates.types'
import { Timezones } from '@/types/timezones.types'

export type FormData = {
  eventName: string
  time?: TimePattern
  date?: DatePattern
  language: string
  eventLink: string
  eventDescription: string
  image: string
  combo: string
  country: Countries
  timezone: Timezones
  gmt: GmTPattern
}
