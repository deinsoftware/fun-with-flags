import { ChevronUp, ChevronDown } from 'lucide-react'

import { useEffect, useState } from 'react'

import styles from './TimePicker.module.css'

import { lucidIconsTimePicker } from '@/libs/iconConfig'

const TimePicker = ({is12H}) => {

  const [hours, setHours] = useState(1)
  const [minutes, setMinutes] = useState(0)

  const [time, setTime] = useState('')

  //! FormatTime HH:mm !//
  const formatTime = (hours, minutes) => {
    let formattedHours = hours
    let formattedMinutes = minutes

    // usar padStart (?)
    if (hours < 10) {
      formattedHours = `0${hours}`
    }
    if (minutes < 10) {
      formattedMinutes = `0${minutes}`
    }

    setTime(`${formattedHours}:${formattedMinutes}`)
  }

  useEffect(() => {
    formatTime(hours, minutes)
  }, [hours, minutes])

  console.log(time)

  //! Functions for the hours ⬇⬇⬇ !//
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

  // Scroll mouse function
  const onHoursWheel = (e) => {
    let newHours = hours

    if (e.deltaY < 0) {
      // Scroll up
      newHours++
    } else {
      // Scroll down
      newHours--
    }

    // Validación de límites
    newHours = Math.min(12, Math.max(1, newHours))

    setHours(newHours)
  }

  // Keyboard function
  const onHoursChange = (e) => {
    let newHours = parseInt(e.target.value)

    newHours = Math.min(12, Math.max(1, newHours))

    setHours(newHours)
  }
  //! Functions for the hours ⬆⬆⬆ !//

  //! Functions for the minutes ⬇⬇⬇ !//
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

  // Scroll mouse function
  const onMinutesWheel = (e) => {
    let newMinutes = minutes

    if (e.deltaY < 0) {
      // Scroll up
      newMinutes++
    } else {
      // Scroll down
      newMinutes--
    }

    // Validación de límites
    newMinutes = Math.min(59, Math.max(0, newMinutes))

    setMinutes(newMinutes)
  }

  // Keyboard function
  const onMinutesChange = (e) => {
    let newMinutes = parseInt(e.target.value)

    newMinutes = Math.min(59, Math.max(0, newMinutes))

    setMinutes(newMinutes)
  }
  //! Functions for the minutes ⬆⬆⬆ !//

  //! Poner el valor de los inputs sumado por los botones, en el estado time ⬇⬇⬇ !//
  const handleIncrementHours = () => {
    incrementHours() // Llamada a la función original
    setTime(hours + ':' + minutes) // Actualizar time
  }

  const handleDecreaseHours = () => {
    decreaseHours() // Llamada a la función original
    setTime(hours + ':' + minutes) // actualizar time
  }

  const handleIncrementMinutes = () => {
    incrementMinutes() // llamada a la función original
    setTime(hours + ':' + minutes) // actualizar time
  }

  const handleDecreaseMinutes = () => {
    decreaseMinutes() // llamada a la función original
    setTime(hours + ':' + minutes) // actualizar time
  }
  //! Poner el valor de los inputs sumado por los botones, en el estado time ⬆⬆⬆ !//

  //! Poner el valor de los inputs sumado por los eventos, en el estado time ⬇⬇⬇ !//
  const handleHoursChange = (e) => {
    onHoursChange(e)
    setTime(hours + ':' + minutes)
  }

  const handleMinutesChange = (e) => {
    onMinutesChange(e)
    setTime(hours + ':' + minutes)
  }
  //! Poner el valor de los inputs sumado por los eventos, en el estado time ⬆⬆⬆ !//

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
              onChange={handleHoursChange}
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
              onChange={handleMinutesChange}
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
