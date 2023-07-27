'use client'
import Image from 'next/image'


import { useSession, signIn, signOut } from 'next-auth/react'
import { Session, DefaultSession } from 'next-auth'

import styles from './LoginButton.module.css'

const LoginButton = () => {
  const session = useSession()
  const data = session.data as Session | DefaultSession

  if (!data) {
    return (
      <>
        <button className={styles['login-button']} onClick={() => signIn()}>
          <div className={styles['bg-icon']}>
            <span className={styles.text}>Sign Up</span>
          </div>
        </button>
      </>
    )
  }

  return (
    <>
      <button className={styles['login-button']} onClick={() => signOut()}>
        <Image
          alt={data?.user?.name ?? 'Login button'}
          className={styles['bg-icon']}
          height={32}
          src={data?.user?.image ?? '/img/auth/login.png'}
          width={32}
        />
        <div className={styles['bg-icon']}>
          <span className={styles.text}>Sign Out</span>
        </div>
      </button>
    </>
  )
}

export default LoginButton
