import { useEffect, useState, type ChangeEvent } from 'react'

import { FormData } from './CreateEvent.types'

import { extractTime, getLocaleDate, getLocaleGmt } from '@/helpers/dates'
import { getUserTimezone } from '@/helpers/timezones'
import { getCountryByZone } from '@/services/timezones'
import { useTimeZoneContext } from '@/context/useTimeZoneContext'
import {
  getDataStorage,
  setDataStorage,
  cleanDataStorage,
} from '@/components/organisms/events/CreateEvent.utils'
import { TimePattern, GmtPattern } from '@/types/dates.types'
import { TimeFormat } from '@/helpers/events.types'
import { Countries } from '@/types/countries.types'
import { Timezones } from '@/types/timezones.types'

export const useGetFormData = () => {
  const [formData, setFormData] = useState<FormData>({
    eventName: '',
    time: '',
    date: '',
    language: '',
    eventLink: '',
    eventDescription: '',
    image: '',
    combo: '',
    country: 'US',
    timezone: 'America/New_York',
    gmt: '-05:00',
    hashtags: [],
    toggleState: {
      timeFormat: 12,
      dateIsDisable: false,
    },
    signature: {
      version: '',
      date: '',
    },
  })

  const { addTimeZone } = useTimeZoneContext()

  useEffect(() => {
    const setInitialFormData = async () => {
      const currentDate = new Date()
      const timezone = getUserTimezone()
      const countryCode = (await getCountryByZone(timezone)) ?? 'US'

      const initValue = {
        time: extractTime(currentDate),
        date: getLocaleDate({ timeZone: timezone }, currentDate),
        country: countryCode,
        timezone: timezone,
        gmt: getLocaleGmt(
          { timeZone: timezone, timeZoneName: 'longOffset' },
          currentDate,
        ),
      }

      setFormData((prev) => ({
        ...prev,
        ...initValue,
      }))

      const initialCountryCombo = {
        countryCode,
        name: timezone,
      }
      addTimeZone(initialCountryCombo)
    }
    const getInitialFormData = () => {
      const localFormData = getDataStorage()
      if (localFormData === null) {
        cleanDataStorage()
        setInitialFormData()
      } else {
        setFormData(localFormData)
      }
    }
    getInitialFormData()
  }, [])

  useEffect(() => {
    const saveFormData = () => {
      setDataStorage(formData)
    }
    saveFormData()
  }, [formData])

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

  const handleDateToggle = () => {
    setFormData((prev) => {
      let current = {
        ...prev,
        toggleState: {
          ...prev.toggleState,
          dateIsDisable: !prev.toggleState.dateIsDisable,
        },
      }
      if (prev.toggleState.dateIsDisable) {
        current.date = getLocaleDate({ timeZone: prev.timezone }, new Date())
      }
      return current
    })
  }

  const handleChangeTime = (time: TimePattern) => {
    setFormData((prev) => ({
      ...prev,
      time,
    }))
  }

  const handleTimeToggle = () => {
    setFormData((prev) => {
      const timeFormat = (
        prev.toggleState.timeFormat === 12 ? 24 : 12
      ) as TimeFormat

      const current = {
        ...prev,
        toggleState: {
          ...prev.toggleState,
          timeFormat,
        },
      }
      return current
    })
  }

  const addHashtag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      hashtags: [...prev.hashtags, tag],
    }))
  }

  const removeHashtag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      hashtags: prev.hashtags.filter((t) => t !== tag),
    }))
  }

  const setCountryInfo = (
    countryCode: Countries,
    name: Timezones,
    gmt: GmtPattern,
  ) => {
    setFormData((prev) => ({
      ...prev,
      country: countryCode,
      timezone: name,
      gmt,
    }))
  }

  const [wasSubmitted, setWasSubmitted] = useState(false)

  const requiredFieldsValidation = () => {
    const haveEmptyFields =
      !formData.eventName || !formData.eventLink || !formData.combo

    setWasSubmitted(haveEmptyFields)
    return !haveEmptyFields
  }

  return {
    formData,
    setFormData,
    handleChangeForm,
    handleTimeToggle,
    handleChangeTime,
    handleDateToggle,
    addHashtag,
    removeHashtag,
    setCountryInfo,
    wasSubmitted,
    requiredFieldsValidation,
  }
}
