import { useEffect, useState } from 'react'

import { TimeFormat } from '@/helpers/events.types'
import { TimeZoneData } from '@/types/context.types'

export const useTimeZoneContext = (
  initialTimeZoneData: TimeZoneData,
  timeFormat: TimeFormat,
) => {
  const [timeZones, setTimeZones] = useState<TimeZoneData>(initialTimeZoneData)
  const [format, setFormat] = useState<TimeFormat>(timeFormat)

  useEffect(() => {
    const getInitialTimeZone = () => {
      const json = localStorage.getItem('timeZones')
      if (json !== null) {
        const timeZones = JSON.parse(json)
        setTimeZones(timeZones)
      }
    }
    getInitialTimeZone()
  }, [])
  useEffect(() => {
    const getInitialFormat = () => {
      const formatString = localStorage.getItem('formatTime')
      const format = formatString === '12' ? 12 : 24
      setFormat(format)
    }
    getInitialFormat()
  }, [])

  useEffect(() => {
    localStorage.setItem('timeZones', JSON.stringify(timeZones))
  }, [timeZones])
  useEffect(() => {
    localStorage.setItem('formatTime', format.toString())
  }, [format])

  return {
    timeZones,
    setTimeZones,
    format,
    setFormat,
  }
}
