import Image from 'next/image'
import styles from './CardPost.module.css'

const CardPost = () => {
  return (
    <>
      <article className={styles.cardContainer}>
        <Image
          className={styles.imagenCard}
          src="/img/placeholderlogo.png"
          width={200}
          height={60}
          alt="Post image"
        />
        <div className={styles.containerInformation}>
          <header>
            <h3 className={styles.titleCard}>{'¿Qué es una zona horaria?'}</h3>
          </header>
          <p className={styles.textCard}>
            Es conveniente que las áreas en estrecha comunicación comercial o de
            otra índole se mantengan al mismo tiempo, por lo que las zonas
            horarias...
          </p>
          <footer className={styles.footerCard}>
            <span className={styles.dateCard}>Abr 27, 2054</span>
            <button className={styles.openPostButton}>{'Open ->'}</button>
          </footer>
        </div>
      </article>
    </>
  )
}

export default CardPost
