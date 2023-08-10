import ReactCountryFlag from 'react-country-flag'

import { useState } from 'react'

import CountryList from '../country-list/CountryList'

import styles from './SelectCountry.module.css'

import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'
import { Countries } from '@/types/countries.types'
import { FlagCountry } from '@/helpers/flags.types'

export const SelectCountry: React.FC<{
  flagList: FlagCountry[] | null
  countryCode: Countries
}> = ({ flagList, countryCode }) => {
  const [visibleSelectMenu, setVisibleSelectMenu] = useState(false)
  const { setOriginDate } = useTimeZoneContext()

  const handleClose = () => {
    setVisibleSelectMenu(false)
  }

  // const handleClick= (event)=>{
  //   setOriginDate()
  // }

  return (
    <div className={styles['select-country-container']}>
      <div
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
        <CountryList flagList={flagList} onClose={handleClose} />
      )}
    </div>
  )
}
