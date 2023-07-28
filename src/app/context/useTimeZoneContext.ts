import { useContext } from 'react'

import { TimeZoneContext } from './timeZoneContext'

export const useTimeZoneContext = () => {
  const context = useContext(TimeZoneContext)
  if (context === undefined) {
    throw new Error('useTimeZoneContext must be used within a TimeZoneProvider')
  }
  return context
}
