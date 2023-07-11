import Image from 'next/image'
import styles from './CardPost.module.css'

const CardPost = () => {
  return (
    <>
      <article className={styles['card-container']}>
        <Image
          className={styles['imagen-card']}
          src="/img/placeholderlogo.png"
          width={200}
          height={60}
          alt="Post image"
        />
        <div className={styles['container-information']}>
          <header>
            <h3 className={styles['title-card']}>{'¿Qué es una zona horaria?'}</h3>
          </header>
          <p className={styles['text-card']}>
            Es conveniente que las áreas en estrecha comunicación comercial o de
            otra índole se mantengan al mismo tiempo, por lo que las zonas
            horarias...
          </p>
          <footer className={styles['footer-card']}>
            <span className={styles['date-card']}>Abr 27, 2054</span>
            <button className={styles['open-post-button']}>{'Open ->'}</button>
          </footer>
        </div>
      </article>
    </>
  )
}

export default CardPost
