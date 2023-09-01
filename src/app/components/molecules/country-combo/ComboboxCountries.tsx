'use client'

import { SetStateAction, RefObject } from 'react'

import { PlusCircle } from 'lucide-react'

import { DatesToRender } from '../../atoms/country-combo/DatesToRender'

import styles from './ComboboxCountries.module.css'

import { useFilteredDates } from './useFilteredDates'

import { useGetInfoDates } from './useGetInfoDates'

import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'
import { lucidIcons } from '@/libs/icon-config'

type Props = {
  getTextContent: (ref: RefObject<HTMLDivElement> | null) => void
  handleAddCountry: (value: SetStateAction<boolean>) => void
  showGmt?: boolean
  showGmtWord?: boolean
  showHourComplete?: boolean
  isRequired: boolean
}

const ComboboxCountries = ({
  getTextContent,
  handleAddCountry,
  showGmt = true,
  showGmtWord = true,
  showHourComplete = true,
  isRequired,
}: Props) => {
  const { format } = useTimeZoneContext()
  const { dateList } = useGetInfoDates({ format })
  const filteredDates = useFilteredDates(dateList, format)

  return (
    <div
      className={`${styles['countries-container']} 
    ${isRequired ? styles['empty'] : ''}
      `}
    >
      {!dateList || dateList?.length === 0 ? (
        <p>Add a timezone to start</p>
      ) : (
        <DatesToRender
          datesArray={filteredDates}
          getTextContent={getTextContent}
          showGmt={showGmt}
          showGmtWord={showGmtWord}
          showHourComplete={showHourComplete}
        />
      )}
      <div className={styles['add-button-container']}>
        <button
          aria-label="Add country timezone"
          className={styles['add-button']}
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
