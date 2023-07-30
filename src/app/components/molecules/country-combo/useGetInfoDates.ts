import { useEffect, useState } from 'react'

import { getDatesList, sortDatesList } from '@/helpers/events'
import { EventDate, TimeFormat, ZoneList } from '@/helpers/events.types'
import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'

export const useGetInfoDates = ({ format }: TimeFormat) => {
  const { timeZones } = useTimeZoneContext()
  const [dateList, setDateList] = useState<EventDate[] | undefined>([])
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  useEffect(() => {
    if (timeZones && 'date' in timeZones.origin) {
      const valueList: ZoneList = {
        originDate: new Date(timeZones.origin.date),
        zoneList: timeZones.list,
        timeFormat: format,
      }

      const dateList = sortDatesList(getDatesList(valueList))

      const currentDate = new Date(timeZones.origin.date)

      setDateList(dateList)
      setCurrentDate(currentDate)
    }
  }, [timeZones, format])

  return {
    dateList,
    currentDate,
  }
}
