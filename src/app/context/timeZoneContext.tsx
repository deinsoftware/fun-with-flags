'use client'
import { createContext, useMemo } from 'react'

import { useGetTimes } from './useGetTimes'

import { TimeFormat, Zone } from '@/helpers/events.types'
import { OriginDate, TimeZoneData } from '@/types/context.types'

const initialTimeZoneData: TimeZoneData = {
  list: [],
  origin: {
    countryCode: '',
    name: '',
    date: '',
  },
}

export const TimeZoneContext = createContext<{
  timeZones: TimeZoneData
  addTimeZone: (zone: Zone) => void
  deleteTimeZone: (zone: Zone) => void
  setOriginDate: (zone?: Zone, originDate?: string, gmt?: string) => void
  format: TimeFormat
}>({
  timeZones: initialTimeZoneData,
  addTimeZone: () => {},
  deleteTimeZone: () => {},
  setOriginDate: () => {},
  format: 24,
})

type Props = {
  children: React.ReactNode
}

export function TimeZoneProvider({ children }: Props) {
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
    if (index >= 0) return

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
      return
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

  const setOriginDate = (zone?: Zone, originDate?: string) => {
    if (!zone && !originDate) return
    setTimeZones((prev) => {
      const origin: OriginDate = {
        ...prev.origin,
        ...(originDate && { date: originDate }),
        ...(zone && { ...zone }),
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
