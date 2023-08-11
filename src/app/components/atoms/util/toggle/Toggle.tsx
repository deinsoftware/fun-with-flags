'use client'

import { useState } from 'react'

import styles from './Toggle.module.css'

// ¿Es esto correcto?
interface ToggleProps {
  onToggle: (toggled: boolean) => void
}

const Toggle = ({ onToggle }: ToggleProps) => {
  const [toggled, setToggled] = useState(false)

  const handleClick = () => {
    setToggled(!toggled)
    onToggle(!toggled)
  }

  return (
    <>
      <button
        className={`${styles['toggle']} ${
          toggled ? `${styles['toggled']}` : ''
        }`}
        type="button"
        onClick={handleClick}
      >
        <div className={styles['thumb']} />
      </button>
    </>
  )
}

export default Toggle
