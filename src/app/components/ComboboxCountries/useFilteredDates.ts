import { useEffect, useState } from 'react'

import { EventDate } from '@/helpers/events.types'
import { DateArray } from '@/types/DateArray.types'
import { Countries } from '@/types/countries.types'

type TimezoneInfo = {
  [time: string]: {
    countryCodes: [Countries, string][]
    gmt?: string
    date: string
  }
}

export function useFilteredDates(
  dateList: EventDate[] | undefined,
  format: 12 | 24,
) {
  const [filteredDates, setFilteredDates] = useState<DateArray[]>([])

  useEffect(() => {
    const filterDates = (
      dateList: EventDate[] | undefined,
    ): DateArray[] | [] => {
      let groupedDates: TimezoneInfo = {}

      if (dateList === undefined) return []

      dateList?.forEach((dateInfo) => {
        const countryCode: Countries = dateInfo.countryCode
        const time: string = dateInfo.i18n.time
        const date = dateInfo.i18n.date
        const gmt = dateInfo.acronym
        const name = dateInfo.name

        if (groupedDates[time]) {
          groupedDates[time].countryCodes.push([countryCode, name])
        } else {
          groupedDates[time] = {
            countryCodes: [[countryCode, name]],
            gmt,
            date,
          }
        }
      })
      const groupedDatesArray = Object.entries(groupedDates)
      return groupedDatesArray
    }
    setFilteredDates(filterDates(dateList))
  }, [format])

  return filteredDates
}
