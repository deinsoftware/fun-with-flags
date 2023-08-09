import Image from 'next/image'

import styles from './CardPost.module.css'

const CardPost: React.FC<{
  srcImage: string
  title: string
  text: string
  date: string
}> = ({ srcImage, title, text, date }) => {
  return (
    <>
      <article className={styles['card-container']}>
        <Image
          alt="Post image"
          className={styles['image-card']}
          height={60}
          src={srcImage}
          width={200}
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
