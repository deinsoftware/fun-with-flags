'use client'

import Link from 'next/link'
import Image from 'next/image'


import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import styles from './page.module.css'

const LoginPage = () => {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') ?? '/'

  return (
    <>
      <div className={styles['login-container']}>
        <div className="">
          <span className={styles['paragraph']}>
            {`Use your email or another service to continue with FwF (it's free)!`}
          </span>
        </div>

        <div className={styles['providers-button']}>
          <button
            className={`${styles['provider']} ${styles['google-provider']}`}
            onClick={() => signIn('google', { callbackUrl })}
          >
            <Image
              alt="Login with Google"
              className={styles['image-provider']}
              height={32}
              src="/img/auth/google.svg"
              width={32}
            />
            <span className={styles['name-provider']}>
              Continue with Google
            </span>
          </button>
        </div>

        <div className="">
          <span className={styles['helper-text']}>
            {`By continuing, you agree to FwF's`}{' '}
            <Link className={styles['helper-text-link']} href="#">
              Terms of Use.
            </Link>{' '}
            Read our{' '}
            <Link className={styles['helper-text-link']} href="#">
              Privacy Policy.
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default LoginPage
