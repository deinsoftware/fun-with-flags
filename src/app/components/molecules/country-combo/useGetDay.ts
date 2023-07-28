import { useEffect, useState } from 'react'

import { DateArray } from '@/types/DateArray.types'

export const useGetDay = (filteredDates: DateArray[], currentDate: Date) => {
  const [isNextDate, setIsNextDate] = useState<boolean>(false)
  const [isPrevDate, setIsPrevDate] = useState<boolean>(false)
  const [isToday, setIsToday] = useState<boolean>(false)

  useEffect(() => {
    const thereIsNextOrPrevDate = (
      datesArray: DateArray[],
      currentDate: Date,
    ) => {
      const validationNextDay = datesArray.some(([, groupedDate]) => {
        const date = new Date(groupedDate.date)
        const isNextDate = date.getDate() === currentDate.getDate() + 1
        return isNextDate
      })
      const validationPrevDay = datesArray.some(([, groupedDate]) => {
        const date = new Date(groupedDate.date)
        const isPrevDate = date.getDate() === currentDate.getDate() - 1
        return isPrevDate
      })
      const validationToday = datesArray.some(([, groupedDate]) => {
        const date = new Date(groupedDate.date)
        const isToday = date.getDate() === currentDate.getDate()
        return isToday
      })
      setIsNextDate(validationNextDay)
      setIsPrevDate(validationPrevDay)
      setIsToday(validationToday)
    }
    thereIsNextOrPrevDate(filteredDates, currentDate)
  }, [filteredDates, currentDate])

  return { isNextDate, isPrevDate, isToday }
}
