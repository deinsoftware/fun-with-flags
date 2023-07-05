import Link from 'next/link'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.btnContainer}>
          {/* use "passHref"? (https://nextjs.org/docs/messages/link-passhref) */}

          <Link href="/home" className={styles.btn} passHref>
            <span className="material-symbols-outlined">arrow_back_ios</span>
          </Link>
          <Link href="/create-event" className={styles.btn} passHref>
            <span className="material-symbols-outlined">add</span>
          </Link>
          <Link href="" className={styles.btn} passHref>
            <span className="material-symbols-outlined">arrow_forward_ios</span>
          </Link>
        </div>
      </footer>
    </>
  )
}

export default Footer
