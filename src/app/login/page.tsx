import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

const LoginPage = () => {
  return (
    <>
      <div className={styles.loginContainer}>
        <div className={styles.text}>
          <span>
            Use your email or another service to continue with FwF (it's free)!
          </span>
        </div>

        <div className={styles.providersButton}>
          <button>
            <Image
              className=""
              src="/img/btnGoogle.png"
              alt="Login with Google"
              width={32}
              height={32}
            />
            <span>Continue with Google</span>
          </button>
        </div>

        <div className={styles.helperText}>
          <span>
            By continuing, you agree to FwF’s{' '}
            <Link href="#">Terms of Use.</Link> Read our{' '}
            <Link href="#">Privacy Policy.</Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default LoginPage
