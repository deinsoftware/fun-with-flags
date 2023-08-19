import ReactCountryFlag from 'react-country-flag'

import { useState } from 'react'

import CountryList from '../country-list/CountryList'

import { FormData } from '../../organisms/events/CreateEvent.types'

import styles from './SelectCountry.module.css'

import { Countries } from '@/types/countries.types'
import { FlagCountry } from '@/helpers/flags.types'
import { Timezones } from '@/types/timezones.types'
import { getLocaleGmt } from '@/helpers/dates'

type Props = {
  flagList: FlagCountry[] | null
  countryCode: Countries
  date: FormData['date']
  setFormData: React.Dispatch<React.SetStateAction<FormData>>
}

export const SelectCountry = ({
  flagList,
  countryCode,
  date,
  setFormData,
}: Props) => {
  const [visibleSelectMenu, setVisibleSelectMenu] = useState(false)

  const handleClose = () => {
    setVisibleSelectMenu(false)
  }

  const handleSelect = ({
    countryCode,
    name,
  }: {
    countryCode: Countries
    name: Timezones
  }) => {
    const currentDate = new Date(date as string)
    const gmt = getLocaleGmt(
      { timeZone: name, timeZoneName: 'longOffset' },
      currentDate,
    )

    setFormData((prev) => ({
      ...prev,
      country: countryCode,
      timezone: name,
      gmt,
    }))
    handleClose()
  }

  return (
    <div className={styles['select-country-container']}>
      <div
        aria-label="Select your timezone"
        className={styles['select-country']}
        tabIndex={0}
        onClick={() => setVisibleSelectMenu(true)}
        onKeyDown={(e) => e.key === 'Enter' && setVisibleSelectMenu(true)}
      >
        <p>Country:</p>
        {Boolean(countryCode) && (
          <ReactCountryFlag
            svg
            alt={`Flag of ${countryCode}`}
            countryCode={countryCode}
            id={`${countryCode}`}
            style={{
              width: '1.6rem',
              height: '1.6rem',
            }}
            title={`Flag of ${countryCode}`}
          />
        )}
      </div>

      {visibleSelectMenu && (
        <CountryList
          flagList={flagList}
          handleSelect={handleSelect}
          onClose={handleClose}
        />
      )}
    </div>
  )
}
