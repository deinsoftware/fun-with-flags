'use client'

import { useState } from 'react'
import Image from 'next/image'
import ReactCountryFlag from 'react-country-flag'
import MoreCountries from './MoreCountries'

import styles from './SelectTimeZoneOption.module.css'

const SelectTimeZoneOption = ({ data }) => {
  // const [countries, setCountries] = useState(data)
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = (id) => {
    setIsOpen((prev) => {
      return {
        ...prev,
        [id]: !prev[id],
      }
    })
  }

  return (
    <>
      {data?.map(({ id, timeZone, countryCode, regionName }) => {
        if (timeZone.length > 1) {
          return (
            <>
              <button
                className={styles['item-country-container']}
                key={id}
                onClick={() => toggleIsOpen(id)}
              >
                <div className={styles['flag-and-country-name']}>
                  <ReactCountryFlag
                    countryCode={countryCode}
                    svg
                    className={styles['flag-country']}
                    title={`Flag of ${regionName}`}
                    alt={`Flag of ${regionName}`}
                  />
                  <span className={styles['name-country']}>{regionName}</span>
                </div>
                <Image
                  src="/img/caretabajo.png"
                  alt="More time zones"
                  width={10}
                  height={10}
                  className={styles['more-countries-button']}
                />
              </button>

              <div
                className={`${styles['more-time-zones']} ${
                  isOpen[id] ? styles['is-open'] : ''
                } `}
              >
                <MoreCountries timeZone={timeZone} />
              </div>
            </>
          )
        }
      })}
    </>
  )
}

export default SelectTimeZoneOption
