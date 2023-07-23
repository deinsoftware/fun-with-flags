'use client'

import styles from './MoreCountries.module.css'

const MoreCountries = ({ timeZone }) => {
  return (
    <>
      {timeZone?.map(({ initial, zoneNames, offset, capital }) => {
        if (offset >= 0) {
          offset = `+${offset}`
        }

        if (capital) {
          return (
            <button
              key={initial}
              className={styles['mtz-item-country-container']}
            >
              <div className={styles['mtz-zone-name-container']}>
                <span>{zoneNames[0].split('/').pop().replace(/_/g, ' ')}</span>
                <span>{`⭐`}</span>
              </div>
              <div className={styles['mtz-additional-information']}>
                <span className={styles['mtz-additional-information-initial']}>
                  {initial}
                </span>
                <span
                  className={styles['mtz-additional-information-utc']}
                >{`(UTC${offset})`}</span>
              </div>
            </button>
          )
        } else {
          return (
            <button
              key={initial}
              className={styles['mtz-item-country-container']}
            >
              <div className={styles['mtz-zone-name-container']}>
                <span>{zoneNames[0].split('/').pop().replace(/_/g, ' ')}</span>
              </div>
              <div className={styles['mtz-additional-information']}>
                <span className={styles['mtz-additional-information-initial']}>
                  {initial}
                </span>
                <span
                  className={styles['mtz-additional-information-utc']}
                >{`(UTC${offset})`}</span>
              </div>
            </button>
          )
        }
      })}
    </>
  )
}
export default MoreCountries
