import styles from './TitleOnPage.module.css'

const TitleOnPage = ({ children }: { children: string }) => {
  return (
    <>
      <h1 className={styles['title']}>{children}</h1>
    </>
  )
}

export default TitleOnPage
