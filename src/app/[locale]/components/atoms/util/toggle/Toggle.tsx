'use client'


import styles from './Toggle.module.css'

type Props = {
  value: boolean
  onToggle: () => void
}

const Toggle = ({ value, onToggle }: Props) => {
  return (
    <>
      <button
        className={`${styles['toggle']} ${
          value ? `${styles['toggled']}` : ''
        }`}
        type="button"
        onClick={onToggle}
      >
        <div className={styles['thumb']} />
      </button>
    </>
  )
}

export default Toggle
