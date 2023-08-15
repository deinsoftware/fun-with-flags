'use client'

import { PlusSquare } from 'lucide-react'

import { DatesToRender } from '../../atoms/country-combo/DatesToRender'

import style from './ComboboxCountries.module.css'

import { useFilteredDates } from './useFilteredDates'

import { useGetInfoDates } from './useGetInfoDates'

import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'
import { lucidIcons } from '@/libs/iconConfig'

const ComboboxCountries = ({
  getTextContent,
  handleAddCountry,
}: {
  getTextContent: Function
  handleAddCountry: Function
}) => {
  const { format } = useTimeZoneContext()
  const { dateList } = useGetInfoDates({ format })
  const filteredDates = useFilteredDates(dateList, format)

  return (
    <div className={style['countries-container']}>
      {!dateList || dateList?.length === 0 ? (
        'Add a timezone to start'
      ) : (
        <DatesToRender
          datesArray={filteredDates}
          getTextContent={getTextContent}
        />
      )}
      <div className={style['add-button-container']}>
        <button
          className={style['add-button']}
          onClick={(event) => {
            event.preventDefault()
            handleAddCountry(true)
          }}
        >
          <PlusSquare
            color="var(--color-whywhite-500)"
            size={lucidIcons.size}
          />
        </button>
      </div>
    </div>
  )
}

export default ComboboxCountries
