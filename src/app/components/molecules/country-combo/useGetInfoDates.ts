import { useContext, useEffect, useState } from 'react'

import { TimeZoneContext } from '@/app/context/timeZoneContext'
import { getDatesList, sortDatesList } from '@/helpers/events'
import { EventDate, ZoneList } from '@/helpers/events.types'

type Format = {
  format: 12 | 24
}

export const useGetInfoDates = ({ format }: Format) => {
  const { timeZones } = useContext(TimeZoneContext)
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
