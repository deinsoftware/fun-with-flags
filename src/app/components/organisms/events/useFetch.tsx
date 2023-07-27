import { useState, useEffect } from 'react'

import { FlagCountry } from '@/helpers/flags.types'
import { getAllTimeZones } from '@/services/timezones'
import { Locale } from '@/types/locale.types'

import { controller, signal } from '@/libs/abort'

const useFetch = ({ locale, date }: { locale?: Locale; date?: Date }) => {
  const [data, setData] = useState<FlagCountry[] | null>(null)

  useEffect(() => {
    getAllTimeZones({ locale, date, signal })
      .then((data) => {
        if (data !== null) {
          setData(data)
        }
      })
      .catch((error) => console.error('error', error))

    return () => controller.abort()
  }, [locale, date])

  return data
}

export default useFetch
