import { useEffect, useState } from 'react'

import { getDatesList, sortDatesList } from '@/helpers/events'
import { EventDate, TimeFormat, ZoneList } from '@/helpers/events.types'
import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'

export const useGetInfoDates = ({ format }: TimeFormat) => {
  const { timeZones } = useTimeZoneContext()
  const [dateList, setDateList] = useState<EventDate[] | undefined>([])
  const [currentDate, setCurrentDate] = useState<Date>(new Date())
  useEffect(() => {
    const valueList: ZoneList | null = timeZones
      ? {
          originDate: new Date(timeZones.origin.date),
          zoneList: timeZones.list,
          timeFormat: format,
        }
      : null
    const dateList = valueList
      ? sortDatesList(getDatesList(valueList))
      : undefined
    const currentDate = timeZones ? new Date(timeZones.origin.date) : new Date()
    setDateList(dateList)
    setCurrentDate(currentDate)
  }, [timeZones, format])

  return {
    dateList,
    currentDate,
    timeZones,
  }
}
