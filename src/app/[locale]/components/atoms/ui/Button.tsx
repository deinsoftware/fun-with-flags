import styles from './Button.module.css'

type Props = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  color?: `--${string}-${string}-${string}`
  textHover?: string
  text?: string
  children?: React.ReactNode
}

const Button = ({
  handleClick,
  disabled,
  color,
  textHover,
  text,
  children,
}: Props) => {
  return (
    <div className={styles['container']}>
      {textHover && disabled && (
        <div className={styles['before']}> {textHover} </div>
      )}
      <button
        className={styles['button']}
        disabled={disabled}
        style={{ backgroundColor: color ? `var(${color})` : 'defaultColor' }}
        type="button"
        onClick={(event) => {
          event.preventDefault()
          handleClick(event)
        }}
      >
        {children}
        {text && <span className={styles.text}>{text}</span>}
      </button>
    </div>
  )
}

export default Button
