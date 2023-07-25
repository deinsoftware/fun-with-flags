'use client'

import { useState } from 'react'
import ListOfCountries from '../components/ListOfCoutries/ListOfCountries'

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
      {isOpenSelectTimeZone && <ListOfCountries onClose={handleClose} />}
    </>
  )
}

export default ListCountriesPage
