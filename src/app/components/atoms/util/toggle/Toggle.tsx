'use client'

import { useState } from 'react'

import styles from './Toggle.module.css'

const Toggle = () => {
  const [toggled, setToggled] = useState(false)

  return (
    <>
      <button
        className={`${styles['toggle']} ${
          toggled ? `${styles['toggled']}` : ''
        }`}
        type="button"
        onClick={() => setToggled(!toggled)}
      >
        <div className={styles['thumb']} />
      </button>
    </>
  )
}

export default Toggle
