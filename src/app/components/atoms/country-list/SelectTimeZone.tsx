'use client'

import { useState } from 'react'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'
import { ReactNode } from 'react'

import styles from './SelectTimeZone.module.css'

import { FlagCountry } from '@/helpers/flags.types'

const SelectTimeZone: React.FC<FlagCountry & { children: ReactNode }> = ({
  id,
  countryCode,
  regionName,
  timeZone,
  children,
}) => {
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
        onClick={() => toggleIsOpen()}
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
          <Image
            alt="More time zones"
            className={`${styles['more-countries-button']} ${
              isOpen ? styles['rotated'] : ''
            }`}
            height={10}
            src="/img/ui/caret.svg"
            width={10}
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
