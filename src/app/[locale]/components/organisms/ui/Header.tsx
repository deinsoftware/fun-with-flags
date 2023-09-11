import Image from 'next/image'
import { useTranslations } from 'next-intl'

import styles from './Header.module.css'

import Actions from './Actions'

import LoginButton from '@/components/atoms/auth/LoginButton'

const Header = () => {
  const t = useTranslations('Index')

  return (
    <>
      <header className={styles['header']}>
        <h1 className={styles['title']}>{t('title')}</h1>
        <Image alt="Logo" height={60} src="/img/logo.png" width={200} />
        <div className={styles['container-actions']}>
          <Actions />
        </div>
        <LoginButton />
      </header>
    </>
  )
}

export default Header
