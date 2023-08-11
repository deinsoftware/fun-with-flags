import { useEffect, useState } from 'react'

import { getDatesList, sortDatesList } from '@/helpers/events'
import { EventDate, TimeFormat, ZoneList } from '@/helpers/events.types'
import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'

export const useGetInfoDates = ({ format }: { format: TimeFormat }) => {
  const { timeZones } = useTimeZoneContext()
  const [dateList, setDateList] = useState<EventDate[] | undefined>([])

  useEffect(() => {
    if (timeZones.origin.date) {
      const valueList: ZoneList = {
        originDate: new Date(timeZones.origin.date),
        zoneList: timeZones.list,
        timeFormat: format,
      }

      const dateList = sortDatesList(getDatesList(valueList))

      setDateList(dateList)
    }
  }, [timeZones, format])

  return {
    dateList,
  }
}
