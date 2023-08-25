import { useEffect, useState } from 'react'

import { FormData } from './CreateEvent.types'

import { extractTime, getLocaleDate, getLocaleGmt } from '@/helpers/dates'
import { getUserTimezone } from '@/helpers/timezones'
import { getCountryByZone } from '@/services/timezones'
import { useTimeZoneContext } from '@/app/context/useTimeZoneContext'

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
    gmt: 'Z',
    hashtags: [],
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
      const localFormData = localStorage.getItem('form-data')
      if (localFormData) {
        const formData = JSON.parse(localFormData)
        setFormData(formData)
      } else {
        setInitialFormData()
      }
    }
    getInitialFormData()
  }, [])

  useEffect(() => {
    const saveFormData = () => {
      localStorage.setItem('form-data', JSON.stringify(formData))
    }
    saveFormData()
  }, [formData])

  return {
    formData,
    setFormData,
  }
}
