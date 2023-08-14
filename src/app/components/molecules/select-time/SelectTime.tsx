'use client'

import { useState } from 'react'

import TimePicker24H from '../../atoms/util/time-pickers/TimePicker24H'
import TimePicker12H from '../../atoms/util/time-pickers/TimePicker12H'

import Toggle from '../../atoms/util/toggle/Toggle'

import styles from './SelectTime.module.css'

const SelectTime = () => {
  const [is24H, setIs24H] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false)

  return (
    <>
      <button
        className={styles['select-time']}
        type="button"
        onClick={() => setShowTimePicker(!showTimePicker)}
      >
        Select time
      </button>

      {showTimePicker && <>{is24H ? <TimePicker12H /> : <TimePicker24H />}</>}

      <div className={styles['container-toggle']}>
        <Toggle onToggle={setIs24H} />
        <span className={styles['text-toggle']}>24H</span>
      </div>
    </>
  )
}

export default SelectTime
