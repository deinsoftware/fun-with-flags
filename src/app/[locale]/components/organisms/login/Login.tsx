'use client'

import Link from 'next/link'
import Image from 'next/image'

import { signIn } from 'next-auth/react'
import { useSearchParams } from 'next/navigation'

import { useTranslations } from 'next-intl'

import { useEffect, useState } from 'react'

import { getCookieConsentValue } from 'react-cookie-consent'

import styles from './Login.module.css'

import Button from '@/components/atoms/ui/Button'

const Login = () => {
  const t = useTranslations('Login')

  const searchParams = useSearchParams()
  const callbackUrl = searchParams?.get('callbackUrl') ?? '/'

  const [consentGranted, setConsentGranted] = useState(false)

  useEffect(() => {
    const cookieValue = getCookieConsentValue('cookie-consent')
    if (cookieValue === 'true') {
      setConsentGranted(true)
    }
  }, [])

  return (
    <>
      <div className={styles['login-container']}>
        <div className="">
          <span className={styles['paragraph']}>{`${t('instructions')}.`}</span>
        </div>
        <div className={styles['providers-button']}>
          <Button
            className={'button-provider'}
            color={'--color-btn-google'}
            disabled={!consentGranted}
            handleClick={() => signIn('google', { callbackUrl })}
            text={t('Providers.Google.text')}
            textHover={t('Providers.Google.hover')}
          >
            <Image
              alt={t('Providers.Google.altImg')}
              className={styles['image-provider']}
              height={32}
              src="/img/auth/google.svg"
              width={32}
            />
          </Button>
        </div>
        <div className="">
          <span className={styles['helper-text']}>
            {t('HelperText.TermsOfUse.text')}{' '}
            <Link className={styles['helper-text-link']} href="/legal">
              {t('HelperText.TermsOfUse.link')}{' '}
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default Login
