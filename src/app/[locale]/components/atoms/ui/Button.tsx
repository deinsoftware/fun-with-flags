import Image from 'next/image'

import { Copy } from 'lucide-react'

import styles from './Button.module.css'

const sizeAvatar = {
  height: 28,
  width: 28,
}

type Props = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  avatar?: {
    alt: string
    img?: string | null
  }
  disabled?: boolean
  color?: `--${string}-${string}-${string}`
  copyToClipboardIcon?: boolean
  children: React.ReactNode
}

const Button = ({
  handleClick,
  avatar,
  disabled,
  color,
  copyToClipboardIcon,
  children,
}: Props) => {
  return (
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
      {avatar && (
        <Image
          alt={avatar.alt}
          className={styles['avatar']}
          height={sizeAvatar.height}
          src={avatar.img ?? '/img/auth/avatar.png'}
          width={sizeAvatar.width}
        />
      )}
      {copyToClipboardIcon && <Copy />}

      <span className={styles.text}>{children}</span>
    </button>
  )
}

export default Button
