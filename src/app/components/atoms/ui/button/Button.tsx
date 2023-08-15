import Image from 'next/image'

import styles from './Button.module.css'

const sizeAvatar = {
  height: 32,
  width: 32,
}
export const Button = ({
  handleClick,
  avatar,
  disabled,
  color,
  children,
}: {
  handleClick: Function
  avatar?: {
    alt: string
    img?: string | null
  }
  disabled?: boolean
  color?: `--${string}-${string}-${string}`
  children: React.ReactNode
}) => {
  return (
    <button
      className={styles['button']}
      disabled={disabled}
      style={{ backgroundColor: color ? `var(${color})` : 'defaultColor' }}
      onClick={(event) => {
        event.preventDefault()
        handleClick(event)
      }}
    >
      {avatar && (
        <Image
          alt={avatar.alt}
          className={styles['avatar']}
          height={sizeAvatar.height}
          src={avatar.img ?? '/img/auth/avatar.png'}
          width={sizeAvatar.width}
        />
      )}
      <span className={styles.text}>{children}</span>
    </button>
  )
}
