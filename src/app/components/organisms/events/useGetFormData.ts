import { useEffect, useState } from 'react'

import { FormData } from './CreateEvent.types'

import { getDate, getGmt } from '@/helpers/dates'
import { getTimezone } from '@/helpers/get-time-zone'
import { getCountryByZone } from '@/services/timezones'

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
    country: 'CO',
    timezone: '',
    gmt: '',
  })
  useEffect(() => {
    const setInitialFormData = async () => {
      const currentDate = new Date()
      const timezone = getTimezone()

      const initValue = {
        time: `${currentDate.getHours()}:${currentDate.getMinutes()}`,
        date: getDate({ timeZone: timezone }, currentDate),
        country: (await getCountryByZone(timezone)) ?? 'CO',
        timezone: timezone,
        gmt:
          getGmt({ timeZone: timezone }, currentDate)?.replace('GMT', '') ??
          'Z',
      }

      setFormData((prev) => ({
        ...prev,
        ...initValue,
      }))
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
