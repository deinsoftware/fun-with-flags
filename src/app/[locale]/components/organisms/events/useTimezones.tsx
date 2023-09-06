import { useState, useEffect } from 'react'

import { FlagCountry } from '@/helpers/flags.types'
import { getAllTimeZones } from '@/services/timezones'
import { Locale } from '@/types/locale.types'

type Props = {
  locale?: Locale
  date?: Date
}

const useTimezones = ({ locale, date }: Props) => {
  const controller = new AbortController()
  const signal = controller.signal

  const [timezoneList, setTimezoneList] = useState<FlagCountry[] | null>(null)
  const [timezoneError, setTimezoneError] = useState(false)

  const getTimeZones = ({ locale, date }: Props) => {
    getAllTimeZones({ locale, date, signal })
      .then((data) => {
        if (data !== null) {
          setTimezoneList(data)
        }
        setTimezoneError(data === null)
      })
      .catch((error) => {
        console.error('error', error)
        setTimezoneError(true)
      })
  }

  useEffect(() => {
    setTimezoneError(false)
    getTimeZones({ locale, date })

    return () => controller.abort()
  }, [locale, date])

  return { timezoneList, timezoneError, getTimeZones }
}

export default useTimezones
