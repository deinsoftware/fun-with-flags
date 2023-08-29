import { useEffect, useState } from 'react'

import { TimeFormat } from '@/helpers/events.types'
import { TimeZoneData } from '@/types/context.types'

export const useGetTimes = (
  initialTimeZoneData: TimeZoneData,
  timeFormat: TimeFormat,
) => {
  const [timeZones, setTimeZones] = useState<TimeZoneData>(initialTimeZoneData)
  const [format, setFormat] = useState<TimeFormat>(timeFormat)

  useEffect(() => {
    const getInitialTimeZone = () => {
      const json = localStorage.getItem('time-zones')
      if (json) {
        const timeZones = JSON.parse(json)
        setTimeZones(timeZones)
      }
    }
    getInitialTimeZone()
  }, [])
  useEffect(() => {
    const getInitialFormat = () => {
      // const formatString = localStorage.getItem('format-time')
      // const format = formatString === '12' ? 12 : 24
      // setFormat(format)
    }
    getInitialFormat()
  }, [])

  useEffect(() => {
    localStorage.setItem('time-zones', JSON.stringify(timeZones))
  }, [timeZones])
  useEffect(() => {
    // localStorage.setItem('format-time', format.toString())
  }, [format])

  return {
    timeZones,
    setTimeZones,
    format,
    setFormat,
  }
}
