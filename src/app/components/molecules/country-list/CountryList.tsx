'use client'

import { useEffect, useState } from 'react'

import styles from './CountryList.module.css'

import SelectTimeZoneOption from '@/app/components/atoms/country-list/SelectTimeZoneOption'
import SelectTimeZone from '@/app/components/atoms/country-list/SelectTimeZone'
import { FlagCountry } from '@/helpers/flags.types'

const CountryList: React.FC<{
  flagList: FlagCountry[] | null
  onClose: Function
}> = ({ flagList, onClose }) => {
  const [countryList, setCountryList] = useState<FlagCountry[] | null>(flagList)
  const [query, setQuery] = useState<string>('')

  useEffect(() => {
    if (!query) return setCountryList(flagList)

    const handler = setTimeout(() => {
      const getCountriesByQuery = () => {
        return flagList?.filter(({ countryCode, regionName }) => {
          if (query.length === 2) {
            return countryCode?.toLowerCase()?.includes(query?.toLowerCase())
          } else {
            return regionName?.toLowerCase()?.includes(query?.toLowerCase())
          }
        })
      }

      const countryFilter = getCountriesByQuery() ?? null
      setCountryList(countryFilter)
    }, 400)

    return () => clearTimeout(handler)
  }, [flagList, query])

  return (
    <>
      <div className={styles['overlay']}>
        <div className={styles['container-list-with-search']}>
          <div className={styles['search-bar-container']}>
            <input
              className={styles['search-bar']}
              placeholder={`Search by country code or name`}
              type="text"
              onChange={(event) => setQuery(event.target.value)}
            />
            <button
              className={styles['close-modal']}
              type="button"
              onClick={() => onClose()}
            >
              ❌
            </button>
          </div>
          <div className={styles['container-list-of-countries']}>
            {countryList?.map((country) => {
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

export default CountryList