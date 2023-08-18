import { Countries } from '@/types/countries.types'
import { Timezones } from '@/types/timezones.types'

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
  timezone: Timezones
  gmt: string
}
