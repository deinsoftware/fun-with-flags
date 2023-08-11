import { it, expect, describe, vi } from 'vitest'

import {
  isValidTimeZone,
  convertGmtToNumber,
  getRegionNames,
  extractDate,
  extractTime,
  joinISODate,
} from './dates'

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
    const result = isValidTimeZone(value)
    expect(result).toBeFalsy()
  })

  it('should return false when Intl is not available', () => {
    const spy = vi.spyOn<typeof Intl, any>(Intl, 'DateTimeFormat')
    spy.mockImplementation(() => undefined)

    const value = 'Foo/Bar'
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
    expect(result).toBe('12:34:56')
  })

  it('should pad single-digit hour, minute, and second with leading 0', () => {
    const date = new Date('2022-01-01T01:02:03')
    vi.setSystemTime(date)
    const result = extractTime(date)
    expect(result).toBe('01:02:03')
  })
})

describe('joinISODate()', () => {
  it('should return a valid ISO string when all parameters are provided', () => {
    const result = joinISODate('2022-01-01', '12:00:00', '+03:00')
    expect(result).toEqual('2022-01-01T09:00:00.000Z')
  })

  it('should return a valid ISO string when only date and time are provided', () => {
    const result = joinISODate('2022-01-01', '12:00:00')
    expect(result).toEqual('2022-01-01T12:00:00.000Z')
  })

  it('should return an exception when creating the date fails', () => {
    const result = () => {
      joinISODate('2022-01-01', '')
    }
    expect(result).toThrowError()
  })

  it('should return an exception when gmt is not valid', () => {
    const result = () => {
      joinISODate('2022-01-01', '12:00:00', '5:00')
    }
    expect(result).toThrowError()
  })
})

describe('convertGmtToNumber()', () => {
  it('should return an integer on GMT with exact time', () => {
    const value = 'GMT+1'
    const result = convertGmtToNumber(value)
    expect(result).toBe(1)
  })

  it('should return a decimal on GMT with non exact time ', () => {
    const value = 'GMT+5:45'
    const result = convertGmtToNumber(value)
    expect(result).toBe(5.75)
  })

  it('should return a decimal on empty GMT', () => {
    const value = ''
    const result = convertGmtToNumber(value)
    expect(result).toBeUndefined()
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
