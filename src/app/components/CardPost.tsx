import Image from 'next/image'
import styles from './CardPost.module.css'

// TODO:
// ! Por ahora funciona, pero hay un error con el typado de typescrit
const CardPost = ({ srcImage, title, text, date }) => {
  return (
    <>
      <article className={styles.cardContainer}>
        <Image
          className={styles.imagenCard}
          src={srcImage}
          width={200}
          height={60}
          alt="Post image"
        />
        <div className={styles.containerInformation}>
          <header>
            <h3 className={styles.titleCard}>{title}</h3>
          </header>
          <p className={styles.textCard}>{text}</p>
          <footer className={styles.footerCard}>
            <span className={styles.dateCard}>{date}</span>
            <button className={styles.openPostButton}>{'Open ->'}</button>
          </footer>
        </div>
      </article>
    </>
  )
}

export default CardPost
