'use client'

import Link from 'next/link'
import Image from 'next/image'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import { useTranslations } from 'next-intl'

import styles from './page.module.css'

const LoginPage = () => {
  const t = useTranslations('Login')

  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') ?? '/'

  return (
    <>
      <div className={styles['login-container']}>
        <div className="">
          <span className={styles['paragraph']}>{`${t('instructions')}.`}</span>
        </div>

        <div className={styles['providers-button']}>
          <button
            className={`${styles['provider']} ${styles['google-provider']}`}
            onClick={() => signIn('google', { callbackUrl })}
          >
            <Image
              alt={t('Providers.Google.altImg')}
              className={styles['image-provider']}
              height={32}
              src="/img/auth/google.svg"
              width={32}
            />
            <span className={styles['name-provider']}>
              {t('Providers.Google.text')}
            </span>
          </button>
        </div>

        <div className="">
          <span className={styles['helper-text']}>
            {t('HelperText.TermsOfUse.text')}{' '}
            <Link className={styles['helper-text-link']} href="#">
              {t('HelperText.TermsOfUse.link')}{' '}
            </Link>
            {t('HelperText.PrivacyPolicy.text')}{' '}
            <Link className={styles['helper-text-link']} href="#">
              {t('HelperText.PrivacyPolicy.link')}
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default LoginPage
