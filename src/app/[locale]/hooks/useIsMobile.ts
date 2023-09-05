import { useEffect, useState } from 'react'

export const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkWindowSize = () => {
      if (window.innerWidth <= 768) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    checkWindowSize()
    window.addEventListener('resize', checkWindowSize)

    return () => {
      window.removeEventListener('resize', checkWindowSize)
    }
  }, [])

  return isMobile
}
