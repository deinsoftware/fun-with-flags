import { useEffect, useState } from 'react'

import { TimeZoneData } from '@/types/context.types'

export const useGetTimes = (initialTimeZoneData: TimeZoneData) => {
  const [timeZones, setTimeZones] = useState<TimeZoneData>(initialTimeZoneData)

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
    localStorage.setItem('time-zones', JSON.stringify(timeZones))
  }, [timeZones])

  return {
    timeZones,
    setTimeZones,
  }
}
