import { useState, useEffect } from 'react'

import { FlagCountry } from '@/helpers/flags.types'
import { getAllTimeZones } from '@/services/timezones'
import { Locale } from '@/types/locale.types'

const useFetch = ({ locale, date }: { locale?: Locale; date?: Date }) => {
  const [data, setData] = useState<FlagCountry[] | null>(null)
  const [error, setError] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    setError(false)
    setLoading(true)

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

      .finally(() => setLoading(false))

    return () => controller.abort()
  }, [locale, date])

  return { data, loading, error }
}

export default useFetch
