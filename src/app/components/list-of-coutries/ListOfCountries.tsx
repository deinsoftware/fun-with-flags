'use client'
import React from 'react'
import styles from './ListOfCountries.module.css'
import ReactCountryFlag from 'react-country-flag'
import { useFetch } from './useFetch'

const ListOfCountries = () => {
  const { data } = useFetch('http://localhost:3000/api/timezones/')

  return (
    <>
      <div className={styles['container-list-of-countries']}>
        {data?.map(({ id, countryCode, regionName }) => {
          return (
            <div className={styles['item-country-container']} key={id}>
              <ReactCountryFlag
                countryCode={countryCode}
                svg
                className={styles['flag-country']}
                title={`Flag of ${regionName}`}
                alt={`Flag of ${regionName}`}
              />
              <span className={styles['name-country']}>{regionName}</span>
              <button className={styles['more-countries-arrow']}>{'->'}</button>
            </div>
          )
        })}
      </div>
    </>
  )
}

export default ListOfCountries
