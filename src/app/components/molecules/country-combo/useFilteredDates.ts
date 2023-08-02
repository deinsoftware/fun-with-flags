import { useEffect, useState } from 'react'

import { EventDate, TimeFormat } from '@/helpers/events.types'

type DatesFiltered = {
  [date: string]: {
    [gmt: string]: EventDate[]
  }
}
type DatesFilteredArray = [
  string,
  {
    [gmt: string]: EventDate[]
  },
]

export function useFilteredDates(
  dateList: EventDate[] | undefined,
  format: TimeFormat,
) {
  const [filteredDates, setFilteredDates] = useState<DatesFilteredArray[]>([])

  useEffect(() => {
    const filterDates = (
      dateList: EventDate[] | undefined,
    ): DatesFilteredArray[] | [] => {
      const flags: DatesFiltered = {}
      if (dateList === undefined) return []

      dateList.forEach((country) => {
        if (!flags.hasOwnProperty(country.date)) {
          flags[country.date] = {}
        }
        if (country.gmt) {
          if (!flags[country.date].hasOwnProperty(country.gmt)) {
            flags[country.date][country.gmt] = []
          }
          flags[country.date][country.gmt].push(country)
        }
      })

      const groupedDatesArray = Object.entries(flags)
      return groupedDatesArray
    }
    setFilteredDates(filterDates(dateList))
  }, [format, dateList])

  return filteredDates
}
