import styles from './Title.module.css'

type Props = { children: string }

const Title = ({ children }: Props) => {
  return <h1 className={styles['title']}>{children}</h1>
}

export default Title
