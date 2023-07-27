'use client'

import { useState, useMemo } from 'react'

import styles from './CreateEvent.module.css'

import useFetch from './useFetch'

import ComboboxCountries from '@/app/components/molecules/country-combo/ComboboxCountries'
import CountryList from '@/app/components/molecules/country-list/CountryList'
import { Locale } from '@/types/locale.types'

const CreateEvent: React.FC = () => {
  const [isOpenSelectTimeZone, setIsOpenSelectTimeZone] = useState(false)

  const props = useMemo(
    () => ({
      locale: Intl.NumberFormat().resolvedOptions().locale as Locale,
      date: new Date('2023-07-26'),
    }),
    [],
  )
  const flagList = useFetch(props)

  const handleClose = () => {
    setIsOpenSelectTimeZone(false)
  }

  return (
    <>
      <div className={styles['container-form']}>
        <form action="" className={styles.form}>
          <div>
            <input
              className={styles['full-width']}
              id=""
              name=""
              placeholder="Event name"
              type="text"
            />
          </div>

          <div className={styles['container-half-width']}>
            <div>
              <input
                className={styles['full-width']}
                id=""
                name=""
                type="time"
              />
            </div>
            <div>
              <input
                className={styles['full-width']}
                id=""
                name=""
                type="date"
              />
            </div>
          </div>

          <div className={styles['container-half-width']}>
            <div className={styles.halfWidth}>
              {/* Acá se abre el modal de los timeZone */}
              <button
                type="button"
                onClick={() => setIsOpenSelectTimeZone(true)}
              >
                Time zone
              </button>
              {isOpenSelectTimeZone && (
                <CountryList flagList={flagList} onClose={handleClose} />
              )}
            </div>
            <div className={styles.halfWidth}>
              <select className={styles['full-width']} id="" name="">
                <option value="lg-1">First language</option>
                <option value="lg-2">Second language</option>
              </select>
            </div>
          </div>

          <div>
            <input
              className={styles['full-width']}
              id=""
              name=""
              placeholder="Hyperlink"
              type="url"
            />
          </div>
          <div className={styles.prueba}>
            {/* // TODO: El div que envuelve los dos textarea, tiene como 2-3 más de altura | Help */}
            <textarea
              className={styles['full-width']}
              id=""
              name=""
              placeholder="Description"
            />
          </div>
          <div>
            {/* //! TODO: how to do an update image? */}
            <input
              className={styles['full-width']}
              id=""
              name=""
              placeholder="how to do an update image?"
              type="text"
            />
          </div>
          <ComboboxCountries format={24} />
          <div>
            {/* // TODO: El div que envuelve los dos textarea, tiene como 2-3 más de altura | Help */}
            <textarea
              className={styles['full-width']}
              id=""
              name=""
              placeholder="🚩 🚩 🚩 🚩 🚩 🚩 🚩 🚩"
            />
          </div>
        </form>
      </div>
    </>
  )
}

export default CreateEvent