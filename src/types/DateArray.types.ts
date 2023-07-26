import { Countries } from './countries.types'

export type DateArray = [
  string,
  {
    countryCodes: [Countries[]]
    gmt?: string
    date: string
  },
]
