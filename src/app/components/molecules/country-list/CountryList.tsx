'use client'

import { useContext, useEffect, useState } from 'react'

import Image from 'next/image'

import styles from './CountryList.module.css'

import SelectTimeZone from '@/app/components/atoms/country-list/SelectTimeZone'
import { FlagCountry } from '@/helpers/flags.types'
import { TimeZoneContext } from '@/app/context/timeZoneContext'

const CountryList: React.FC<{
  flagList: FlagCountry[] | null
  onClose: Function
}> = ({ flagList, onClose }) => {
  const [countryList, setCountryList] = useState<FlagCountry[] | null>(flagList)
  const [query, setQuery] = useState<string>('')
  const { addTimeZone } = useContext(TimeZoneContext)

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



  // const { addTimeZone } = useTimeZoneContext()
  // addTimeZone({ countryCode: 'CO', name: 'America/Bogota' })

  return (
    <>
      <div className={styles['overlay']}>
        <button
          type="button"
          onClick={() =>
            addTimeZone({ countryCode: 'CO', name: 'America/Bogota' })
          }
        >
          TEST
        </button>
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
              <Image
                alt="Close icon"
                className={styles['close-modal-icon']}
                height={24}
                src="/img/ui/cancel.svg"
                width={24}
              />
            </button>
          </div>
          <div className={styles['container-list-of-countries']}>
            {countryList?.map((country) => {
              return <SelectTimeZone key={country.countryCode} {...country} />
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default CountryList
