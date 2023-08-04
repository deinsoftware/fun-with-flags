'use client'

import { useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { ReactNode } from 'react'

import { ChevronDown } from 'lucide-react'

import styles from './SelectTimeZone.module.css'

import { FlagCountry } from '@/helpers/flags.types'

const SelectTimeZone: React.FC<FlagCountry & { children: ReactNode } & { addTimeZone: Function }> = ({
  id,
  countryCode,
  regionName,
  timeZone,
  addTimeZone,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev)
  }

  const sizeIcon = 24
  const colorIcon = '#454545'
  const strokeWidthIcon = 2

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
              addTimeZone({
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
            color={colorIcon}
            size={sizeIcon}
            strokeWidth={strokeWidthIcon}
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
