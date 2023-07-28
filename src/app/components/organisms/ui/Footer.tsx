import Link from 'next/link'
import Image from 'next/image'

import styles from './Footer.module.css'

const Footer = () => {
  const imageWidth = 25
  return (
    <>
      <div className={styles['footer-pusher']} />

      <footer className={styles.footer}>
        <div className={styles['btn-container']}>
          <Link className="" href="/">
          <div className={styles['container-icon']}>
              <Image
                alt="Home"
                className={styles['icon']}
                height={imageWidth}
                src="/img/menu/home.svg"
                width={imageWidth}
              />
            </div>
          </Link>

          <Link className="" href="/events">
          <div className={styles['container-icon']}>
              <Image
                alt="Events"
                className={styles['icon']}
                height={imageWidth}
                src="/img/menu/event.svg"
                width={imageWidth}
              />
            </div>
          </Link>

          <Link className="" href="/events/create">
          <div className={styles['container-icon']}>
              <Image
                alt="Create event"
                className={styles['icon']}
                height={imageWidth}
                src="/img/menu/create-event.svg"
                width={imageWidth}
              />
            </div>
          </Link>

          <Link className="" href="/settings">
            <div className={styles['container-icon']}>
              <Image
                alt="Settings"
                className={styles['icon']}
                height={imageWidth}
                src="/img/menu/settings.svg"
                width={imageWidth}
              />
            </div>
          </Link>
        </div>
      </footer>
    </>
  )
}

export default Footer
