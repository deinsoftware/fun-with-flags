'use client'

import toast from 'react-hot-toast'

import { useState, useMemo, RefObject, useCallback, useEffect } from 'react'

import { Clock3 } from 'lucide-react'
import { useSession } from 'next-auth/react'

import styles from './CreateEvent.module.css'

import useFetch from './useFetch'

import { useGetFormData } from './useFormData'

import { shareEventsTwitter } from '@/helpers/share-events'

import { SelectCountry } from '@/app/components/molecules/select-country/SelectCountry'

import TimePicker from '@/app/components/atoms/util/time-picker/TimePicker'
import Button from '@/app/components/atoms/ui/button/Button'

import HashtagsInput from '@/app/components/atoms/util/hashtags-input/HashtagsInput'

import TitleOnPage from '@/app/components/atoms/ui/TitleOnPage'

import Toggle from '@/app/components/atoms/util/toggle/Toggle'

import CountryList from '@/app/components/molecules/country-list/CountryList'
import ComboboxCountries from '@/app/components/molecules/country-combo/ComboboxCountries'

import { Locale } from '@/types/locale.types'
import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'
import {
  addYearsToDate,
  extractDate,
  getLocaleDayPeriod,
  joinISODate,
} from '@/helpers/dates'
import { lucidIcons } from '@/libs/icon-config'

import { createEvent } from '@/services/event'
import { EventBody } from '@/types/event.types'
import { toastIconTheme, toastStyle } from '@/libs/react-host-toast-config'


const CreateEvent = () => {
  const [isOpenSelectTimeZone, setIsOpenSelectTimeZone] = useState(false)
  const { timeZones, setOriginDate, addTimeZone } = useTimeZoneContext()
  const {
    formData,
    setFormData,
    handleChangeForm,
    handleDateToggle,
    handleChangeTime,
    handleTimeToggle,
    addHashtag,
    removeHashtag,
    setCountryInfo,
  } = useGetFormData()
  const { data: session } = useSession()
  const [signal, setSignal] = useState<AbortSignal>()

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    setSignal(signal)

    return () => controller.abort()
  }, [])
  useEffect(() => {
    const gmt = formData.gmt
    const timezone = formData.timezone
    const countryCode = formData.country
    const time = formData.time
    const date = formData.date

    if (time && date && gmt && timezone && countryCode) {
      const originDate = joinISODate(date, time, gmt)
      setOriginDate({ countryCode, name: timezone }, originDate)
    }
  }, [
    formData.timezone,
    formData.country,
    formData.date,
    formData.time,
    formData.gmt,
  ])


  // FIXME: use values from user configuration
  const props = useMemo(
    () => ({
      locale: Intl.NumberFormat().resolvedOptions().locale as Locale,
      date: new Date(timeZones.origin.date),
    }),
    [timeZones.origin.date],
  )
  const dayPeriod = getLocaleDayPeriod('en-US')

  //TODO: add error message when fails
  const { data: flagList, error } = useFetch(props)

  const handleClose = () => {
    setIsOpenSelectTimeZone(false)
  }

  const handleChangeTextContent = useCallback(
    (ref: RefObject<HTMLDivElement> | null) => {
      if (ref?.current?.textContent) {
        const textContent = ref.current.textContent
        setFormData((prev) => ({
          ...prev,
          combo: textContent,
        }))
      } else {
        setFormData((prev) => ({
          ...prev,
          combo: '',
        }))
      }
    },
    [setFormData],
  )

  const [showTimePicker, setShowTimePicker] = useState(false)

  const handleCreateEvent = async () => {
    if (!session?.user?.name) {
      return toast.error('You must be logged in to create an event', {
        style: toastStyle,
      })
    }

    if (!formData.eventName || !formData.eventLink || !formData.combo) {
      return toast(
        `Necesitas agregar:${
          formData.eventName ? '' : '\n❌ Nombre del evento'
        }${formData.eventLink ? '' : '\n❌ Enlace'}${
          formData.combo ? '' : '\n❌ Zona horaria'
        }`,
        {
          style: toastStyle,
        },
      )
    }

    const body: EventBody = {
      description: formData.eventDescription,
      eventName: formData.eventName,
      timeZone: timeZones,
      url: formData.eventLink,
      userName: session.user.name,
      tags: formData.hashtags,
      lang: formData.language,
    }
    const response = await createEvent(body, signal)
    if (typeof response !== 'string') {
      toast.error(response.message, {
        style: toastStyle,
      })
      return
    }
    toast.success(response, {
      style: toastStyle,
      iconTheme: toastIconTheme,
    })
    localStorage.removeItem('form-data')
    localStorage.removeItem('time-zones')
  }

  const handleShareEventOnTwitter = () => {
    const url = shareEventsTwitter({
      text: `${formData.eventName}\n\n${formData.eventDescription}\n\n${formData.combo}\n`,
      url: `${formData.eventLink}\n`,
      hashtags: formData.hashtags,
    })
    window.open(url, '_blank')
  }

  const [optionsCombo, setOptionsCombo] = useState({
    hourComplete: true,
    showGmt: true,
    showGmtWord: true,
  })

  return (
    <>
      <div className={styles['container-form']}>
        <TitleOnPage>Create Event</TitleOnPage>
        <form action="" className={styles['form']}>
          <SelectCountry
            countryCode={formData.country}
            date={formData.date}
            flagList={flagList}
            gmt={formData.gmt}
            setCountryInfo={setCountryInfo}
            timezone={formData.timezone}
          />
          <div className={styles['container-event-name']}>
            <input
              aria-label="Event name"
              className={styles['event-name']}
              id=""
              name="eventName"
              placeholder="Event name"
              type="text"
              value={formData.eventName}
              onChange={handleChangeForm}
            />
          </div>
          <div className={styles['container-time-and-date']}>
            <div className={styles['container-to-position-relative']}>
              <div
                className={`${styles['container-with-toggle']} ${styles['container-time']}`}
              >
                <div className={styles['input-button']}>
                  <input
                    aria-label="Add time"
                    className={`${styles['time']}`}
                    id=""
                    name="time"
                    type="time"
                    value={formData.time}
                    onChange={handleChangeForm}
                  />
                  <button
                    className={styles['select-time']}
                    type="button"
                    onClick={() => setShowTimePicker(!showTimePicker)}
                  >
                    <Clock3
                      color={lucidIcons.color.main}
                      size={lucidIcons.size}
                    />
                  </button>
                  {showTimePicker && (
                    <TimePicker
                      dayPeriod={dayPeriod}
                      format={formData.toggleState.timeFormat}
                      time={formData.time}
                      onClick={handleChangeTime}
                    />
                  )}
                </div>

                <div className={styles['container-toggle']}>
                  <Toggle
                    value={
                      formData.toggleState.timeFormat === 12 ? false : true
                    }
                    onToggle={handleTimeToggle}
                  />
                  <span className={styles['text-toggle']}>24H</span>
                </div>
              </div>
            </div>

            <div className={styles['container-to-position-relative']}>
              <div
                className={`${styles['container-with-toggle']} ${
                  styles['container-date']
                } ${
                  formData.toggleState.dateIsDisable
                    ? styles['hidding-after']
                    : ''
                }`}
              >
                <input
                  aria-label="Add date"
                  className={`${styles['date']} ${
                    formData.toggleState.dateIsDisable ? styles['disabled'] : ''
                  }`}
                  disabled={formData.toggleState.dateIsDisable}
                  id=""
                  max={extractDate(addYearsToDate(new Date(), 100))}
                  min={extractDate(new Date())}
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChangeForm}
                />

                <div className={styles['container-toggle']}>
                  <Toggle
                    value={!formData.toggleState.dateIsDisable}
                    onToggle={handleDateToggle}
                  />
                  <span className={styles['text-toggle']}>Use date</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['container-hyperlink']}>
            <input
              aria-label="Add link to event"
              className={styles['hyperlink']}
              id=""
              name="eventLink"
              placeholder="Hyperlink"
              type="url"
              value={formData.eventLink}
              onChange={handleChangeForm}
            />
          </div>
          <textarea
            aria-label="Add description to event"
            className={styles['description']}
            id=""
            name="eventDescription"
            placeholder="Description"
            value={formData.eventDescription}
            onChange={handleChangeForm}
          />

          <HashtagsInput
            addHashtag={addHashtag}
            hashTagsList={formData.hashtags}
            removeHashtag={removeHashtag}
          />

          <ComboboxCountries
            getTextContent={handleChangeTextContent}
            handleAddCountry={setIsOpenSelectTimeZone}
            showGmt={optionsCombo.showGmt}
            showGmtWord={optionsCombo.showGmtWord}
            showHourComplete={optionsCombo.hourComplete}
          />
          <div className={styles['container-options-combo']}>
            <Toggle
              value={false}
              onToggle={() => {
                setOptionsCombo((prev) => ({
                  ...prev,
                  hourComplete: !prev.hourComplete,
                }))
              }}
            />
            <p>Show only hours</p>
          </div>
          <div className={styles['container-options-combo']}>
            <Toggle
              value
              onToggle={() => {
                setOptionsCombo((prev) => ({
                  ...prev,
                  showGmt: !prev.showGmt,
                  showGmtWord: !prev.showGmt,
                }))
              }}
            />
            <p>Show GMT</p>
          </div>
          {optionsCombo.showGmt && (
            <div className={styles['container-options-combo']}>
              <Toggle
                value
                onToggle={() => {
                  setOptionsCombo((prev) => ({
                    ...prev,
                    showGmtWord: !prev.showGmtWord,
                  }))
                }}
              />
              <p>Show GMT word</p>
            </div>
          )}

          <div className={styles['container-button']}>
            <Button disabled={!session} handleClick={handleCreateEvent}>
              Create
            </Button>
            <Button handleClick={handleShareEventOnTwitter}>Share</Button>
          </div>
        </form>
      </div>
      {isOpenSelectTimeZone && (
        <CountryList
          flagList={flagList}
          handleSelect={addTimeZone}
          onClose={handleClose}
        />
      )}
      <div id="country-list-modal" />
    </>
  )
}

export default CreateEvent
