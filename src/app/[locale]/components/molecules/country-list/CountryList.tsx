'use client'

import { useTranslations } from 'next-intl'

import { useEffect, useState } from 'react'

import { createPortal } from 'react-dom'

import { XCircle } from 'lucide-react'

import dynamic from 'next/dynamic'

import styles from './CountryList.module.css'

import TimeZones from '@/app/[locale]/components/atoms/country-list/TimeZones'

import { lucidIcons } from '@/libs/icon-config'

import SelectTimeZone from '@/app/[locale]/components/atoms/country-list/SelectTimeZone'
import { FlagCountry } from '@/helpers/flags.types'
import { Countries } from '@/types/countries.types'
import { Timezones } from '@/types/timezones.types'

import LoadingPage from '@/app/[locale]/loading'

const WithLoading = dynamic(() => import('../../atoms/util/wrapper/Wrapper'), {
  ssr: false,
  loading: LoadingPage,
})

import useDebounce from '@/app/[locale]/hooks/useDebounce'

type Props = {
  flagList: FlagCountry[] | null
  onClose: () => void
  handleSelect: ({
    countryCode,
    name,
  }: {
    countryCode: Countries
    name: Timezones
  }) => void
}

const CountryList = ({ flagList, onClose, handleSelect }: Props) => {
  const t = useTranslations('CountryList')

  const [countryList, setCountryList] = useState<FlagCountry[] | null>(flagList)
  const [query, setQuery] = useState<string>('')

  const getCountriesByQuery = () => {
    return (
      flagList?.filter(({ countryCode, regionName }) => {
        if (query.length === 2) {
          return countryCode?.toLowerCase()?.includes(query?.toLowerCase())
        } else {
          return regionName?.toLowerCase()?.includes(query?.toLowerCase())
        }
      }) ?? null
    )
  }

  useDebounce({
    fn: () => setCountryList(getCountriesByQuery()),
    time: 400,
    deps: query,
  })

  useEffect(() => {
    if (!query) return setCountryList(flagList)
  }, [query, flagList])

  return (
    <>
      {createPortal(
        <div className={styles['overlay']}>
          <div className={styles['container-list-with-search']}>
            <div className={styles['search-bar-container']}>
              <input
                className={styles['search-bar']}
                placeholder={t('search')}
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
              <WithLoading>
                {countryList?.map((country) => {
                  return (
                    <SelectTimeZone
                      key={country.countryCode}
                      {...country}
                      handleSelect={handleSelect}
                    >
                      <TimeZones
                        countryCode={country.countryCode}
                        handleSelect={handleSelect}
                        timeZone={country.timeZone}
                      />
                    </SelectTimeZone>
                  )
                })}
              </WithLoading>
            </div>
          </div>
        </div>,
        document.getElementById('country-list-modal') as HTMLDivElement,
      )}
    </>
  )
}

export default CountryList
