import { FormData } from '@/app/components/organisms/events/CreateEvent.types'
import { addYearsToDate, daysBetweenDates } from '@/helpers/dates'

export const cleanDataStorage = () => {
  localStorage.removeItem('form-data')
  localStorage.removeItem('time-zones')
}

export const getDataStorage = (): FormData | null => {
  const cacheVersion = process?.env?.NEXT_PUBLIC_CACHE_VERSION ?? ''
  const cacheSessionInDays =
    process?.env?.NEXT_PUBLIC_CACHE_SESSION_IN_DAYS ?? ''

  const json = localStorage.getItem('form-data')
  if (!json) return null

  const formData = JSON.parse(json)
  if (!('signature' in formData)) return null

  const { version, date } = formData.signature || {}

  if (!version || version !== cacheVersion) return null

  if (!date) return null

  const amountDays = daysBetweenDates(new Date(date), new Date())
  const maxDays = parseInt(cacheSessionInDays, 10)
  if (Math.abs(amountDays) > maxDays) return null

  return formData
}

export const setDataStorage = (formData: FormData) => {
  const cacheVersion = process?.env?.NEXT_PUBLIC_CACHE_VERSION ?? ''

  const signedFormData = {
    ...formData,
    signature: {
      version: cacheVersion,
      date: new Date().toISOString(),
    },
  }

  localStorage.setItem('form-data', JSON.stringify(signedFormData))
}
