import Image from 'next/image'

import styles from './Loading.module.css'

const Loading = () => {
  return (
    <>
      <section className={styles['container-loader']}>
        <Image
          alt="Loading"
          height={100}
          src="/img/ui/loader.svg"
          width={100}
        />
      </section>
    </>
  )
}

export default Loading
