'use client'

import styles from './TimeZones.module.css'

import { FlagZone } from '@/helpers/flags.types'

import { Timezones } from '@/types/timezones.types'
import { Countries } from '@/types/countries.types'

function getZoneName(zoneNames: string[]) {
  const newZoneNames = [...zoneNames]?.shift() ?? ''
  return newZoneNames?.split('/')?.pop()?.replaceAll('_', ' ') ?? newZoneNames
}

type Props = {
  timeZone: FlagZone[]
} & {
  countryCode: string
  handleSelect: ({
    countryCode,
    name,
  }: {
    countryCode: Countries
    name: Timezones
  }) => void
}

const TimeZones = ({ timeZone, countryCode, handleSelect }: Props) => {
  return (
    <>
      {timeZone?.map(
        ({ initial, zoneNames, offset, capital }: FlagZone, index) => {
          const gmt = offset >= 0 ? `+${offset}` : `${offset}`

          if (zoneNames?.length > 0) {
            return (
              <button
                key={self.crypto.randomUUID()}
                className={styles['mtz-item-country-container']}
                type="button"
                onClick={() => {
                  handleSelect({
                    countryCode: countryCode as Countries,
                    name: timeZone[index].zoneNames[0],
                  })
                }}
              >
                <div className={styles['mtz-zone-name-container']}>
                  <span>{getZoneName(zoneNames)}</span>
                  {capital && <span>{`⭐`}</span>}
                </div>
                <div className={styles['mtz-additional-information']}>
                  <span
                    className={styles['mtz-additional-information-initial']}
                  >
                    {initial}
                  </span>
                  <span
                    className={styles['mtz-additional-information-gmt']}
                  >{`(GMT${gmt})`}</span>
                </div>
              </button>
            )
          }
        },
      )}
    </>
  )
}
export default TimeZones
