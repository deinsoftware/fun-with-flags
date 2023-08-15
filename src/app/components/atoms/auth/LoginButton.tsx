'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Session, DefaultSession } from 'next-auth'

import { Button } from '../ui/button/Button'

const LoginButton = () => {
  const session = useSession()
  const data = session.data as Session | DefaultSession

  if (!data) {
    return <Button handleClick={() => signIn()}>Sign In</Button>
  }

  return (
    <Button
      avatar={{
        alt: data?.user?.name ?? 'User avatar',
        img: data?.user?.image,
      }}
      handleClick={() => signOut()}
    >
      Sign Out
    </Button>
  )
}

export default LoginButton
