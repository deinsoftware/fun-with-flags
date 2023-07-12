import Image from 'next/image'
import styles from './CardPost.module.css'

// TODO:
// ! Por ahora funciona, pero hay un error con el typado de typescrit
const CardPost = ({ srcImage, title, text, date }) => {
  return (
    <>
      <article className={styles['card-container']}>
        <Image
          className={styles['imagen-card']}
          src={srcImage}
          width={200}
          height={60}
          alt="Post image"
        />
        <div className={styles['container-information']}>
          <header>
            <h3 className={styles['title-card']}>{title}</h3>
          </header>
          <p className={styles['text-card']}>{text}</p>
          <footer className={styles['footer-card']}>
            <span className={styles['date-card']}>{date}</span>
            <button className={styles['open-post-button']}>{'Open ->'}</button>
          </footer>
        </div>
      </article>
    </>
  )
}

export default CardPost
