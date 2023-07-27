import Image from 'next/image'

import styles from './Header.module.css'

import LoginButton from '@/app/components/atoms/auth/LoginButton'

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Fun with flags</h1> {/* display: none?????? //! preguntar */}
        <Image alt="Logo" height={60} src="/img/logo.png" width={200} />
        <LoginButton />
      </header>
    </>
  )
}

export default Header
