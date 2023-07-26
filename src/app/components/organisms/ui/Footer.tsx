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
          <Link href="/" className="">
            <div className="">
              <Image
                className=""
                src="/img/home.png"
                width={imageWidth}
                height={imageWidth}
                alt="Home"
              />
            </div>
          </Link>

          <Link href="events" className="">
            <div className="">
              <Image
                className=""
                src="/img/events.png"
                width={imageWidth}
                height={imageWidth}
                alt="Events"
              />
            </div>
          </Link>

          <Link href="create-event" className="">
            <div className="">
              <Image
                className=""
                src="/img/createEvent.png"
                width={imageWidth}
                height={imageWidth}
                alt="Create event"
              />
            </div>
          </Link>

          <Link href="settings" className="">
            <div className="">
              <Image
                className=""
                src="/img/menu.png"
                width={imageWidth}
                height={imageWidth}
                alt="Settings"
              />
            </div>
          </Link>
        </div>
      </footer>
    </>
  )
}

export default Footer
