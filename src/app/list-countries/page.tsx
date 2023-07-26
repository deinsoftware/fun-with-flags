'use client'

import { useState } from 'react'
import CountryList from '@/app/components/molecules/country-list/CountryList'

const ListCountriesPage = () => {
  const [isOpenSelectTimeZone, setIsOpenSelectTimeZone] = useState(false)

  const handleClose = () => {
    setIsOpenSelectTimeZone(false)
  }

  // ! Esto es una página para hacer prubas del modal de TimeZone,
  // ! terminará siendo eliminada

  return (
    <>
      <button onClick={() => setIsOpenSelectTimeZone(true)}>Time zone</button>
      {isOpenSelectTimeZone && <CountryList onClose={handleClose} />}
    </>
  )
}

export default ListCountriesPage
