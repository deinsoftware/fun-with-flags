import { useEffect, useState } from 'react'

export const useGetFormData = () => {
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
