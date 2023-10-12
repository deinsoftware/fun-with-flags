import Image from 'next/image'
import { useTranslations } from 'next-intl'

import Link from 'next/link'

import styles from './Header.module.css'

import Actions from './Actions'

import LoginButton from '@/components/atoms/auth/LoginButton'

const Header = () => {
  const t = useTranslations('Index')

  return (
    <>
      <header className={styles['header']}>
        <h1 className={styles['title']}>{t('title')}</h1>
        <Link className={styles['link']} href="/">
          <Image
            alt="Logo"
            className={styles['logo']}
            height={60}
            src="/img/logo.png"
            width={200}
          />
        </Link>
        <div className={styles['container-actions']}>
          <Actions />
        </div>
        <LoginButton />
      </header>
    </>
  )
}

export default Header
