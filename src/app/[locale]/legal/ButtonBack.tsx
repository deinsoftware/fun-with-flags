'use client'

import { useRouter } from 'next/navigation'

import { MoveLeft } from 'lucide-react'

import { useTranslations } from 'next-intl'

import Button from '@/components/atoms/ui/Button'
import { lucidIconsButton } from '@/libs/icon-config'

const ButtonBack = () => {
  const t = useTranslations('Globals.Buttons')
  const text = t('Back')

  const router = useRouter()

  const handleClick = () => {
    router.back()
  }

  return (
    <>
      <Button handleClick={handleClick} text={text}>
        <MoveLeft
          color={lucidIconsButton.color.white}
          size={lucidIconsButton.size}
          strokeWidth={lucidIconsButton.strokeWidth}
        />
      </Button>
    </>
  )
}

export default ButtonBack
