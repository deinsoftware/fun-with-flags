import { it, expect, describe, vi } from 'vitest'

import {
  isValidTimeZone,
  convertGmtToNumber,
  getRegionNames,
  extractDate,
  extractTime,
  joinISODate,
  getLocaleDayPeriod,
  formatLocaleTime,
  getLocaleGmt,
} from './dates'

import { TimezoneNames, Timezones } from '@/types/timezones.types'

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
})

describe('isValidTimeZone()', () => {
  it('should return true when using a correct time zone', () => {
    const value = 'Australia/Adelaide'
    const result = isValidTimeZone(value)
    expect(result).toBeTruthy()
  })

  it('should return false when using an incorrect time zone', () => {
    const value = 'Foo/Bar'
    //@ts-expect-error
    const result = isValidTimeZone(value)
    expect(result).toBeFalsy()
  })

  it('should return false when Intl is not available', () => {
    const spy = vi.spyOn<typeof Intl, any>(Intl, 'DateTimeFormat')
    spy.mockImplementation(() => undefined)

    const value = 'Foo/Bar'
    // @ts-expect-error
    const result = isValidTimeZone(value)
    expect(result).toBeFalsy()

    spy.mockRestore()
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

describe('getRegionNames()', () => {
  it('should return the region name in english', () => {
    const locale = 'en-US'
    const countryCode = 'US'
    const result = getRegionNames(countryCode, locale)
    expect(result).toBe('United States')
  })

  it('should return the region name in traditional chinese', () => {
    const locale = 'zh-Hant'
    const countryCode = 'US'
    const result = getRegionNames(countryCode, locale)
    expect(result).toBe('美國')
  })

  it('should return the region name with default language', () => {
    const locale = undefined
    const countryCode = 'US'
    const result = getRegionNames(countryCode, locale)
    expect(result).toBe('United States')
  })
})
