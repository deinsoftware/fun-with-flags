'use client'

import { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { ReactNode } from 'react'

import { ChevronDown } from 'lucide-react'

import styles from './SelectTimeZone.module.css'

import { lucidIcons } from '@/libs/iconConfig'

import { FlagCountry } from '@/helpers/flags.types'

const SelectTimeZone: React.FC<
  FlagCountry & { children: ReactNode } & { handleSelect: Function }
> = ({ id, countryCode, regionName, timeZone, handleSelect, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <button
        key={id}
        className={styles['item-country-container']}
        type="button"
        onClick={() => {
          toggleIsOpen()
          {
            timeZone?.length < 2 &&
              handleSelect({
                countryCode: countryCode,
                name: timeZone[0].zoneNames[0],
              })
          }
        }}
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
        {timeZone?.length > 1 && (
          <ChevronDown
            absoluteStrokeWidth={false}
            className={`${styles['more-countries-button']} ${
              isOpen ? styles['rotated'] : ''
            }`}
            color={lucidIcons.color.dark}
            size={lucidIcons.size}
            strokeWidth={lucidIcons.strokeWidth}
          />
        )}
      </button>

      {timeZone?.length > 1 && (
        <div
          className={`${styles['more-time-zones']} ${
            isOpen ? styles['is-open'] : ''
          } `}
        >
          {children}
        </div>
      )}
    </>
  )
}

export default SelectTimeZone
