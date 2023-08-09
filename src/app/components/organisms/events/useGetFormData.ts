import { useContext, useEffect, useState } from 'react'

import { TimeZoneContext } from '@/app/context/timeZoneContext'

export const useGetFormData = () => {
  const { timeZones } = useContext(TimeZoneContext)

  // Función que saque el date (xxxx-xx-xx)
  // Función que saque el time (xx:xx)
  // Ambas, de un:
  // new Date().toISOString() // '2023-08-09T16:47:45.835Z'
  //                              yyyy-mm-dd | hh:mm

  const originDate = timeZones.origin.date

  // const currentDate = originDate.slice(0, 10)
  const currentTime = originDate.slice(11, 16)

  // const currentDate = originDate.split('T')[0]
  // const currentTime =
  //   originDate.split('T')[1].split(':')[0] +
  //   ':' +
  //   originDate.split('T')[1].split(':')[1]

  const getCurrentDate = () => {
    const defaultDate = new Date(originDate)

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

    const currentDate = `${year}-${monthString}-${dayString}`

    return currentDate
  }

  const currentDate = getCurrentDate()

  const [formData, setFormData] = useState({
    eventName: '',
    time: currentTime,
    date: currentDate,
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

  return {
    formData,
    setFormData,
  }
}
