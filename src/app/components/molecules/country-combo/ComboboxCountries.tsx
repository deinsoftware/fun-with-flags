'use client'

import { SetStateAction, RefObject } from 'react'

import { PlusCircle } from 'lucide-react'

import { DatesToRender } from '../../atoms/country-combo/DatesToRender'

import style from './ComboboxCountries.module.css'

import { useFilteredDates } from './useFilteredDates'

import { useGetInfoDates } from './useGetInfoDates'

import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'
import { lucidIcons } from '@/libs/icon-config'

type Props = {
  getTextContent: (ref: RefObject<HTMLDivElement> | null) => void
  handleAddCountry: (value: SetStateAction<boolean>) => void
  optionsCombo: {
    hideMins: boolean
    showGmt: boolean
    hideInitials: boolean
  }
}

const ComboboxCountries = ({
  getTextContent,
  handleAddCountry,
  optionsCombo,
}: Props) => {
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
          optionsCombo={optionsCombo}
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
          <PlusCircle color="var(--color-purple-500)" size={lucidIcons.size} />
        </button>
      </div>
    </div>
  )
}

export default ComboboxCountries
