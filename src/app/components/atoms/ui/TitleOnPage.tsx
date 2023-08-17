import styles from './TitleOnPage.module.css'

type Props = { children: string }

const TitleOnPage = ({ children }: Props) => {
  return (
    <>
      <h1 className={styles['title']}>{children}</h1>
    </>
  )
}

export default TitleOnPage
