import { useState, useEffect } from 'react'

import { FlagCountry } from '@/helpers/flags.types'
import { getAllTimeZones } from '@/services/timezones'
import { Locale } from '@/types/locale.types'

type Props = { locale?: Locale; date?: Date }

const useFetch = ({ locale, date }: Props) => {
  const [data, setData] = useState<FlagCountry[] | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    setError(false)

    getAllTimeZones({ locale, date, signal })
      .then((data) => {
        if (data !== null) {
          setData(data)
        } else {
          setError(true)
        }
      })
      .catch((error) => {
        console.error('error', error)
        setError(true)
      })

    return () => controller.abort()
  }, [locale, date])

  return { data, error }
}

export default useFetch
