'use client'

import { SetStateAction, RefObject } from 'react'

import { PlusSquare } from 'lucide-react'

import { DatesToRender } from '../../atoms/country-combo/DatesToRender'

import style from './ComboboxCountries.module.css'

import { useFilteredDates } from './useFilteredDates'

import { useGetInfoDates } from './useGetInfoDates'

import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'
import { lucidIcons } from '@/libs/icon-config'

type Props = {
  getTextContent: (ref: RefObject<HTMLDivElement> | null) => void
  handleAddCountry: (value: SetStateAction<boolean>) => void
}

const ComboboxCountries = ({ getTextContent, handleAddCountry }: Props) => {
  const { format } = useTimeZoneContext()
  const { dateList } = useGetInfoDates({ format })
  const filteredDates = useFilteredDates(dateList, format)

  return (
    <div className={style['countries-container']}>
      {!dateList || dateList?.length === 0 ? (
        <p>Add a timezone to start</p>
      ) : (
        <DatesToRender
          datesArray={filteredDates}
          getTextContent={getTextContent}
        />
      )}
      <div className={style['add-button-container']}>
        <button
          aria-label="Add country timezone"
          className={style['add-button']}
          type="button"
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
