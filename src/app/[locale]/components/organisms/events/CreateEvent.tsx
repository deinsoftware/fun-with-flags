'use client'

import toast from 'react-hot-toast'

import { useTranslations } from 'next-intl'

import { useState, useMemo, RefObject, useCallback, useEffect } from 'react'

import { Clock3, Copy, Save, Twitter } from 'lucide-react'
import { useSession } from 'next-auth/react'

import styles from './CreateEvent.module.css'
import { cleanDataStorage } from './CreateEvent.utils'

import { useFormData } from './useFormData'
import { useShareEvent } from './useShareEvent'
import { useTimezones } from './useTimezones'

import { Locale } from '@/types/locale.types'
import {
  addYearsToDate,
  extractDate,
  getLocaleDayPeriod,
  joinISODate,
} from '@/helpers/dates'
import { Zone } from '@/helpers/events.types'

import { useTimeZoneContext } from '@/context/useTimeZoneContext'

import Button from '@/components/atoms/ui/Button'
import TimePicker from '@/components/atoms/util/time-picker/TimePicker'
import Title from '@/components/atoms/ui/Title'
import Toggle from '@/components/atoms/util/toggle/Toggle'
import Hashtags from '@/components/molecules/hashtags/Hashtags'
import CountryList from '@/components/molecules/country-list/CountryList'
import { SelectCountry } from '@/components/molecules/select-country/SelectCountry'
import ComboboxCountries from '@/components/molecules/country-combo/ComboboxCountries'

import { createEvent } from '@/services/event'

import { getCountry } from '@/helpers/timezones'

import { lucidIcons, lucidIconsButton } from '@/libs/icon-config'

import { useIsMobile } from '@/hooks/useIsMobile'
import { toastStyle } from '@/libs/toast'
import { showResponseResult } from '@/helpers/alert'

const CreateEvent = () => {
  const t = useTranslations('Events')
  const tResponse = useTranslations('Response')

  const [signal, setSignal] = useState<AbortSignal>()

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal
    setSignal(signal)

    return () => controller.abort()
  }, [])

  const { timeZones, setOriginDate, addTimeZone } = useTimeZoneContext()
  const [isOpenSelectTimeZone, setIsOpenSelectTimeZone] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)
  const [optionsCombo, setOptionsCombo] = useState({
    hideMins: false,
    showGmt: true,
    onlyNum: false,
    hideEmojis: false,
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
  } = useFormData()

  const { handleShareEventOnTwitter, handleCopyToClipboard } = useShareEvent({
    formData,
    hideEmojis: optionsCombo.hideEmojis,
  })

  const { data: session } = useSession()

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
      signal,
    }),
    [timeZones.origin.date, signal],
  )
  const dayPeriod = getLocaleDayPeriod('en-US')

  //TODO: add error message when fails
  const { timezoneList, timezoneError, getTimeZones } = useTimezones(props)

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
      return toast.error(t('Create.Form.Error.login'), {
        style: toastStyle,
      })
    }

    const validationResult = requiredFieldsValidation()
    if (!validationResult) {
      return toast.error(`${t('Create.Form.Error.Required.message')}`, {
        style: toastStyle,
      })
    }

    const body = {
      description: formData.eventDescription,
      name: formData.eventName,
      timeZone: timeZones,
      url: formData.eventLink,
      userName: session.user.name,
      tags: formData.hashtags,
    }

    const response = await createEvent(body, signal)

    showResponseResult({ response, t: tResponse, title: t('title') })
    cleanDataStorage()
  }

  const isMobile = useIsMobile()
  const handleSelectTimeZone = (zone: Zone) => {
    const result = addTimeZone(zone)

    const name = getCountry(zone.name)
    if (isMobile && result) {
      toast.success(t('Create.Toast.selectedTimezone', { name }), {
        style: toastStyle,
      })
    }
    if (isMobile && !result) {
      toast.error(t('Create.Toast.alreadySelectedTimezone', { name }), {
        style: toastStyle,
      })
    }
  }
  return (
    <>
      <div className={styles['container-form']}>
        <Title>{t('Create.title')}</Title>
        <form action="" className={styles['form']}>
          <SelectCountry
            countryCode={formData.country}
            date={formData.date}
            gmt={formData.gmt}
            setCountryInfo={setCountryInfo}
            timezone={formData.timezone}
            timezoneList={timezoneList}
          />
          <div className={styles['container-event-name']}>
            <input
              required
              aria-label={t('Create.Form.Fields.eventName')}
              className={`${styles['event-name']} ${
                wasSubmitted && !formData.eventName ? styles['empty'] : ''
              }`}
              id=""
              name="eventName"
              placeholder={t('Create.Form.Fields.eventName')}
              type="text"
              value={formData.eventName}
              onChange={handleChangeForm}
            />
            {wasSubmitted && !formData.eventName && (
              <span className={styles['required']}>
                {t('Create.Form.Error.Required.eventName')}
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
                    aria-label={t('Create.Form.Fields.time')}
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
                    value={formData.toggleState.timeFormat === 24}
                    onToggle={handleTimeToggle}
                  />
                  <span className={styles['text-toggle']}>
                    {t('Create.Form.Toggle.time')}
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
                  aria-label={t('Create.Form.Fields.date')}
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
                    {t('Create.Form.Toggle.date')}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles['container-hyperlink']}>
            <input
              required
              aria-label={t('Create.Form.Fields.eventLink')}
              className={`${styles['hyperlink']} ${
                wasSubmitted && !formData.eventLink ? styles['empty'] : ''
              }`}
              id=""
              name="eventLink"
              placeholder={t('Create.Form.Fields.eventLink')}
              type="url"
              value={formData.eventLink}
              onChange={handleChangeForm}
            />
            {wasSubmitted && !formData.eventLink && (
              <span className={styles['required']}>
                {t('Create.Form.Error.Required.eventLink')}
              </span>
            )}
          </div>
          <textarea
            aria-label={t('Create.Form.Fields.eventDescription')}
            className={styles['description']}
            id=""
            name="eventDescription"
            placeholder={t('Create.Form.Fields.eventDescription')}
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
                {t('Create.Form.Error.Required.combo')}
              </span>
            )}
          </div>

          <div className={styles['container-toggles']}>
            <div className={styles['container-options-combo']}>
              <Toggle
                value={optionsCombo.hideEmojis}
                onToggle={() => {
                  setOptionsCombo((prev) => ({
                    ...prev,
                    hideEmojis: !prev.hideEmojis,
                  }))
                }}
              />
              <span className={styles['text-toggle']}>
                {t('Create.Form.Toggle.hideEmojis')}
              </span>
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
                {t('Create.Form.Toggle.hideMins')}
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
                {t('Create.Form.Toggle.showGmt')}
              </span>
            </div>
            <div className={styles['container-options-combo']}>
              <Toggle
                disabled={!optionsCombo.showGmt}
                value={optionsCombo.onlyNum}
                onToggle={() => {
                  setOptionsCombo((prev) => ({
                    ...prev,
                    onlyNum: !prev.onlyNum,
                  }))
                }}
              />
              <span
                className={styles['text-toggle']}
                style={{ opacity: `${!optionsCombo.showGmt ? '0.3' : 1}` }}
              >
                {t('Create.Form.Toggle.onlyNum')}
              </span>
            </div>
          </div>

          <div className={styles['container-button']}>
            <Button
              disabled={!session}
              handleClick={handleCreateEvent}
              text={t('Create.Form.Button.create')}
              textHover={t('Create.Form.Button.hover')}
            >
              <Save
                color={lucidIconsButton.color.white}
                size={lucidIconsButton.size}
                strokeWidth={lucidIconsButton.strokeWidth}
              />
            </Button>

            <Button
              handleClick={handleShareEventOnTwitter}
              text={t('Create.Form.Button.share')}
            >
              <Twitter
                color={lucidIconsButton.color.white}
                size={lucidIconsButton.size}
                strokeWidth={lucidIconsButton.strokeWidth}
              />
            </Button>

            <Button
              handleClick={handleCopyToClipboard}
              text={t('Create.Form.Button.clipboard')}
            >
              <Copy
                color={lucidIconsButton.color.white}
                size={lucidIconsButton.size}
                strokeWidth={lucidIconsButton.strokeWidth}
              />
            </Button>
          </div>
        </form>
      </div>

      {isOpenSelectTimeZone && (
        <CountryList
          handleSelect={handleSelectTimeZone}
          timezoneList={timezoneList}
          onClose={handleClose}
        />
      )}
      <div id="country-list-modal" />
    </>
  )
}

export default CreateEvent
