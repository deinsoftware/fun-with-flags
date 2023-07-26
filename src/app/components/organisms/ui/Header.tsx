import Image from 'next/image'
import styles from './Header.module.css'
import LoginButton from '@/app/components/atoms/auth/LoginButton'

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <h1>Fun with flags</h1> {/* display: none?????? //! preguntar */}
        <Image
          src="/img/placeholderlogo.png"
          width={200}
          height={60}
          alt="Logo"
        />
        <LoginButton />
      </header>
    </>
  )
}

export default Header
