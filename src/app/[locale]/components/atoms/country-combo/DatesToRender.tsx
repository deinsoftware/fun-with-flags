'use client'
import { useEffect, useRef, useState, RefObject, useCallback } from 'react'

import ReactCountryFlag from 'react-country-flag'

import style from './DatesToRender.module.css'

import { useTimeZoneContext } from '@/context/useTimeZoneContext'
import { DatesFilteredArray } from '@/types/flags.types'
import { Countries } from '@/types/countries.types'
import { Timezones } from '@/types/timezones.types'
import { EventDate, TimeFormat, Zone } from '@/helpers/events.types'
import { formatGmt, formatTime } from '@/helpers/dates'
import { GmtPattern } from '@/types/dates.types'

type Props = {
  datesArray: DatesFilteredArray[]
  getTextContent: (ref: RefObject<HTMLDivElement> | null) => void
  format: TimeFormat
  optionsCombo: {
    hideMins: boolean
    showGmt: boolean
    onlyNum: boolean
    hideEmojis: boolean
  }
}

export const DatesToRender = ({
  datesArray,
  getTextContent,
  format,
  optionsCombo,
}: Props) => {
  const { deleteTimeZone } = useTimeZoneContext()
  const [timeToRender, setTimeToRender] = useState<React.ReactNode[]>([])

  const ref = useRef<HTMLDivElement>(null)
  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLImageElement>) => {
      const target = event.target as HTMLImageElement
      const [name, countryCode] = target.id.split('--')
      const zone: Zone = {
        countryCode: countryCode as Countries,
        name: name as Timezones,
      }
      deleteTimeZone(zone)
    },
    [deleteTimeZone],
  )
  const getTimeInfo = useCallback(
    (gmt: GmtPattern, countries: EventDate[]) => {
      return (
        <div key={gmt} className={style['countries']}>
          <p
            className={`${style[`time-${format}`]}${
              optionsCombo.hideMins ? ` ${style[`time-short-${format}`]}` : ''
            }`}
          >
            {formatTime(countries[0].i18n.time, format, optionsCombo.hideMins)}
          </p>
          {optionsCombo.showGmt && (
            <p className={style['gmt']}>
              {formatGmt(gmt, 'shortOffset', !optionsCombo.onlyNum)}
            </p>
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
          {`\n`}
        </div>
      )
    },
    [optionsCombo, format, handleClick],
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
      if (values.length >= 1) {
        const timeInfo = Object.entries(groupedCountries).map(
          ([gmt, countries]) => getTimeInfo(gmt as GmtPattern, countries),
        )

        return (
          <div key={self.crypto.randomUUID()}>
            <p>
              <strong>{`${
                !optionsCombo.hideEmojis ? '📅 ' : ''
              }${date}\n`}</strong>
            </p>
            {timeInfo}
          </div>
        )
      }
    })
    if (result[0] !== undefined) setTimeToRender(result)
  }, [datesArray, deleteTimeZone, format, getTimeInfo])

  return (
    <div ref={ref} className={style['container']}>
      {timeToRender}
    </div>
  )
}
