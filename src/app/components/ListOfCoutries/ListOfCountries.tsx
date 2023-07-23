'use client'

import styles from './ListOfCountries.module.css'
import { useFetch } from './useFetch'

import SelectTimeZoneOption from './SelectTimeZoneOption'
import SelectTimeZone from './SelectTimeZone'
import { useEffect, useState } from 'react'

const ListOfCountries = ({ onClose }) => {
  // Fetch Data
  const locale = Intl.NumberFormat().resolvedOptions().locale
  const { data } = useFetch(
    'http://localhost:3000/api/timezones/',
    locale,
    '2023-02-24',
  )

  // Debounce ⬇⬇⬇
  const [filteredCountries, setFilteredCountries] = useState(null)

  useEffect(() => {
    setFilteredCountries(data)
  }, [data])

  let filterTimeout
  const doCountryFilter = (query) => {
    clearTimeout(filterTimeout)
    if (!query) return setFilteredCountries(data)

    if (query.length <= 2) {
      filterTimeout = setTimeout(() => {
        console.log('🌌🌌🌌 =>', query, '<= 🌌🌌🌌')
        setFilteredCountries(
          data.filter(({ countryCode }) =>
            countryCode.toLowerCase().includes(query.toLowerCase()),
          ),
        )
      }, 400)
    }
    // Discutir esta condicional, de 3 a 2
    // PA = Panamá
    // Pero PA también podría ser Paraguay/PapuaGuínea
    // se cambia el número de abajo por el >=2
    // *Discutir cuál es el más acertado
    if (query.length >= 3) {
      filterTimeout = setTimeout(() => {
        console.log('🌌🌌🌌 =>', query, '<= 🌌🌌🌌')
        setFilteredCountries(
          data.filter(({ regionName }) =>
            regionName.toLowerCase().includes(query.toLowerCase()),
          ),
        )
      }, 400)
    }
  }

  return (
    <>
      <div className={styles['overlay']}>
        <div className={styles['container-list-with-search']}>
          <div className={styles['search-bar-container']}>
            <input
              type="text"
              placeholder={`Search for time zones`}
              className={styles['search-bar']}
              onChange={(event) => doCountryFilter(event.target.value)}
            />
            <button
              type="button"
              className={styles['close-modal']}
              onClick={() => onClose()}
            >
              ❌
            </button>
          </div>
          <div className={styles['container-list-of-countries']}>
            {filteredCountries?.map((country) => {
              if (country.timeZone.length > 1) {
                return (
                  <SelectTimeZoneOption
                    key={country.countryCode}
                    {...country}
                  />
                )
              } else {
                return <SelectTimeZone key={country.countryCode} {...country} />
              }
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default ListOfCountries
