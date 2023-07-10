import Link from 'next/link'
import Image from 'next/image'
import styles from './FooterTwo.module.css'

const FooterTwo = () => {
  return (
    <>
      <footer className={styles.footer}>
        <div className={styles.btnContainer}>
          <Link href="home" className="">
            <div className="">
              <Image
                className=""
                src="/img/home.png"
                width={28}
                height={28}
                alt="Home"
              />
            </div>
          </Link>

          <Link href="events" className="">
            <div className="">
              <Image
                className=""
                src="/img/events.png"
                width={28}
                height={28}
                alt="Events"
              />
            </div>
          </Link>

          <Link href="create-event" className="">
            <div className="">
              <Image
                className=""
                src="/img/createEvent.png"
                width={28}
                height={28}
                alt="Create event"
              />
            </div>
          </Link>

          <Link href="" className="">
            <div className="">
              <Image
                className=""
                src="/img/menu.png"
                width={28}
                height={28}
                alt="Menu"
              />
            </div>
          </Link>
        </div>
      </footer>
    </>
  )
}

export default FooterTwo
