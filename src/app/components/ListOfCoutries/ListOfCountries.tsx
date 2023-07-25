'use client'

import styles from './ListOfCountries.module.css'
import useFetch from './useFetch'
import { Locale } from '@/types/locale.types'

import SelectTimeZoneOption from './SelectTimeZoneOption'
import SelectTimeZone from './SelectTimeZone'
import { useEffect, useState } from 'react'
import { FlagCountry } from '@/helpers/flags.types'
import { Countries } from '@/types/countries.types'

const ListOfCountries: React.FC<{
  onClose: Function
}> = ({ onClose }) => {
  // Fetch Data
  const locale = Intl.NumberFormat().resolvedOptions().locale as Locale

  const data = useFetch({
    locale,
    date: new Date('2023-02-24'),
  })
  // Debounce ⬇⬇⬇
  const [filteredCountries, setFilteredCountries] = useState<
    FlagCountry[] | null
  >(null)

  useEffect(() => {
    setFilteredCountries(data)
  }, [data])

  let filterTimeout : ReturnType<typeof setTimeout>
  const doCountryFilter = (query: string) => {
    clearTimeout(filterTimeout)
    if (!query) return setFilteredCountries(data)

    if (query.length <= 2) {
      filterTimeout = setTimeout(() => {
        setFilteredCountries(
          data?.filter(
            ({ countryCode }:{countryCode : Countries}) =>
              countryCode
                ?.toLowerCase()
                ?.includes(query?.toLowerCase()),
          ) ?? null,
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
        setFilteredCountries(
          data?.filter(({ regionName }:{regionName?: string }) =>
            regionName?.toLowerCase()?.includes(query?.toLowerCase()),
          ) ?? null,
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
