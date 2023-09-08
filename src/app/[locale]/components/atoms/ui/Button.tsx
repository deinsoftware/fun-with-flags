import Image from 'next/image'

import { Save, Twitter, Copy } from 'lucide-react'

import styles from './Button.module.css'

import { lucidIconsButton } from '@/libs/icon-config'
import { sizeAvatar } from '@/libs/constants'

type Props = {
  handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  avatar?: {
    alt: string
    img?: string | null
  }
  disabled?: boolean
  color?: `--${string}-${string}-${string}`
  textHover?: string
  saveIcon?: boolean
  shareTwitterIcon?: boolean
  copyToClipboardIcon?: boolean
  children: React.ReactNode
}

const Button = ({
  handleClick,
  avatar,
  disabled,
  color,
  saveIcon,
  shareTwitterIcon,
  copyToClipboardIcon,
  textHover,
  children,
}: Props) => {
  return (
    <button
      className={styles['button']}
      data-hover={textHover}
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
      {saveIcon && (
        <Save
          color={lucidIconsButton.color.white}
          size={lucidIconsButton.size}
          strokeWidth={lucidIconsButton.strokeWidth}
        />
      )}
      {shareTwitterIcon && (
        <Twitter
          color={lucidIconsButton.color.white}
          size={lucidIconsButton.size}
          strokeWidth={lucidIconsButton.strokeWidth}
        />
      )}
      {copyToClipboardIcon && (
        <Copy
          color={lucidIconsButton.color.white}
          size={lucidIconsButton.size}
          strokeWidth={lucidIconsButton.strokeWidth}
        />
      )}
      <span className={styles.text}>{children}</span>
    </button>
  )
}

export default Button
