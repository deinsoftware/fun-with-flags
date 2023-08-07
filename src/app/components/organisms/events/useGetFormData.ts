import { useEffect, useState } from 'react'

export const useGetFormData = () => {
  const currentTime = new Date().toTimeString().slice(0, 5)
  const currentDate = new Date().toISOString().slice(0, 10)

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
      const localFormData = localStorage.getItem('formData')
      if (localFormData) {
        const formData = JSON.parse(localFormData)
        setFormData(formData)
      }
    }
    getInitialFormData()
  }, [])

  useEffect(() => {
    const saveFormData = () => {
      localStorage.setItem('formData', JSON.stringify(formData))
    }
    saveFormData()
  }, [formData])

  return {
    formData,
    setFormData,
  }
}
