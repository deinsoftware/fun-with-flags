import { useEffect, useState } from 'react'

import { DateArray } from '@/types/DateArray.types'

export const useGetNextAndPrevDay = (
  filteredDates: DateArray[],
  currentDate: Date,
) => {
  const [isNextDate, setIsNextDate] = useState<boolean>(false)
  const [isPrevDate, setIsPrevDate] = useState<boolean>(false)

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
      setIsNextDate(validationNextDay)
      setIsPrevDate(validationPrevDay)
    }
    thereIsNextOrPrevDate(filteredDates, currentDate)
  }, [filteredDates, currentDate])

  return { isNextDate, isPrevDate }
}
