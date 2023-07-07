import { beforeEach, it, expect, describe, vi } from 'vitest'

import { isValidTimeZone, convertGmtToNumber, getRegionNames } from './dates'

describe('isValidTimeZone()', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.resetAllMocks()
  })

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
    // FIXME: change any types https://vitest.dev/api/vi.html#vi-spyon
    const spy = vi.spyOn<any, any>(Intl, 'DateTimeFormat')
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
