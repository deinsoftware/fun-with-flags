'use client'
import { createContext, useMemo, } from 'react'

import { useGetTimes } from './useGetTimes'

import { TimeFormat, Zone } from '@/helpers/events.types'
import { getTimezone } from '@/helpers/get-time-zone'
import { getCountryByZone } from '@/services/timezones'
import { OriginDate, TimeZoneData } from '@/types/context.types'

const initialTimeZoneData: TimeZoneData = {
  list: [
    {
      "countryCode": "CO",
      "name": "America/Bogota"
  },
  {
    countryCode: 'JP',
    name: 'Asia/Tokyo',
  },
  {
    countryCode: 'ES',
    name: 'Europe/Madrid',
  },
  {
    countryCode: 'US',
    name: 'America/Adak',
  },
  {
    countryCode: 'CK',
    name: 'Pacific/Rarotonga',
  },
  {
    countryCode: 'CA',
    name: 'America/Vancouver',
  },
  {
    countryCode: 'US',
    name: 'America/Los_Angeles',
  },
  {
    countryCode: 'EC',
    name: 'America/Guayaquil',
  },
  {
    countryCode: 'CL',
    name: 'America/Santiago',
  },
  ],
  origin: {
    countryCode: getCountryByZone(getTimezone()),
    date: new Date().toISOString(),
    name: getTimezone(),
  },
}

export const TimeZoneContext = createContext<{
  timeZones: TimeZoneData
  addTimeZone: (zone: Zone) => void
  deleteTimeZone: (zone: Zone) => void
  setOriginDate: (originDate: OriginDate) => void
  format: TimeFormat
}>({
  timeZones: initialTimeZoneData,
  addTimeZone: () => {},
  deleteTimeZone: () => {},
  setOriginDate: () => {},
  format: 24,
})

export function TimeZoneProvider({ children }: { children: React.ReactNode }) {
  const {timeZones, setTimeZones,format, setFormat} = useGetTimes(initialTimeZoneData, 24)
  const addTimeZone = (zone: Zone) => {
    const index = timeZones?.list?.findIndex((timeZone) => {
      return (
        timeZone.countryCode === zone.countryCode && timeZone.name === zone.name
      )
    })
    if (index>=0) throw new Error('Time zone already exists')
    
    setTimeZones((prev) => {
        return {
          ...prev,
          list: [...(prev?.list ?? []), zone],
          origin: {
            ...prev?.origin,
          },
        }
    })
    
  }

  const deleteTimeZone = (zone: Zone) => {
    const index = timeZones?.list?.findIndex((timeZone) => {
      return (
        timeZone.countryCode === zone.countryCode && timeZone.name === zone.name
      )
    })

    if (index === -1 || index === undefined) {
      throw new Error('Element not found')
    } else {
      let newTimeZonesList = structuredClone(timeZones?.list)
      newTimeZonesList?.splice(index, 1)
      setTimeZones((prev) => {
        return {
          ...prev,
          list: newTimeZonesList ?? [],
          origin: {
            ...prev?.origin,
          },
        }
      })
    }
  }

  const setOriginDate = (originDate: OriginDate) => {
    setTimeZones((prev) => {
      return {
        ...prev,
        list: [...(prev?.list ?? [])],
        origin: originDate,
      }
    })
  }
  const contextValue = useMemo(
    () => ({
      timeZones,
      addTimeZone,
      deleteTimeZone,
      setOriginDate,
      format,
    }),
    [timeZones, format, deleteTimeZone, addTimeZone ],
  )

  return (
    <TimeZoneContext.Provider value={contextValue}>
      {children}
    </TimeZoneContext.Provider>
  )
}
