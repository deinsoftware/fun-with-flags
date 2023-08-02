import { it, expect, describe, vi } from 'vitest'

import {
  isValidTimeZone,
  convertGmtToNumber,
  getRegionNames,
  getOrder,
} from './dates'

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

describe('getOrder()', () => {
  const originDate = new Date('2023-07-13T05:18:42.271Z')

  it('should return the prev order', () => {
    const countryDate = new Date('2023-07-12')
    const result = getOrder(originDate, countryDate)
    expect(result).toBe('prev')
  })

  it('should return the same order', () => {
    const countryDate = new Date('2023-07-13')
    const result = getOrder(originDate, countryDate)
    expect(result).toBe('same')
  })

  it('should return the next order', () => {
    const countryDate = new Date('2023-07-14')
    const result = getOrder(originDate, countryDate)
    expect(result).toBe('next')
  })
})
