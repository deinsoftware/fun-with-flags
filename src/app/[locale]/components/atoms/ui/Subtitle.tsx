import styles from './Subtitle.module.css'

type Props = { children: string }

const Subtitle = ({ children }: Props) => {
  return <h2 className={styles['subtitle']}>{children}</h2>
}

export default Subtitle
