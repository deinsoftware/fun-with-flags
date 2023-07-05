import Image from 'next/image'
import styles from './Header.module.css'

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
        <div className={styles.themeToggler}>
          <div className={styles.toggler} />
        </div>
      </header>
    </>
  )
}

export default Header
