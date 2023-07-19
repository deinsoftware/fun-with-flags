'use client'

import { useState } from 'react'
import styles from './MoreCountries.module.css'

const MoreCountries = ({timeZone}) => {
  // const [timeZones, setTimeZones] = useState(timeZone)

  return (
    <>
      {/* <pre>{JSON.stringify(state, null, 4)}</pre> */}

      {timeZone?.map(({initial, zoneNames, offset}) => {
        // console.log(zone)
        return (
          <button
            key={initial}
            className={styles['mtz-item-country-container']}
          >
            <div className={styles['mtz-zone-name-container']}>
              <span>{zoneNames[0]}</span>
            </div>
            <div className={styles['mtz-additional-information']}>
              <span>{initial}</span>
              <span>{`(UTC *** ${offset})`}</span>
            </div>
          </button>
        )
      })}
    </>
  )
}
export default MoreCountries