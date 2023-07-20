'use client'

import ReactCountryFlag from 'react-country-flag'
import styles from './SelectTimeZone.module.css'
import { useState } from 'react'

const SelectTimeZone = ({id, countryCode, regionName, timeZone}) => {
  // const [countries, setCountries] = useState(data)
  // const  = country;
  return (
    <>
        <button
          className={styles['item-country-container']}
          key={id}
        >
          <div className={styles['flag-and-country-name']}>
            <ReactCountryFlag
              countryCode={countryCode}
              svg
              className={styles['flag-country']}
              title={`Flag of ${regionName}`}
              alt={`Flag of ${regionName}`}
            />
            <span className={styles['name-country']}>
              {regionName}
            </span>
          </div>
        </button>
    </>
  )
}

export default SelectTimeZone
