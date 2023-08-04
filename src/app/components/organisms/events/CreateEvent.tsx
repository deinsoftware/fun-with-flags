'use client'

import { useState, useMemo } from 'react'

import Toggle from '../../atoms/util/toggle/Toggle'

import styles from './CreateEvent.module.css'

import useFetch from './useFetch'

import ComboboxCountries from '@/app/components/molecules/country-combo/ComboboxCountries'
import CountryList from '@/app/components/molecules/country-list/CountryList'
import { Locale } from '@/types/locale.types'
import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'

const CreateEvent: React.FC = () => {
  const [isOpenSelectTimeZone, setIsOpenSelectTimeZone] = useState(false)
  const [state, setState] = useState({
      eventName: '',
      time: '',
      date: '',
      language: '',
      eventLink: '',
      eventDescription: '',
      image: '',
  })
  const {timeZones} = useTimeZoneContext()
  const props = useMemo(
    () => ({
      locale: Intl.NumberFormat().resolvedOptions().locale as Locale,
      date: new Date(timeZones.origin.date),
    }),
    [timeZones.origin.date],
  )
  const flagList = useFetch(props)

  const handleClose = () => {
    setIsOpenSelectTimeZone(false)
  }

  return (
    <>
      <div className={styles['container-form']}>
        <form action="" className={styles['form']}>
          <div className={styles['container-event-name']}>
            <input
              className={styles['event-name']}
              id=""
              name="eventName"
              placeholder="Event name"
              type="text"
            />
          </div>

          <div className={styles['container-time-and-date']}>
            <div className={styles['container-with-toggle']}>
              <input className={styles['time']} id="" name="time" type="time" />
              <Toggle />
            </div>

            <div className={styles['container-with-toggle']}>
              <input className={styles['date']} id="" name="date" type="date" />
              <Toggle />
            </div>
          </div>

          <div className={styles['container-time-zone-and-language']}>
            <div className={styles['container-time-zone']}>
              <button
                className={styles['time-zone']}
                type="button"
                onClick={() => setIsOpenSelectTimeZone(true)}
              >
                Time zone
              </button>
              {isOpenSelectTimeZone && (
                <CountryList flagList={flagList} onClose={handleClose} />
              )}
            </div>

            <div className={styles['container-language']}>
              <select className={styles['language']} id="" name="language">
                <option value="lg-1">First language</option>
                <option value="lg-2">Second language</option>
              </select>
            </div>
          </div>

          <div className={styles['container-hyperlink']}>
            <input
              className={styles['hyperlink']}
              id=""
              name="eventLink"
              placeholder="Hyperlink"
              type="url"
            />
          </div>

          <div className={styles['container-description']}>
            <textarea
              className={styles['description']}
              id=""
              name="eventDescription"
              placeholder="Description"
            />
          </div>

          <div className={styles['container-upload-image']}>
            <input
              className={styles['upload-image']}
              id=""
              name="image"
              placeholder="how to do an update image?"
              type="text"
            />
          </div>

          <ComboboxCountries/>
        </form>
      </div>
    </>
  )
}

export default CreateEvent
