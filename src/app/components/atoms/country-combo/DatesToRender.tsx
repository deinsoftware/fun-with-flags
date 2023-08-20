'use client'
import { useEffect, useRef, useState, RefObject, useCallback } from 'react'

import ReactCountryFlag from 'react-country-flag'

import style from './DatesToRender.module.css'

import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'
import { DatesFilteredArray } from '@/types/flags.types'
import { Countries } from '@/types/countries.types'
import { Timezones } from '@/types/timezones.types'
import { EventDate, Zone } from '@/helpers/events.types'

type Props = {
  datesArray: DatesFilteredArray[]
  getTextContent: (ref: RefObject<HTMLDivElement> | null) => void
  showGmt?: boolean
  showGmtWord?: boolean
  showHourComplete?: boolean
}

export const DatesToRender = ({
  datesArray,
  getTextContent,
  showGmt,
  showGmtWord,
  showHourComplete,
}: Props) => {
  const { deleteTimeZone, format } = useTimeZoneContext()
  const [timeToRender, setTimeToRender] = useState<React.ReactNode[]>([])

  const ref = useRef<HTMLDivElement>(null)

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      const target = event.target as HTMLImageElement
      const name = target.id.split('--')[0] as Timezones
      const countryCode = target.id.split('--')[1] as Countries
      deleteTimeZone({ countryCode, name })
    },
    [deleteTimeZone],
  )
  const getTimeInfo = useCallback(
    (gmt: string, countries: EventDate[], complementShortHour: string) => {
      let classNameToAdd = ''
      if (!showHourComplete) {
        classNameToAdd =
          format === 12 ? style['time-short-12'] : style['time-short-24']
      }
      const timeText = showHourComplete
        ? countries[0].i18n.time
        : `${countries[0].i18n.time.split(':')[0]} ${complementShortHour}`

      return (
        <div key={gmt} className={style['countries']}>
          <p
            className={`${
              format === 12 ? style['time-12'] : style['time-24']
            } ${classNameToAdd}`}
          >
            {timeText}
          </p>
          {(showGmt || showGmtWord) && (
            <p className={style['gmt']}>{`(${showGmtWord ? 'GMT' : ''}${
              showGmt ? gmt : ''
            })`}</p>
          )}
          <div className={style['flags-container']}>
            {countries.map(({ countryCode, name }) => (
              <div key={self.crypto.randomUUID()} className={style['flag']}>
                <ReactCountryFlag
                  svg
                  alt={`Flag of ${countryCode}`}
                  countryCode={countryCode}
                  id={`${name}--${countryCode}`}
                  style={{ width: '1.6rem', height: '1.6rem' }}
                  title={`Flag of ${countryCode}`}
                  onClick={handleClick}
                />
                <ReactCountryFlag
                  countryCode={countryCode}
                  style={{ display: 'none' }}
                />
              </div>
            ))}
          </div>
        </div>
      )
    },
    [showHourComplete, showGmt, showGmtWord, format, handleClick],
  )

  useEffect(() => {
    getTextContent(ref)
    return () => {
      getTextContent(null)
    }
  }, [timeToRender, ref, getTextContent])

  useEffect(() => {
    const result = datesArray.map(([date, groupedCountries]) => {
      const values = Object.values(groupedCountries)
      const firstCountry = values[0][0]
      const complementShortHour: string =
        format === 12 ? firstCountry.i18n.time.split(' ')[1] : 'H'
      const timeInfo = Object.entries(groupedCountries).map(
        ([gmt, countries]) => getTimeInfo(gmt, countries, complementShortHour),
      )

      return (
        <div
          key={self.crypto.randomUUID()}
          ref={ref}
          className={style['container']}
        >
          <p>
            <strong>{date}</strong>
          </p>
          {timeInfo}
        </div>
      )
    })

    setTimeToRender(result)
  }, [datesArray, deleteTimeZone, format])

  return timeToRender
}
