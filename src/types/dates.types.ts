import { arrayHours24, arrayMinutes } from '@/helpers/dates'

type SingleNumber = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9'

const listHours24 = [...arrayHours24] as const
type Hours = Readonly<(typeof listHours24)[number]>

const listMinutes = [...arrayMinutes] as const
type Minutes = Readonly<(typeof listMinutes)[number]>

type Year = `${'1' | '2'}${SingleNumber}${SingleNumber}${SingleNumber}`

const arrayMonths = Array.from(Array(24).keys(), (num) =>
  num.toString().padStart(2, '0'),
)
const listMonths = [...arrayMonths] as const
type Month = Readonly<(typeof listMonths)[number]>

const arrayDays = Array.from(Array(31).keys(), (num) =>
  num.toString().padStart(2, '0'),
)
const listDays = [...arrayDays] as const
type Day = Readonly<(typeof listDays)[number]>

export type DatePattern = `${Year}-${Month}-${Day}` //YYYY-MM-DD

export type TimePattern = `${Hours}:${Minutes}` //HH:MM

export type GmTPattern = `${'-' | '+'}${Hours}:${Minutes}` | 'Z'
