'use client'

import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

import { useState, useMemo, RefObject, useCallback, useEffect } from 'react'

import { Clock3 } from 'lucide-react'
import { useSession } from 'next-auth/react'

import styles from './CreateEvent.module.css'

import useFetchCountries from './useFetchCountries'

import { useGetFormData } from './useFormData'

import { cleanDataStorage } from './CreateEvent.utils'

import { shareEventsTwitter } from '@/helpers/share-events'

import { SelectCountry } from '@/components/molecules/select-country/SelectCountry'

import TimePicker from '@/components/atoms/util/time-picker/TimePicker'
import Button from '@/components/atoms/ui/Button'

import Hashtags from '@/components/molecules/hashtags/Hashtags'

import TitleOnPage from '@/components/atoms/ui/TitleOnPage'

import Toggle from '@/components/atoms/util/toggle/Toggle'

import CountryList from '@/components/molecules/country-list/CountryList'
import ComboboxCountries from '@/components/molecules/country-combo/ComboboxCountries'

import { Locale } from '@/types/locale.types'
import { useTimeZoneContext } from '@/context/useTimeZoneContext'
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
import { useIsMobile } from '@/hooks/useIsMobile'
import { Zone } from '@/helpers/events.types'
import { getCountry } from '@/helpers/timezones'

const CreateEvent = () => {
  const t = useTranslations('Events.Create')

  const { timeZones, setOriginDate, addTimeZone } = useTimeZoneContext()
  const [isOpenSelectTimeZone, setIsOpenSelectTimeZone] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [optionsCombo, setOptionsCombo] = useState({
    hideMins: false,
    showGmt: true,
    onlyNum: false,
  })

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
    wasSubmitted,
    requiredFieldsValidation,
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
  const { data: flagList, error } = useFetchCountries(props)

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

  const handleCreateEvent = async () => {
    if (!session?.user?.name) {
      return toast.error(t('Form.Error.login'), {
        style: toastStyle,
      })
    }

    const validationResult = requiredFieldsValidation()
    if (!validationResult) {
      return toast.error(`${t('Form.Error.Required.message')}`, {
        style: toastStyle,
      })
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
      return toast.error(response.message, {
        style: toastStyle,
      })
    }

    toast.success(response, {
      style: toastStyle,
      iconTheme: toastIconTheme,
    })

    cleanDataStorage()
  }

  const handleShareEventOnTwitter = () => {
    const text = `${formData.eventName}\n\n${formData.eventDescription}\n\n${formData.combo}\n`

    const url = shareEventsTwitter({
      text,
      url: `${formData.eventLink}\n`,
      hashtags: formData.hashtags,
    })
    window.open(url, '_blank')
  }

  const isMobile = useIsMobile()
  const handleSelectTimeZone = (zone: Zone) => {
    const result = addTimeZone(zone)
    const name = getCountry(zone.name)
    if (isMobile && result) {
      toast(t('Toast.selectedTimezone', { name }), {
        style: toastStyle,
        duration: 3000,
      })
    }
  }
  return (
    <>
      <div className={styles['container-form']}>
        <TitleOnPage>{t('title')}</TitleOnPage>
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
              required
              aria-label={t('Form.Fields.eventName')}
              className={`${styles['event-name']} ${
                wasSubmitted && !formData.eventName ? styles['empty'] : ''
              }`}
              id=""
              name="eventName"
              placeholder={t('Form.Fields.eventName')}
              type="text"
              value={formData.eventName}
              onChange={handleChangeForm}
            />
            {wasSubmitted && !formData.eventName && (
              <span className={styles['required']}>
                {t('Form.Error.Required.eventName')}
              </span>
            )}
          </div>
          <div className={styles['container-time-and-date']}>
            <div className={styles['container-to-position-relative']}>
              <div
                className={`${styles['container-with-toggle']} ${styles['container-time']}`}
              >
                <div className={styles['input-button']}>
                  <input
                    aria-label={t('Form.Fields.time')}
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
                  <span className={styles['text-toggle']}>
                    {t('Form.Toggle.time')}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles['container-to-position-relative']}>
              <div
                className={`${styles['container-with-toggle']} ${
                  styles['container-date']
                } ${
                  formData.toggleState.dateIsDisable
                    ? styles['hiding-after']
                    : ''
                }`}
              >
                <input
                  aria-label={t('Form.Fields.date')}
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
                  <span className={styles['text-toggle']}>
                    {t('Form.Toggle.date')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['container-hyperlink']}>
            <input
              required
              aria-label={t('Form.Fields.eventLink')}
              className={`${styles['hyperlink']} ${
                wasSubmitted && !formData.eventLink ? styles['empty'] : ''
              }`}
              id=""
              name="eventLink"
              placeholder={t('Form.Fields.eventLink')}
              type="url"
              value={formData.eventLink}
              onChange={handleChangeForm}
            />
            {wasSubmitted && !formData.eventLink && (
              <span className={styles['required']}>
                {t('Form.Error.Required.eventLink')}
              </span>
            )}
          </div>
          <textarea
            aria-label={t('Form.Fields.eventDescription')}
            className={styles['description']}
            id=""
            name="eventDescription"
            placeholder={t('Form.Fields.eventDescription')}
            value={formData.eventDescription}
            onChange={handleChangeForm}
          />

          <Hashtags
            addHashtag={addHashtag}
            hashTagsList={formData.hashtags}
            removeHashtag={removeHashtag}
          />

          <div>
            <ComboboxCountries
              format={formData.toggleState.timeFormat}
              getTextContent={handleChangeTextContent}
              handleAddCountry={setIsOpenSelectTimeZone}
              isRequired={wasSubmitted && !formData.combo}
              optionsCombo={optionsCombo}
            />
            {wasSubmitted && !formData.combo && (
              <span className={styles['required']}>
                {t('Form.Error.Required.combo')}
              </span>
            )}
          </div>

          <div className={styles['container-options-combo']}>
            <Toggle
              value={optionsCombo.hideMins}
              onToggle={() => {
                setOptionsCombo((prev) => ({
                  ...prev,
                  hideMins: !prev.hideMins,
                }))
              }}
            />
            <span className={styles['text-toggle']}>
              {t('Form.Toggle.hideMins')}
            </span>
          </div>
          <div className={styles['container-options-combo']}>
            <Toggle
              value={optionsCombo.showGmt}
              onToggle={() => {
                setOptionsCombo((prev) => ({
                  ...prev,
                  showGmt: !prev.showGmt,
                  onlyNum: false,
                }))
              }}
            />
            <span className={styles['text-toggle']}>
              {t('Form.Toggle.showGmt')}
            </span>
          </div>
          {optionsCombo.showGmt && (
            <div className={styles['container-options-combo']}>
              <Toggle
                value={optionsCombo.onlyNum}
                onToggle={() => {
                  setOptionsCombo((prev) => ({
                    ...prev,
                    onlyNum: !prev.onlyNum,
                  }))
                }}
              />
              <span className={styles['text-toggle']}>
                {t('Form.Toggle.onlyNum')}
              </span>
            </div>
          )}

          <div className={styles['container-button']}>
            <Button disabled={!session} handleClick={handleCreateEvent}>
              {t('Form.Button.create')}
            </Button>
            <Button handleClick={handleShareEventOnTwitter}>
              {t('Form.Button.share')}
            </Button>
          </div>
        </form>
      </div>

      {isOpenSelectTimeZone && (
        <CountryList
          flagList={flagList}
          handleSelect={handleSelectTimeZone}
          onClose={handleClose}
        />
      )}
      <div id="country-list-modal" />
    </>
  )
}

export default CreateEvent