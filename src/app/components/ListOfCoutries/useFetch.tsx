import { FlagCountry } from '@/helpers/flags.types'
import { getAllTimeZones } from '@/services/timezones'
import { Locale } from '@/types/locale.types'
import { useState, useEffect } from 'react'

const useFetch = ({ locale, date }: { locale?: Locale; date?: Date }) => {
  const [data, setData] = useState<FlagCountry[] | null>(null)

  useEffect(() => {
    getAllTimeZones({ locale, date })
      .then((data) => {
        if (data !== null) {
          setData(data)
        }
      })
      .catch((error) => console.error('error', error))
  }, [locale, date])

  return data
}

export default useFetch
