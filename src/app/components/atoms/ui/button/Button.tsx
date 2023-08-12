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
  children,
}: {
  handleClick: Function
  avatar?: {
    alt: string
    img?: string | null
  }
  disabled?: boolean
  children: React.JSX.Element | string
}) => {
  return (
    <button
      className={styles['button']}
      disabled={disabled}
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
