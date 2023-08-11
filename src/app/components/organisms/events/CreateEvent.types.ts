import { Countries } from '@/types/countries.types'
import { TimeZones } from '@/types/timeZones.types'

export type FormData = {
  eventName: string
  time: string
  date: string
  language: string
  eventLink: string
  eventDescription: string
  image: string
  combo: string
  country: Countries
  timezone: TimeZones
  gmt: string
}
