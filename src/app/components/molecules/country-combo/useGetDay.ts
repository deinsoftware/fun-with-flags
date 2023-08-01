import { useEffect, useState } from 'react'

import { DateArray } from '@/types/DateArray.types'

export const useGetDay = (filteredDates: DateArray[]) => {
  const [isNextDate, setIsNextDate] = useState<boolean>(false)
  const [isPrevDate, setIsPrevDate] = useState<boolean>(false)
  const [isToday, setIsToday] = useState<boolean>(false)

  useEffect(() => {
    const thereIsNextOrPrevDate = (datesArray: DateArray[]) => {
      const validationNextDay = datesArray.some(([, groupedDate]) => {
        const day = groupedDate.day
        const isNextDate = day === 'next'
        return isNextDate
      })
      const validationPrevDay = datesArray.some(([, groupedDate]) => {
        const day = groupedDate.day
        const isPrevDate = day === 'prev'
        return isPrevDate
      })
      const validationToday = datesArray.some(([, groupedDate]) => {
        const day = groupedDate.day
        const isToday = day === 'same'
        return isToday
      })

      setIsNextDate(validationNextDay)
      setIsPrevDate(validationPrevDay)
      setIsToday(validationToday)
    }
    thereIsNextOrPrevDate(filteredDates)
  }, [filteredDates])

  return { isNextDate, isPrevDate, isToday }
}
