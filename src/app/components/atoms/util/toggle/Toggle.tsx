'use client'

import { useState } from 'react'

import styles from './Toggle.module.css'

type Props = {
  onToggle: (toggled: boolean) => void
  initialState: boolean
}

const Toggle = ({ onToggle, initialState }: Props) => {
  const [toggled, setToggled] = useState(initialState)

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
