import { useEffect, useState } from 'react'

import { TimeFormat } from '@/helpers/events.types'
import { TimeZoneData } from '@/types/context.types'
import { getCountryByZone } from '@/services/timezones'
import { getTimezone } from '@/helpers/get-time-zone'
import { convertGmtToNumber, getGmt } from '@/helpers/dates'

export const useGetTimes = (
  initialTimeZoneData: TimeZoneData,
  timeFormat: TimeFormat,
) => {
  const [timeZones, setTimeZones] = useState<TimeZoneData>(initialTimeZoneData)
  const [format, setFormat] = useState<TimeFormat>(timeFormat)

  useEffect(() => {
    const initialTimeZone = async () => {
      const countryCode = await getCountryByZone(getTimezone())
      const name = getTimezone()
      const date = new Date()
      const gmt = getGmt({ timeZone: name }, date) ?? 'GMT00:00'
      const offset = convertGmtToNumber(gmt) ?? 0
      const initialTimeZoneData = {
        list: [
          {
            countryCode: countryCode ?? 'CO',
            name,
          },
        ],
        origin: {
          countryCode: countryCode ?? 'CO',
          date: date.toISOString(),
          name,
          offset,
        },
      }
      setTimeZones(initialTimeZoneData)
    }
    const getInitialTimeZone = () => {
      const json = localStorage.getItem('time-zones')
      if (json) {
        const timeZones = JSON.parse(json)
        setTimeZones(timeZones)
      } else {
        initialTimeZone()
      }
    }
    getInitialTimeZone()
  }, [])
  useEffect(() => {
    const getInitialFormat = () => {
      const formatString = localStorage.getItem('format-time')
      const format = formatString === '12' ? 12 : 24
      setFormat(format)
    }
    getInitialFormat()
  }, [])

  useEffect(() => {
    localStorage.setItem('time-zones', JSON.stringify(timeZones))
  }, [timeZones])
  useEffect(() => {
    localStorage.setItem('format-time', format.toString())
  }, [format])

  return {
    timeZones,
    setTimeZones,
    format,
    setFormat,
  }
}
