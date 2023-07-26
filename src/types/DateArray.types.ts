import { Countries } from './countries.types'

export type DateArray = [
  string,
  {
    countryCodes: [Countries, string][]
    gmt?: string
    date: string
  },
]
