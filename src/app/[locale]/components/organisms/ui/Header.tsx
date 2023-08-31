import Image from 'next/image'
import {useTranslations} from 'next-intl';

import styles from './Header.module.css'

import LoginButton from '@/app/[locale]/components/atoms/auth/LoginButton'

const Header = () => {
  const t = useTranslations('Index');

  return (
    <>
      <header className={styles.header}>
        <h1>{t('title')}</h1>
        <Image alt="Logo" height={60} src="/img/logo.png" width={200} />
        <LoginButton />
      </header>
    </>
  )
}

export default Header
