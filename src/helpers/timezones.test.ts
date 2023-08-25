import { it, expect, describe, vi } from 'vitest'

import { getUserTimezone, isValidTimeZone, getRegionNames } from './timezones'

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

describe('getUserTimezone', () => {
  it('should return a string as timezone', () => {
    const timezone = getUserTimezone()
    expect(typeof timezone).toBe('string')
  })

  it('should return the user mocked timezone', async () => {
    const expected = 'America/New_York'

    const spy = vi
      .spyOn<typeof Intl, any>(Intl, 'DateTimeFormat')
      .mockImplementation(() => ({
        resolvedOptions: () => ({
          timeZone: expected,
        }),
      }))

    const result = await getUserTimezone()
    expect(result).toBe(expected)

    spy.mockRestore()
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
