'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Session, DefaultSession } from 'next-auth'

import { useTranslations } from 'next-intl'

import Image from 'next/image'

import {
  getCookieConsentValue,
  resetCookieConsentValue,
} from 'react-cookie-consent'

import { useEffect, useState } from 'react'

import Button from '@/components/atoms/ui/Button'
import { sizeAvatar } from '@/libs/constants'

const LoginButton = () => {
  const t = useTranslations('Header.Button.Log')

  const session = useSession()
  const data = session.data as Session | DefaultSession

  const handleClick = () => {
    const cookieValue = getCookieConsentValue('cookie-consent')

    if (cookieValue === 'false') {
      resetCookieConsentValue('cookie-consent')
      signIn()
      return
    }

    if (cookieValue === 'true') {
      signIn()
      return
    }
  }

  if (!data) return <Button handleClick={handleClick} text={t('signIn')} />

  return (
    <Button handleClick={() => signOut()} text={t('signOut')}>
      <Image
        alt={data?.user?.name ?? 'User avatar'}
        height={sizeAvatar.height}
        src={data?.user?.image ?? ''}
        style={{ borderRadius: '50%' }}
        width={sizeAvatar.width}
      />
    </Button>
  )
}

export default LoginButton
