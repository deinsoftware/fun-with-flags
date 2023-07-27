'use client'

import ReactCountryFlag from 'react-country-flag'

import styles from './SelectTimeZone.module.css'

import { FlagCountry } from '@/helpers/flags.types'

const SelectTimeZone :React.FC< FlagCountry > = ({ id, countryCode, regionName, timeZone }) => {
  return (
    <>
      <button
        key={id}
        className={styles['item-country-container']}
        type="button"
      >
        <div className={styles['flag-and-country-name']}>
          <ReactCountryFlag
            svg
            alt={`Flag of ${regionName}`}
            className={styles['flag-country']}
            countryCode={countryCode}
            title={`Flag of ${regionName}`}
          />
          <span className={styles['name-country']}>{regionName}</span>
        </div>
      </button>
    </>
  )
}

export default SelectTimeZone
