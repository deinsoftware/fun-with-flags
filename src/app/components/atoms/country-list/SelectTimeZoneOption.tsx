'use client'

import { useState } from 'react'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'

import TimeZones from './TimeZones'

import styles from './SelectTimeZoneOption.module.css'

import { FlagCountry } from '@/helpers/flags.types'

const SelectTimeZoneOption: React.FC<FlagCountry> = ({
  id,
  countryCode,
  regionName,
  timeZone,
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
        <Image
          alt="More time zones"
          className={`${styles['more-countries-button']} ${
            isOpen ? styles['rotated'] : ''
          }`}
          height={10}
          src="/img/ui/dark/caret.png"
          width={10}
        />
      </button>

      <div
        className={`${styles['more-time-zones']} ${
          isOpen ? styles['is-open'] : ''
        } `}
      >
        <TimeZones timeZone={timeZone} />
      </div>
    </>
  )
}

export default SelectTimeZoneOption
