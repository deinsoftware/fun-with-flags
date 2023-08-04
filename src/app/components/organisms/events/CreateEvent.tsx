'use client'

import CookieConsent from 'react-cookie-consent'

import { useState, useMemo } from 'react'

import Toggle from '../../atoms/util/toggle/Toggle'

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

  const [timeDisabled, setTimeDisabled] = useState(false)
  const [dateDisabled, setDateDisabled] = useState(false)

  const handleTimeToggle = (disabled: boolean) => {
    setTimeDisabled(disabled)
  }

  const handleDateToggle = (disabled: boolean) => {
    setDateDisabled(disabled)
  }

  return (
    <>
      <div className={styles['container-form']}>
        <form action="" className={styles['form']}>
          <div className={styles['container-event-name']}>
            <input
              className={styles['event-name']}
              id=""
              name=""
              placeholder="Event name"
              type="text"
            />
          </div>

          <div className={styles['container-time-and-date']}>
            <div className={styles['container-with-toggle']}>
              <input
                className={`${styles['time']} ${
                  timeDisabled ? styles['disabled'] : ''
                }`}
                disabled={timeDisabled}
                id=""
                name=""
                type="time"
              />
              <div className={styles['container-toggle']}>
                <Toggle onToggle={handleTimeToggle} />
                <span className={styles['text-toggle']}>24h</span>
              </div>
            </div>

            <div className={styles['container-with-toggle']}>
              <input
                className={`${styles['date']} ${
                  dateDisabled ? styles['disabled'] : ''
                }`}
                disabled={dateDisabled}
                id=""
                name=""
                type="date"
              />
              <div className={styles['container-toggle']}>
                <Toggle onToggle={handleDateToggle} />
                <span className={styles['text-toggle']}>Use data</span>
              </div>
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
              <select className={styles['language']} id="" name="">
                <option value="lg-1">First language</option>
                <option value="lg-2">Second language</option>
              </select>
            </div>
          </div>

          <div className={styles['container-hyperlink']}>
            <input
              className={styles['hyperlink']}
              id=""
              name=""
              placeholder="Hyperlink"
              type="url"
            />
          </div>

          <div className={styles['container-description']}>
            <textarea
              className={styles['description']}
              id=""
              name=""
              placeholder="Description"
            />
          </div>

          <div className={styles['container-upload-image']}>
            <input
              className={styles['upload-image']}
              id=""
              name=""
              placeholder="how to do an update image?"
              type="text"
            />
          </div>

          <ComboboxCountries />
        </form>
      </div>
      <CookieConsent
        overlay
        buttonStyle={{
          color: '#F9FBFC',
          background: '#7E56DA',
          fontSize: '13px',
        }} // botón de aceptar
        buttonText="Let's go"
        // declineButtonText="<string>"
        // cookieName="myAwesomeCookieName2"
        // expires={150}
        hideOnDecline={false}
        onDecline={() => {
          alert('Ni modo, no puedes crear el evento entonces...')
        }}
        location="bottom"
        // acceptOnOverlayClick // tecnicamente ilegal
        style={{ background: '#1C1C1C' }}
        enableDeclineButton // habilitar el botón de declinar
        // flipButtons // cambiar de lugar los botones
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  )
}

export default CreateEvent
