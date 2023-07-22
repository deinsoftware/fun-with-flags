'use client'
import Image from 'next/image'
import styles from './LoginButton.module.css'

import { useSession, signIn, signOut } from 'next-auth/react'
import { Session, DefaultSession } from 'next-auth'

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
      <pre>{JSON.stringify(data, null, 4)}</pre>
      <button className={styles['login-button']} onClick={() => signOut()}>
        <Image
          className={styles['bg-icon']}
          src={data?.user?.image ?? '/img/auth/login.png'}
          width={32}
          height={32}
          alt={data?.user?.name ?? 'Login button'}
        />
        <div className={styles['bg-icon']}>
          <span className={styles.text}>Sign Out</span>
        </div>
      </button>
    </>
  )
}

export default LoginButton
