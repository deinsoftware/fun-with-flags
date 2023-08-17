'use client'

import { useState } from 'react'

import styles from './Toggle.module.css'

type Props = {
  onToggle: (toggled: boolean) => void
}

const Toggle = ({ onToggle }: Props) => {
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
