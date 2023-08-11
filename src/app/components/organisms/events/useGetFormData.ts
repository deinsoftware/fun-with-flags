import { useEffect, useState } from 'react'

import { FormData } from './CreateEvent.types'

import { extractTime, getDate, getGmt } from '@/helpers/dates'
import { getTimezone } from '@/helpers/get-time-zone'
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
    country: 'CO',
    timezone: 'America/Bogota',
    gmt: '',
  })
  const { addTimeZone } = useTimeZoneContext()
  useEffect(() => {
    const setInitialFormData = async () => {
      const currentDate = new Date()
      const timezone = getTimezone()
      const countryCode = (await getCountryByZone(timezone)) ?? 'CO'

      const initValue = {
        time: extractTime(currentDate),
        date: getDate({ timeZone: timezone }, currentDate),
        country: countryCode,
        timezone: timezone,
        gmt:
          getGmt(
            { timeZone: timezone, timeZoneName: 'longOffset' },
            currentDate,
          )?.replace('GMT', '') ?? 'Z',
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
