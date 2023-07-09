import Image from 'next/image'
import Link from 'next/link'
import styles from './LoginButton.module.css'

const LoginButton = () => {
  return (
    <>
      <Link href="login" className={styles.loginButton}>
        <div className={styles.bgIcon}>
          <span className={styles.text}>Sign Up</span>
        </div>
      </Link>
    </>
  )
}

export default LoginButton
