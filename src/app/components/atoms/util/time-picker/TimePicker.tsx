import { ChevronUp, ChevronDown } from 'lucide-react'

import { useEffect, useState } from 'react'

import styles from './TimePicker.module.css'

import { lucidIconsTimePicker } from '@/libs/iconConfig'

const TimePicker = ({ is12H }) => {
  const [hours, setHours] = useState(1)
  const [minutes, setMinutes] = useState(0)

  const [time, setTime] = useState('')

  // Set HOURS values, changed by events
  const handleHoursChange = (newHours) => {
    newHours = Math.min(12, Math.max(1, newHours))
    setHours(newHours)
  }
  // EVENT - Scroll mouse function
  const onHoursWheel = (event) => {
    let newHours = hours
    if (event.deltaY < 0) {
      newHours++ // Scroll up
    } else {
      newHours-- // Scroll down
    }
    handleHoursChange(newHours)
  }
  // EVENT - Keyboard function
  const onHoursChange = (event) => {
    let newHours = parseInt(event.target.value)
    handleHoursChange(newHours)
  }

  // Set MINUTES values, changed by events
  const handleMinutesChange = (newMinutes) => {
    newMinutes = Math.min(59, Math.max(0, newMinutes))
    setMinutes(newMinutes)
  }
  // EVENT - Scroll mouse function
  const onMinutesWheel = (event) => {
    let newMinutes = minutes
    if (event.deltaY < 0) {
      newMinutes++ // Scroll up
    } else {
      newMinutes-- // Scroll down
    }
    handleMinutesChange(newMinutes)
  }
  // EVENT - Keyboard function
  const onMinutesChange = (event) => {
    let newMinutes = parseInt(event.target.value)
    handleMinutesChange(newMinutes)
  }

  // Increment/Decrement Hours/Minutes by buttons
  const incrementHours = () => {
    setHours((prev) => {
      if (prev < 12) {
        return prev + 1
      }
      return prev
    })
  }
  const decreaseHours = () => {
    setHours((prev) => {
      if (prev > 1) {
        return prev - 1
      }
      return prev
    })
  }
  const incrementMinutes = () => {
    setMinutes((prev) => {
      if (prev < 59) {
        return prev + 1
      }
      return prev
    })
  }
  const decreaseMinutes = () => {
    setMinutes((prev) => {
      if (prev > 0) {
        return prev - 1
      }
      return prev
    })
  }

  // Set HOURS values, changed by buttons
  const handleIncrementHours = () => {
    incrementHours() // Llamada a la función original
    setTime(hours + ':' + minutes) // Actualizar time
  }
  const handleDecreaseHours = () => {
    decreaseHours() // Llamada a la función original
    setTime(hours + ':' + minutes) // Actualizar time
  }

  // Set MIBUTES values, changed by buttons
  const handleIncrementMinutes = () => {
    incrementMinutes() // Llamada a la función original
    setTime(hours + ':' + minutes) // Actualizar time
  }
  const handleDecreaseMinutes = () => {
    decreaseMinutes() // Llamada a la función original
    setTime(hours + ':' + minutes) // Actualizar time
  }

  // Set required timeFormat HH:mm
  const setRequiredTimeFormat = (hours, minutes) => {
    const formattedHours = hours.toString().padStart(2, '0')
    const formattedMinutes = minutes.toString().padStart(2, '0')

    setTime(`${formattedHours}:${formattedMinutes}`)
  }
  useEffect(() => {
    setRequiredTimeFormat(hours, minutes)
  }, [hours, minutes])

  // this is not a console.log 🐱‍👤
  console.log(time)

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['container-time']}>
          <div className={styles['container-hours']}>
            <button
              className={styles['increment-hours-button']}
              type="button"
              onClick={handleIncrementHours}
            >
              <ChevronUp
                color={lucidIconsTimePicker.color.dark}
                size={lucidIconsTimePicker.size}
              />
            </button>
            <input
              className={styles['input-hours']}
              max={23}
              min={1}
              type="number"
              value={hours}
              onChange={onHoursChange}
              onWheel={onHoursWheel}
            />
            <button
              className={styles['decrease-hours-button']}
              type="button"
              onClick={handleDecreaseHours}
            >
              <ChevronDown
                color={lucidIconsTimePicker.color.dark}
                size={lucidIconsTimePicker.size}
              />
            </button>
          </div>
          <div className={styles['container-minutes']}>
            <button
              className={styles['increment-minutes-button']}
              type="button"
              onClick={handleIncrementMinutes}
            >
              <ChevronUp
                color={lucidIconsTimePicker.color.dark}
                size={lucidIconsTimePicker.size}
              />
            </button>
            <input
              className={styles['input-minutes']}
              max={59}
              min={0}
              type="number"
              value={minutes}
              onChange={onMinutesChange}
              onWheel={onMinutesWheel}
            />
            <button
              className={styles['decrease-hours-button']}
              type="button"
              onClick={handleDecreaseMinutes}
            >
              <ChevronDown
                color={lucidIconsTimePicker.color.dark}
                size={lucidIconsTimePicker.size}
              />
            </button>
          </div>
        </div>
        {/* 12H Format */}
        {is12H && (
          <div className={styles['container-am-pm']}>
            <button className={styles['am']} type="button">
              AM
            </button>
            <button className={styles['pm']} type="button">
              PM
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default TimePicker
