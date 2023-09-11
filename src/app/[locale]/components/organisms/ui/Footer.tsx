import styles from './Footer.module.css'
import Actions from './Actions'

const Footer = () => {
  return (
    <>
      <div className={styles['footer-pusher']} />

      <footer className={styles['footer']}>
        <Actions />
      </footer>
    </>
  )
}

export default Footer
