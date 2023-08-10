import { Countries } from '@/types/countries.types'

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
  timezone: string
  gmt: string
}
