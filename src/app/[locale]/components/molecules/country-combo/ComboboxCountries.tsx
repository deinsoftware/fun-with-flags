'use client'

import { useTranslations } from 'next-intl'
import { SetStateAction, RefObject } from 'react'

import { PlusCircle } from 'lucide-react'

import { DatesToRender } from '../../atoms/country-combo/DatesToRender'

import style from './ComboboxCountries.module.css'

import { useFilteredDates } from './useFilteredDates'

import { useGetInfoDates } from './useGetInfoDates'

import { lucidIcons } from '@/libs/icon-config'
import { TimeFormat } from '@/helpers/events.types'

type Props = {
  getTextContent: (ref: RefObject<HTMLDivElement> | null) => void
  handleAddCountry: (value: SetStateAction<boolean>) => void
  format: TimeFormat
  optionsCombo: {
    hideMins: boolean
    showGmt: boolean
    hideInitials: boolean
  }
}

const ComboboxCountries = ({
  getTextContent,
  handleAddCountry,
  format,
  optionsCombo,
}: Props) => {
  const t = useTranslations('Events.Create')

  const { dateList } = useGetInfoDates({ format })
  const filteredDates = useFilteredDates(dateList, format)

  return (
    <div className={style['countries-container']}>
      {!dateList || dateList?.length === 0 ? (
        <p>{t('Form.Fields.combo')}</p>
      ) : (
        <DatesToRender
          datesArray={filteredDates}
          format={format}
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
