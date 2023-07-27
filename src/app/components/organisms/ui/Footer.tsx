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
            <div className="">
              <Image
                alt="Home"
                className=""
                height={imageWidth}
                src="/img/menu/home.png"
                width={imageWidth}
              />
            </div>
          </Link>

          <Link className="" href="/events">
            <div className="">
              <Image
                alt="Events"
                className=""
                height={imageWidth}
                src="/img/menu/events.png"
                width={imageWidth}
              />
            </div>
          </Link>

          <Link className="" href="/events/create">
            <div className="">
              <Image
                alt="Create event"
                className=""
                height={imageWidth}
                src="/img/menu/create-event.png"
                width={imageWidth}
              />
            </div>
          </Link>

          <Link className="" href="/settings">
            <div className="">
              <Image
                alt="Settings"
                className=""
                height={imageWidth}
                src="/img/menu/menu.png"
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
