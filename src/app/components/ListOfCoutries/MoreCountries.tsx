'use client'

import { FlagZone } from '@/helpers/flags.types'
import styles from './MoreCountries.module.css'

function getZoneName(zoneNames: string[]) {
  const newZoneNames = [...zoneNames]?.shift() ?? ''
  return newZoneNames?.split('/')?.pop()?.replaceAll('_', ' ') ?? newZoneNames
}

const MoreCountries: React.FC<{ timeZone: FlagZone[] }> = ({ timeZone }) => {
  return (
    <>
      {timeZone?.map(({ initial, zoneNames, offset, capital }: FlagZone, index) => {
        const gmt = offset >= 0 ? `+${offset}` : `${offset}`

        if (zoneNames?.length > 0) {
          return (
            <button
              key={self.crypto.randomUUID()}
              className={styles['mtz-item-country-container']}
            >
              <div className={styles['mtz-zone-name-container']}>
                <span>{getZoneName(zoneNames)}</span>
                {capital && <span>{`⭐`}</span>}
              </div>
              <div className={styles['mtz-additional-information']}>
                <span className={styles['mtz-additional-information-initial']}>
                  {initial}
                </span>
                <span
                  className={styles['mtz-additional-information-utc']}
                >{`(UTC${gmt})`}</span>
              </div>
            </button>
          )
        }
      })}
    </>
  )
}
export default MoreCountries
