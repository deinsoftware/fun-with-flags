'use client'

import toast from 'react-hot-toast'

import {
  useState,
  useMemo,
  ChangeEvent,
  RefObject,
  useCallback,
  useEffect,
} from 'react'

import { Clock3 } from 'lucide-react'
import { useSession } from 'next-auth/react'

import styles from './CreateEvent.module.css'

import useFetch from './useFetch'

import { useGetFormData } from './useGetFormData'

import { SelectCountry } from '@/app/components/molecules/select-country/SelectCountry'

import TimePicker from '@/app/components/atoms/util/time-picker/TimePicker'
import { Button } from '@/app/components/atoms/ui/button/Button'

import TitleOnPage from '@/app/components/atoms/ui/TitleOnPage'

import Toggle from '@/app/components/atoms/util/toggle/Toggle'

import CountryList from '@/app/components/molecules/country-list/CountryList'
import ComboboxCountries from '@/app/components/molecules/country-combo/ComboboxCountries'

import { getLocaleDayPeriod } from '@/helpers/dates'

import { Locale } from '@/types/locale.types'
import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'
import {
  addDateYears,
  extractDate,
  getLocaleDate,
  joinISODate,
} from '@/helpers/dates'
import { lucidIcons } from '@/libs/icon-config'

import { createEvent } from '@/services/event'
import { EventBody } from '@/types/event.types'
import { toastIconTheme, toastStyle } from '@/libs/react-host-toast-config'
import { DatePattern } from '@/types/dates.types'

const CreateEvent = () => {
  const [isOpenSelectTimeZone, setIsOpenSelectTimeZone] = useState(false)
  const { timeZones, setOriginDate, addTimeZone } = useTimeZoneContext()
  const { formData, setFormData } = useGetFormData()
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

  const props = useMemo(
    () => ({
      locale: Intl.NumberFormat().resolvedOptions().locale as Locale,
      date: new Date(timeZones.origin.date),
    }),
    [timeZones.origin.date],
  )
  const { data: flagList, error } = useFetch(props)

  const handleClose = () => {
    setIsOpenSelectTimeZone(false)
  }

  const [dateDisabled, setDateDisabled] = useState(false)

  const handleDateToggle = (disabled: boolean) => {
    setDateDisabled(disabled)
    setFormData((prev) => ({
      ...prev,
      date: getLocaleDate(
        { timeZone: prev.timezone },
        new Date(),
      ) as DatePattern,
    }))
  }

  const handleChangeForm = (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
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
    if (session?.user?.name) {
      const body: EventBody = {
        description: formData.eventDescription,
        eventName: formData.eventName,
        timeZone: timeZones,
        url: formData.eventLink,
        userName: session.user.name,
        // tags?: string[],
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
    } else {
      toast.error('You must be logged in to create an event', {
        style: toastStyle,
      })
    }
  }

  const [format12, setFormat12] = useState(true)

  const handleClick = (time: string) => {
    console.log({ time })
  }

  const dayPeriod = getLocaleDayPeriod('en-US')

  return (
    <>
      <div className={styles['container-form']}>
        <TitleOnPage>Create Event</TitleOnPage>
        <form action="" className={styles['form']}>
          <SelectCountry
            countryCode={formData.country}
            date={formData.date}
            flagList={flagList}
            setFormData={setFormData}
          />
          <div className={styles['container-event-name']}>
            <input
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
                      format={format12 ? 12 : 24}
                      time="23:15"
                      onClick={handleClick}
                    />
                  )}
                </div>

                <div className={styles['container-toggle']}>
                  <Toggle
                    onToggle={() => {
                      setFormat12((prev) => !prev)
                    }}
                  />
                  <span className={styles['text-toggle']}>24H</span>
                </div>
              </div>
            </div>

            <div className={styles['container-to-position-relative']}>
              <div
                className={`${styles['container-with-toggle']} ${styles['container-date']}`}
              >
                <input
                  className={`${styles['date']} ${
                    dateDisabled ? styles['disabled'] : ''
                  }`}
                  disabled={dateDisabled}
                  id=""
                  max={extractDate(addDateYears(new Date(), 100))}
                  min={extractDate(new Date())}
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChangeForm}
                />

                <div className={styles['container-toggle']}>
                  <Toggle onToggle={handleDateToggle} />
                  <span className={styles['text-toggle']}>Use data</span>
                </div>
              </div>
            </div>
          </div>

          <div className={styles['container-hyperlink']}>
            <input
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
            className={styles['description']}
            id=""
            name="eventDescription"
            placeholder="Description"
            value={formData.eventDescription}
            onChange={handleChangeForm}
          />

          <ComboboxCountries
            getTextContent={handleChangeTextContent}
            handleAddCountry={setIsOpenSelectTimeZone}
          />

          <div className={styles['container-button']}>
            <Button disabled={!session} handleClick={handleCreateEvent}>
              Create
            </Button>
            <Button handleClick={() => {}}>Share</Button>
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
