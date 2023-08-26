import { it, expect, describe, vi } from 'vitest'

import {
  addYearsToDate,
  daysBetweenDates,
  convertGmtToNumber,
  extractDate,
  extractTime,
  joinISODate,
  getLocaleDayPeriod,
  formatLocaleTime,
  getLocaleGmt,
  getUserTimeFormat,
} from './dates'

import { TimezoneNames, Timezones } from '@/types/timezones.types'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('addYearsToDate()', () => {
  it('should add the specified number of years to the date', () => {
    const date = new Date(2022, 1, 1)

    const result = addYearsToDate(date, 5)

    expect(result.getFullYear()).toBe(2027)
  })

  it('should handle negative years', () => {
    const date = new Date(2022, 1, 1)

    const result = addYearsToDate(date, -3)

    expect(result.getFullYear()).toBe(2019)
  })
})

describe('daysBetweenDates()', () => {
  it('should return 0 when startDate and endDate are the same', () => {
    const startDate = new Date('2022-01-01')
    const endDate = new Date('2022-01-01')
    expect(daysBetweenDates(startDate, endDate)).toEqual(0)
  })

  it('should return 1 when startDate is one day before endDate', () => {
    const startDate = new Date('2022-01-01')
    const endDate = new Date('2022-01-02')
    expect(daysBetweenDates(startDate, endDate)).toEqual(1)
  })

  it('should return 365 when startDate is one year before endDate', () => {
    const startDate = new Date('2022-01-01')
    const endDate = new Date('2023-01-01')
    expect(daysBetweenDates(startDate, endDate)).toEqual(365)
  })
})

describe('extractDate()', () => {
  it('should return the correct date in YYYY-MM-DD format', () => {
    const date = new Date(2023, 11, 31)
    vi.setSystemTime(date)

    const result = extractDate(date)
    expect(result).toEqual('2023-12-31')
  })

  it('should pad single-digit date ans seconds with leading 0', () => {
    const date = new Date(2022, 0, 2)
    vi.setSystemTime(date)
    const result = extractDate(date)
    expect(result).toEqual('2022-01-02')
  })
})

describe('extractTime()', () => {
  it('should return the correct time in HH:MM:SS format', () => {
    const date = new Date('2022-01-01T12:34:56')
    vi.setSystemTime(date)
    const result = extractTime(date)
    expect(result).toBe('12:34')
  })

  it('should pad single-digit hour, minute, and second with leading 0', () => {
    const date = new Date('2022-01-01T01:02:03')
    vi.setSystemTime(date)
    const result = extractTime(date)
    expect(result).toBe('01:02')
  })
})

describe('joinISODate()', () => {
  it('should return a valid ISO string when all parameters are provided', () => {
    const result = joinISODate('2022-01-01', '12:00', '+03:00')
    expect(result).toEqual('2022-01-01T09:00:00.000Z')
  })

  it('should return a valid ISO string when only date and time are provided', () => {
    const result = joinISODate('2022-01-01', '12:00')
    expect(result).toEqual('2022-01-01T12:00:00.000Z')
  })
})

describe('getLocaleDayPeriod()', () => {
  it('should return "AM" and "PM" for the en-US locale', () => {
    const locale = 'en-US'
    const result = getLocaleDayPeriod(locale)

    expect(result.am).toBe('AM')
    expect(result.pm).toBe('PM')
  })

  it('should return "上午" and "下午" for the zh-Hant locale', () => {
    const locale = 'zh-Hant'
    const result = getLocaleDayPeriod(locale)

    expect(result.am).toBe('上午')
    expect(result.pm).toBe('下午')
  })

  it('should return the default values for an invalid locale', () => {
    const locale = 'invalid-locale'
    const result = getLocaleDayPeriod(locale)

    expect(result.am).toBe('AM')
    expect(result.pm).toBe('PM')
  })
})

describe('formatLocaleTime()', () => {
  it('should return formatted time in 12-hour format by default', () => {
    const time = '12:00'
    const format = 12
    const locale = 'en-US'

    const result = formatLocaleTime(time, format, locale)

    // assert that the result matches the expected format
    expect(result).toBe('12:00 PM')
  })

  it('should return formatted time in 24-hour format when specified', () => {
    const time = '12:00'
    const format = 24
    const locale = 'en-US'

    const result = formatLocaleTime(time, format, locale)

    // assert that the result matches the expected format
    expect(result).toBe('12:00')
  })

  it('should return formatted time in specified locale', () => {
    const time = '12:00'
    const format = 12
    const locale = 'zh-Hant'

    const result = formatLocaleTime(time, format, locale)

    // assert that the result matches the expected format
    expect(result).toBe('下午12:00')
  })

  it('should return formatted time in default locale when locale is not specified', () => {
    const date = '12:00'
    const format = 12

    const result = formatLocaleTime(date, format)

    // assert that the result matches the expected format
    expect(result).toBe('12:00 PM')
  })
})

describe('getLocaleGmt()', () => {
  test('should return GMT pattern for longOffset timezone name', () => {
    const options = {
      timeZone: 'America/New_York' as Timezones,
      timeZoneName: 'longOffset' as TimezoneNames,
    }
    const originDate = new Date('2022-01-01T00:00:00Z')

    const result = getLocaleGmt(options, originDate)

    expect(result).toBe('-05:00')
  })

  test('should return GMT pattern for shortOffset timezone name', () => {
    const options = {
      timeZone: 'America/New_York' as Timezones,
      timeZoneName: 'shortOffset' as TimezoneNames,
    }
    const originDate = new Date('2022-01-01T00:00:00Z')

    const result = getLocaleGmt(options, originDate)

    expect(result).toBe('-5')
  })
})

describe('convertGmtToNumber()', () => {
  it('should return an integer on GMT with exact time', () => {
    const value = '+01:00'
    const result = convertGmtToNumber(value)
    expect(result).toBe(1)
  })

  it('should return a decimal on GMT with non exact time', () => {
    const value = '+05:45'
    const result = convertGmtToNumber(value)
    expect(result).toBe(5.75)
  })

  it('should return 0 on GMT with Z', () => {
    const value = 'Z'
    const result = convertGmtToNumber(value)
    expect(result).toBe(0)
  })
})

describe('getUserTimeFormat()', () => {
  it('should return 12 when the time format is AM/PM', () => {
    const spy = vi
      .spyOn(global.Date.prototype, 'toLocaleTimeString')
      .mockReturnValue('12:00:00 AM')

    const result = getUserTimeFormat()

    expect(result).toBe(12)

    spy.mockRestore()
  })

  it('should return 24 when the time format is 24-hour', () => {
    const spy = vi
      .spyOn(global.Date.prototype, 'toLocaleTimeString')
      .mockReturnValue('18:00:00')

    const result = getUserTimeFormat()

    expect(result).toBe(24)

    spy.mockRestore()
  })
})
