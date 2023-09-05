'use client'

import styles from './Toggle.module.css'

type Props = {
  value: boolean
  onToggle: () => void
  disabled?: boolean
}

const Toggle = ({ value, onToggle, disabled = false }: Props) => {
  return (
    <>
      <button
        className={`${styles['toggle']} ${value ? `${styles['toggled']}` : ''}`}
        disabled={disabled}
        type="button"
        onClick={onToggle}
      >
        <div className={styles['thumb']} />
      </button>
    </>
  )
}

export default Toggle
