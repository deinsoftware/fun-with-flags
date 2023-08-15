import { ChevronUp, ChevronDown } from 'lucide-react'

import { useEffect, useState } from 'react'

import styles from './TimePicker.module.css'

import { lucidIconsTimePicker } from '@/libs/iconConfig'

const TimePicker = ({ is12H }) => {
  const [hours, setHours] = useState(is12H ? 1 : 0)
  const [minutes, setMinutes] = useState(0)

  const [time, setTime] = useState('')

  const [isPm, setIsPm] = useState(false)

  // Set HOURS values, changed by events
  const handleHoursChange = (newHours) => {
    if (is12H) {
      newHours = Math.min(12, Math.max(1, newHours))
    }
    newHours = Math.min(23, Math.max(0, newHours))

    setHours(newHours)
  }
  // EVENT - Scroll mouse function
  const onHoursWheel = (event) => {
    let newHours = hours
    if (is12H) {
      if (event.deltaY < 0) {
        newHours++ // Scroll up
      } else {
        newHours-- // Scroll down
      }
    }
    if (event.deltaY <= 0) {
      newHours++ // Scroll up
    } else {
      newHours-- // Scroll down
    }
    handleHoursChange(newHours)
  }
  // EVENT - Keyboard function
  const onHoursChange = (event) => {
    let newHours = parseInt(event.target.value || 0)
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
    let newMinutes = parseInt(event.target.value || 0)
    handleMinutesChange(newMinutes)
  }

  // Increment/Decrement Hours/Minutes by buttons
  const incrementHours = () => {
    setHours((prev) => {
      if (!is12H && prev < 23) {
        return prev + 1
      }
      if (is12H && prev < 12) {
        return prev + 1
      }
      return prev
    })
  }
  const decreaseHours = () => {
    setHours((prev) => {
      if (!is12H) {
        if (prev >= 1) {
          return prev - 1
        }
      }
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

  // Set MINUTES values, changed by buttons
  const handleIncrementMinutes = () => {
    incrementMinutes() // Llamada a la función original
    setTime(hours + ':' + minutes) // Actualizar time
  }
  const handleDecreaseMinutes = () => {
    decreaseMinutes() // Llamada a la función original
    setTime(hours + ':' + minutes) // Actualizar time
  }

  // Set required timeFormat HH:mm
  const setRequiredTimeFormat = (hours, minutes, is12H) => {
    const formattedMinutes = minutes.toString().padStart(2, '0')
    let formattedHours
    if (is12H && isPm) {
      formattedHours = (hours + 12).toString().padStart(2, '0')
      if (hours === 12) {
        formattedHours = '12'
      }
    } else {
      formattedHours = hours.toString().padStart(2, '0')
    }
    setTime(`${formattedHours}:${formattedMinutes}`)
  }

  useEffect(() => {
    setRequiredTimeFormat(hours, minutes, is12H)
  }, [hours, minutes, isPm])

  const setTruePm = () => {
    setIsPm(true)
  }
  const setFalsePm = () => {
    setIsPm(false)
  }

  // this is not a console.log 🐱‍👤
  console.log(`${time} | PM = ${isPm} | AM = ${!isPm}`)

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
              min={0}
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
          <span className={styles['colon-separator']}>:</span>
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
            <button
              className={`${styles['am']} ${!isPm ? styles['active'] : ''}  `}
              type="button"
              onClick={setFalsePm}
            >
              AM
            </button>
            <button
              className={`${styles['pm']} ${isPm ? styles['active'] : ''}`}
              type="button"
              onClick={setTruePm}
            >
              PM
            </button>
          </div>
        )}
      </div>
    </>
  )
}

export default TimePicker
