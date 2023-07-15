'use client'
import React from 'react'
import styles from './ListOfCountries.module.css'
import ReactCountryFlag from 'react-country-flag'
import { useFetch } from './useFetch'

const ListOfCountries = () => {
  const locale = Intl.NumberFormat().resolvedOptions().locale

  const { data } = useFetch(
    'http://localhost:3000/api/timezones/',
    locale,
    '2023-02-24',
  )
  // console.log(locale)

  return (
    <>
      <div className={styles['container-list-with-search']}>
        <input type="text" className={styles['search-bar']} />

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
                <button className={styles['more-countries-arrow']}>
                  {'->'}
                </button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ListOfCountries
