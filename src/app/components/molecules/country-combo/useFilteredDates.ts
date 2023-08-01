import { useEffect, useState } from 'react'

import { EventDate, TimeFormat } from '@/helpers/events.types'
import { DateArray } from '@/types/DateArray.types'
import { Countries } from '@/types/countries.types'

type TimezoneInfo = {
  [time: string]: DateArray[1]
}

export function useFilteredDates(
  dateList: EventDate[] | undefined,
  format: TimeFormat,
) {
  const [filteredDates, setFilteredDates] = useState<DateArray[]>([])

  useEffect(() => {
    const filterDates = (
      dateList: EventDate[] | undefined,
    ): DateArray[] | [] => {
      let groupedDates: TimezoneInfo = {}

      if (dateList === undefined) return []

      dateList.forEach((dateInfo) => {
        const countryCode: Countries = dateInfo.countryCode
        const time: string = dateInfo.i18n.time
        const date = dateInfo.i18n.date
        const gmt = dateInfo.acronym
        const name = dateInfo.name
        let order: TimezoneInfo['time']['day']

        if (dateInfo.order?.next) {
          order = 'next'
        } else if (dateInfo.order?.prev) {
          order = 'prev'
        } else if (dateInfo.order?.same) {
          order = 'same'
        } else {
          order = 'same'
        }

        if (groupedDates[time]) {
          groupedDates[time].countryCodes.push([countryCode, name])
        } else {
          groupedDates[time] = {
            countryCodes: [[countryCode, name]],
            gmt,
            date,
            day: order,
          }
        }
      })
      const groupedDatesArray = Object.entries(groupedDates)
      return groupedDatesArray
    }
    setFilteredDates(filterDates(dateList))
  }, [format, dateList])

  return filteredDates
}
