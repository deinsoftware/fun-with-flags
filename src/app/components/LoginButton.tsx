import Image from 'next/image'
import Link from 'next/link'
import styles from './LoginButton.module.css'

const LoginButton = () => {
  return (
    <>
      <Link href="login" className={styles.loginButton}>
        <div className={styles.bgIcon}>
          <Image
            className={styles.icon}
            src="/img/btnLogin.png"
            width={32}
            height={32}
            alt="Login button"
          />
        </div>
      </Link>
    </>
  )
}

export default LoginButton
