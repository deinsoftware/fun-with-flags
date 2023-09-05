'use client'

import { useTranslations } from 'next-intl'
import { SetStateAction, RefObject } from 'react'

import { PlusCircle } from 'lucide-react'

import { useFilteredDates } from './useFilteredDates'

import { useGetInfoDates } from './useGetInfoDates'

import styles from './ComboboxCountries.module.css'

import { TimeFormat } from '@/helpers/events.types'

import { DatesToRender } from '@/components/atoms/country-combo/DatesToRender'

import { lucidIcons } from '@/libs/icon-config'

type Props = {
  getTextContent: (ref: RefObject<HTMLDivElement> | null) => void
  handleAddCountry: (value: SetStateAction<boolean>) => void
  format: TimeFormat
  optionsCombo: {
    hideMins: boolean
    showGmt: boolean
    onlyNum: boolean
  }
  isRequired: boolean
}

const ComboboxCountries = ({
  getTextContent,
  handleAddCountry,
  format,
  optionsCombo,
  isRequired,
}: Props) => {
  const t = useTranslations('ComboCountries')

  const { dateList } = useGetInfoDates({ format })
  const filteredDates = useFilteredDates(dateList, format)

  return (
    <div
      className={`${styles['countries-container']}
    ${isRequired ? styles['empty'] : ''}
      `}
    >
      {!dateList || dateList?.length === 0 ? (
        <p className={styles['empty-message']}>{t('Form.Fields.combo')}</p>
      ) : (
        <DatesToRender
          datesArray={filteredDates}
          format={format}
          getTextContent={getTextContent}
          optionsCombo={optionsCombo}
        />
      )}
      <div className={styles['add-button-container']}>
        <button
          aria-label={t('Form.Button.add')}
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
