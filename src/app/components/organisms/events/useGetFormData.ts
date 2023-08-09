import { useContext, useEffect, useState } from 'react'

import { TimeZoneContext } from '@/app/context/timeZoneContext'

export const useGetFormData = () => {
  const { timeZones } = useContext(TimeZoneContext)

  const [formData, setFormData] = useState({
    eventName: '',
    time: '',
    date: '',
    language: '',
    eventLink: '',
    eventDescription: '',
    image: '',
    combo: '',
  })

  useEffect(() => {
    const getInitialFormData = () => {
      const localFormData = localStorage.getItem('form-data')
      if (localFormData) {
        const formData = JSON.parse(localFormData)
        setFormData(formData)
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

  useEffect(() => {
    const originDate = timeZones.origin.date
    const defaultDate = new Date(originDate)

    const getCurrentDate = () => {
      const year = defaultDate.getFullYear()
      const month = defaultDate.getMonth() + 1
      const day = defaultDate.getDate()

      let monthString, dayString

      if (month < 10) {
        monthString = `0${month}`
      }
      if (day < 10) {
        dayString = `0${day}`
      }

      return `${year}-${monthString}-${dayString}`
    }

    const getCurrentTime = () => {
      const hours = defaultDate.getHours()
      const minutes = defaultDate.getMinutes()

      if (minutes < 10) return `${hours}:0${minutes}`

      return `${hours}:${minutes}`
    }

    const currentDate = getCurrentDate()
    const currentTime = getCurrentTime()

    setFormData((prev) => ({
      ...prev,
      date: currentDate,
      time: currentTime,
    }))
  }, [timeZones.origin.date])

  return {
    formData,
    setFormData,
  }
}
