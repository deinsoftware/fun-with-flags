import { useEffect, useState } from 'react'

import { EventDate, ZoneList } from '@/helpers/events.types'
import { DateArray } from '@/types/DateArray.types'

type TimezoneInfo = {
  [time: string]: {
    countryCodes: [string[]]
    gmt?: string
    date: string
  }
}

export function useFilteredDates(dateList: EventDate[], format: 12 | 24) {
  const [filteredDates, setFilteredDates] = useState<DateArray[]>([])

  useEffect(() => {
    const filterDates = (dateList: EventDate[]): DateArray[] => {
      let groupedDates: TimezoneInfo = {}

      dateList?.forEach((dateInfo) => {
        const countryCode: string = dateInfo.countryCode
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
