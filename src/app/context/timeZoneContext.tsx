'use client'
import { createContext, useMemo } from 'react'

import { useGetTimes } from './useGetTimes'

import { TimeFormat, Zone } from '@/helpers/events.types'
import { OriginDate, TimeZoneData } from '@/types/context.types'

const initialTimeZoneData: TimeZoneData = {
  list: [
    
  ],
  origin: {
    countryCode: '',
    date: '',
    name: '',
    offset: 0
  },
}

export const TimeZoneContext = createContext<{
  timeZones: TimeZoneData
  addTimeZone: (zone: Zone) => void
  deleteTimeZone: (zone: Zone) => void
  setOriginDate: (zone?: Zone, originDate?: string) => void
  format: TimeFormat
}>({
  timeZones: initialTimeZoneData,
  addTimeZone: () => {},
  deleteTimeZone: () => {},
  setOriginDate: () => {},
  format: 24,
})

export function TimeZoneProvider({ children }: { children: React.ReactNode }) {
  const { timeZones, setTimeZones, format, setFormat } = useGetTimes(
    initialTimeZoneData,
    24,
  )
  const addTimeZone = (zone: Zone) => {
    const index = timeZones?.list?.findIndex((timeZone) => {
      return (
        timeZone.countryCode === zone.countryCode && timeZone.name === zone.name
      )
    })
    if (index >= 0) throw new Error('Time zone already exists')

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

  const setOriginDate = (zone?: Zone, originDate?: string, offset?: number) => {
    if(!zone && !originDate && !offset) return
    setTimeZones((prev) => {
      const origin: OriginDate = {
        ...prev.origin,
        ...(originDate && { date: originDate }),
        ...(zone && {...zone}),
        ...(offset && {offset})
      }
      
      return {
        ...prev,
        list: [...(prev?.list ?? [])],
        origin: origin,
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
    [timeZones, format],
  )

  return (
    <TimeZoneContext.Provider value={contextValue}>
      {children}
    </TimeZoneContext.Provider>
  )
}
