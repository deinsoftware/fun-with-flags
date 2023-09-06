'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Session, DefaultSession } from 'next-auth'

import { useTranslations } from 'next-intl'

import Button from '@/components/atoms/ui/Button'

const LoginButton = () => {
  const t = useTranslations('Header.Button.Log')

  const session = useSession()
  const data = session.data as Session | DefaultSession

  if (!data) {
    return <Button handleClick={() => signIn()}>{t('signIn')}</Button>
  }

  return (
    <Button
      avatar={{
        alt: data?.user?.name ?? 'User avatar',
        img: data?.user?.image,
      }}
      handleClick={() => signOut()}
    >
      {t('signOut')}
    </Button>
  )
}

export default LoginButton
