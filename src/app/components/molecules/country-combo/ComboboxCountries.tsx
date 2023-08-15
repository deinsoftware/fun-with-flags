'use client'

import { DatesToRender } from '../../atoms/country-combo/DatesToRender'

import style from './ComboboxCountries.module.css'

import { useFilteredDates } from './useFilteredDates'

import { useGetInfoDates } from './useGetInfoDates'

import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'

const ComboboxCountries = ({
  getTextContent,
}: {
  getTextContent: Function
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
      <div className={style['add-button']}>
        <button onClick={(event) => event.preventDefault()}>Add</button>
      </div>
    </div>
  )
}

export default ComboboxCountries
