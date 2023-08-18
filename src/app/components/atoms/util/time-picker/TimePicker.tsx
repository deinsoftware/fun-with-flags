import { ChevronUp, ChevronDown } from 'lucide-react'

import { useEffect, useState } from 'react'

import styles from './TimePicker.module.css'

import { lucidIconsTimePicker } from '@/libs/icon-config'

const arrayMinutes = Array.from(Array(60).keys(), (num) =>
  num.toString().padStart(2, '0'),
)
const arrayHours24 = Array.from(Array(24).keys(), (num) =>
  num.toString().padStart(2, '0'),
)

const arrayHours12 = [
  '12',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
]

type Props = {
  time: string //HH:MM
  format: 12 | 24 //type TimeFormat
  onClick: (time: string) => void
  dayPeriod?: {
    am: string
    pm: string
  }
}

const TimePicker = ({
  time,
  format,
  onClick,
  dayPeriod = {
    am: 'AM',
    pm: 'PM',
  },
}: Props) => {
  const [arrayHours, setArrayHours] = useState(
    format === 12 ? arrayHours12 : arrayHours24,
  )

  //todo: load time
  const [hh, mm] = time.split(':')

  const [hours, setHours] = useState(parseInt(hh, 10) ?? 0)
  const [minutes, setMinutes] = useState(parseInt(mm, 10) ?? 0)

  const [meridianPosition, setMeridianPosition] = useState(dayPeriod.am)

  useEffect(() => {
    const meridian = hours > 11 ? dayPeriod.pm : dayPeriod.am

    setMeridianPosition(meridian)
  }, [hours, dayPeriod])

  useEffect(() => {
    const hoursArray = format === 12 ? arrayHours12 : arrayHours24
    setArrayHours(hoursArray)
  }, [format])

  const handlePlus = (array, setFunction) => {
    setFunction((index) => {
      return index + 1 < array.length ? index + 1 : 0
    })
  }

  const handleMinus = (array, setFunction) => {
    setFunction((index) => {
      return index - 1 >= 0 ? index - 1 : array.length - 1
    })
  }

  const handleMeridian = (meridian: string) => {
    const operation = meridian === dayPeriod.am ? -12 : +12
    setHours((index) => index + operation)
  }

  const handleWheel = (event, array, setFunction) => {
    if (event.deltaY < 0) {
      // Scroll up
      handleMinus(array, setFunction)
    } else {
      // Scroll down
      handlePlus(array, setFunction)
    }
  }

  const handleKeyPress = (event, array, setFunction) => {
    if (event.key === 'ArrowUp') {
      handleMinus(array, setFunction)
    } else if (event.key === 'ArrowDown') {
      handlePlus(array, setFunction)
    }
  }

  useEffect(() => {
    onClick(`${hours.toString().padStart(2, '0')}:${arrayMinutes[minutes]}`)
  }, [hours, minutes])

  const handleChange = (event, array, setFunction) => {
    const value = event.target.valueAsNumber

    const minValue = parseInt(array.at(0), 10)
    const maxValue = parseInt(array.at(-1), 10)

    if (value <= maxValue && value >= minValue) {
      setFunction(value)
    }
  }
  const handleChangeHours = (event, array, setFunction) => {
    const value = event.target.valueAsNumber

    // console.log(value, parseInt(value, 10));
    if (format === 12) {
      if (value <= 12 && value >= 1) {
        const index = array.indexOf(value.toString().padStart(2, '0'))
        // console.log({ index });
        if (index >= 0) {
          const operation = meridianPosition === dayPeriod.am ? 0 : +12
          setHours(() => index + operation)
        }
      }
    } else {
      handleChange(event, array, setFunction)
    }
  }

  return (
    <>
      <div className={styles['container']}>
        <div className={styles['container-time']}>
          <div className={styles['container-hours']}>
            <button
              className={styles['increment-hours-button']}
              type="button"
              onClick={() => handleMinus(arrayHours, setHours)}
            >
              <ChevronUp
                color={lucidIconsTimePicker.color.dark}
                size={lucidIconsTimePicker.size}
              />
            </button>
            <input
              readOnly
              className={styles['input-hours']}
              max={format === 12 ? 12 : 23}
              min={format === 12 ? 1 : 0}
              step="1"
              type="number"
              value={arrayHours[hours]}
              onChange={(event) =>
                handleChangeHours(event, arrayHours, setHours)
              }
              onKeyDown={(event) => handleKeyPress(event, arrayHours, setHours)}
              onWheel={(event) => handleWheel(event, arrayHours, setHours)}
            />
            <button
              className={styles['decrease-hours-button']}
              type="button"
              onClick={() => handlePlus(arrayHours, setHours)}
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
              onClick={() => handleMinus(arrayMinutes, setMinutes)}
            >
              <ChevronUp
                color={lucidIconsTimePicker.color.dark}
                size={lucidIconsTimePicker.size}
              />
            </button>
            <input
              readOnly
              className={styles['input-minutes']}
              max="59"
              min="0"
              step="1"
              type="number"
              value={arrayMinutes[minutes]}
              onChange={(event) =>
                handleChange(event, arrayMinutes, setMinutes)
              }
              onKeyDown={(event) =>
                handleKeyPress(event, arrayMinutes, setMinutes)
              }
              onWheel={(event) => handleWheel(event, arrayMinutes, setMinutes)}
            />
            <button
              className={styles['decrease-hours-button']}
              type="button"
              onClick={() => handlePlus(arrayMinutes, setMinutes)}
            >
              <ChevronDown
                color={lucidIconsTimePicker.color.dark}
                size={lucidIconsTimePicker.size}
              />
            </button>
          </div>
        </div>
        {/* 12H Format */}
        {format === 12 && (
          <div className={styles['container-am-pm']}>
            <button
              className={`${styles['am']} ${
                meridianPosition === dayPeriod.am ? styles['active'] : ''
              }  `}
              disabled={meridianPosition === dayPeriod.am}
              type="button"
              onClick={() => handleMeridian(dayPeriod.am)}
            >
              AM
            </button>
            <button
              className={`${styles['pm']} ${
                meridianPosition === dayPeriod.pm ? styles['active'] : ''
              }`}
              disabled={meridianPosition === dayPeriod.pm}
              type="button"
              onClick={() => handleMeridian(dayPeriod.pm)}
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
