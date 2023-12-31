'use client'
import { createContext, useMemo, useCallback } from 'react'

import { useGetTimes } from './useGetTimes'

import { Zone } from '@/helpers/events.types'
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

  addTimeZone: (zone: Zone) => boolean
  deleteTimeZone: (zone: Zone) => void
  setOriginDate: (zone?: Zone, originDate?: string, gmt?: string) => void
}>({
  timeZones: initialTimeZoneData,

  addTimeZone: (): boolean => false,
  deleteTimeZone: () => {},
  setOriginDate: () => {},
})

type Props = {
  children: React.ReactNode
}

export function TimeZoneProvider({ children }: Props) {
  const { timeZones, setTimeZones } = useGetTimes(initialTimeZoneData)
  const addTimeZone = useCallback(
    (zone: Zone) => {
      const index = timeZones?.list?.findIndex((timeZone) => {
        return (
          timeZone.countryCode === zone.countryCode &&
          timeZone.name === zone.name
        )
      })
      if (index >= 0) return false

      setTimeZones((prev) => {
        return {
          ...prev,
          list: [...(prev?.list ?? []), zone],
          origin: {
            ...prev?.origin,
          },
        }
      })
      return true
    },
    [setTimeZones, timeZones?.list],
  )

  const deleteTimeZone = useCallback(
    (zone: Zone) => {
      const index = timeZones?.list?.findIndex((timeZone) => {
        return (
          timeZone.countryCode === zone.countryCode &&
          timeZone.name === zone.name
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
    },
    [timeZones?.list, setTimeZones],
  )

  const setOriginDate = useCallback(
    (zone?: Zone, originDate?: string) => {
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
    },
    [setTimeZones],
  )
  const contextValue = useMemo(
    () => ({
      timeZones,
      addTimeZone,
      deleteTimeZone,
      setOriginDate,
    }),
    [timeZones, addTimeZone, deleteTimeZone, setOriginDate],
  )

  return (
    <TimeZoneContext.Provider value={contextValue}>
      {children}
    </TimeZoneContext.Provider>
  )
}
