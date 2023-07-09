import Link from 'next/link'
import Image from 'next/image'
import styles from './page.module.css'

const LoginPage = () => {
  return (
    <>
      <div className={styles.loginContainer}>
        <div className="">
          <span className={styles.paragraph}>
            Use your email or another service to continue with FwF (it's free)!
          </span>
        </div>

        <div className={styles.providersButton}>
          <button className={`${styles.provider} ${styles.googleProvider}`}>
            <Image
              className={styles.imageProvider}
              src="/img/btnGoogle.png"
              alt="Login with Google"
              width={32}
              height={32}
            />
            <span className={styles.nameProvider}>Continue with Google</span>
          </button>
        </div>

        <div className="">
          <span className={styles.helperText}>
            By continuing, you agree to FwF’s{' '}
            <Link href="#" className={styles.helperTextLink}>
              Terms of Use.
            </Link>{' '}
            Read our{' '}
            <Link href="#" className={styles.helperTextLink}>
              Privacy Policy.
            </Link>
          </span>
        </div>
      </div>
    </>
  )
}

export default LoginPage
