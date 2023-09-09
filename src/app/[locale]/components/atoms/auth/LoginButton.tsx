'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Session, DefaultSession } from 'next-auth'

import { useTranslations } from 'next-intl'

import Image from 'next/image'

import Button from '@/components/atoms/ui/Button'
import { sizeAvatar } from '@/libs/constants'

const LoginButton = () => {
  const t = useTranslations('Header.Button.Log')

  const session = useSession()
  const data = session.data as Session | DefaultSession

  if (!data) {
    return <Button handleClick={() => signIn()} text={t('signIn')} />
  }

  return (
    <Button handleClick={() => signOut()} text={t('signOut')}>
      <Image
        alt={data?.user?.name ?? 'User avatar'}
        height={sizeAvatar.height}
        src={data?.user?.image ?? ''}
        style={{ borderRadius: '50%', overflow: 'hidden' }}
        width={sizeAvatar.width}
      />
    </Button>
  )
}

export default LoginButton
