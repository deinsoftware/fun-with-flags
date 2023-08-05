'use client'

import { useEffect, useState } from 'react'

import { XCircle } from 'lucide-react'

import TimeZones from '../../atoms/country-list/TimeZones'

import styles from './CountryList.module.css'

import { lucidIcons } from '@/libs/iconConfig'

import SelectTimeZone from '@/app/components/atoms/country-list/SelectTimeZone'
import { FlagCountry } from '@/helpers/flags.types'

import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'

const CountryList: React.FC<{
  flagList: FlagCountry[] | null
  onClose: Function
}> = ({ flagList, onClose }) => {
  const [countryList, setCountryList] = useState<FlagCountry[] | null>(flagList)
  const [query, setQuery] = useState<string>('')
  const { timeZones, addTimeZone } = useTimeZoneContext()

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
              <XCircle
                absoluteStrokeWidth={false}
                color={lucidIcons.color.dark}
                size={lucidIcons.size}
                strokeWidth={lucidIcons.strokeWidth}
              />
            </button>
          </div>
          <div className={styles['container-list-of-countries']}>
            {countryList?.map((country) => {
              return (
                <SelectTimeZone
                  key={country.countryCode}
                  {...country}
                  addTimeZone={addTimeZone}
                >
                  <TimeZones
                    addTimeZone={addTimeZone}
                    countryCode={country.countryCode}
                    timeZone={country.timeZone}
                  />
                </SelectTimeZone>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default CountryList
