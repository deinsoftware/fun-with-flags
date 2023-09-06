import Image from 'next/image'

import { useTranslations } from 'next-intl'

import styles from './HeaderMobile.module.css'

import LoginButton from '@/components/atoms/auth/LoginButton'

const HeaderMobile = () => {
  const t = useTranslations('Index')

  return (
    <>
      <header className={styles['header']}>
        <h1 className={styles['title']}>{t('title')}</h1>
        <Image alt="Logo" height={60} src="/img/logo.png" width={200} />
        <LoginButton />
      </header>
    </>
  )
}

export default HeaderMobile
