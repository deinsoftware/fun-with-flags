'use client'

import styles from './ListOfCountries.module.css'
import { useFetch } from './useFetch'

import SelectTimeZoneOption from './SelectTimeZoneOption'
import SelectTimeZone from './SelectTimeZone'

const ListOfCountries = () => {
  const locale = Intl.NumberFormat().resolvedOptions().locale

  const { data } = useFetch(
    'http://localhost:3000/api/timezones/',
    locale,
    '2023-02-24',
  )

  return (
    <>
      <div className={styles['container-list-with-search']}>
        <input type="text" className={styles['search-bar']} />
        <div className={styles['container-list-of-countries']}>
          <SelectTimeZoneOption data={data} />
          <SelectTimeZone data={data} />
        </div>
      </div>
    </>
  )
}

export default ListOfCountries
