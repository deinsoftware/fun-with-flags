import { beforeEach, it, expect, describe, vi } from 'vitest'
import { DateInformation, EventDate } from './date-time.types'
import { isValidTimeZone, convertGmtToNumber, getDateInformation } from './date-time'

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
        spy.mockImplementation(() => undefined);

        const value = 'Foo/Bar'
        const result = isValidTimeZone(value)
        expect(result).toBeFalsy()

        spy.mockRestore();
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
    expect(result).toBeNull()
  })
})

describe('getDateInformation()', () => {
  it('should return the date information with 12 time format', () => {
    const value: DateInformation = {
      originDate: new Date('2023-06-10T01:36:42.271Z'),
      zone: {
        countryCode: 'AU',
        name: 'Australia/Adelaide',
      },
      locale: 'en-US',
      timeFormat: 12,
    }

    const expected: EventDate = {
      countryCode: 'AU',
      name: 'Australia/Adelaide',
      date: '6/10/2023',
      time: '11:06:42',
      acronym: 'GMT+9:30',
      gmt: 'GMT+9:30',
      offset: 9.5,
      i18n: {
        region: 'Australia',
        timestamp: '6/10/2023, 11:06:42 AM',
        date: '6/10/2023',
        time: '11:06:42 AM',
      },
    }

    const result = getDateInformation(value)
    expect(result).toMatchObject(expected)
  })

  it('should return the date information with 24 time format', () => {
    const value: DateInformation = {
      originDate: new Date('2023-06-10T01:36:42.271Z'),
      zone: {
        countryCode: 'AU',
        name: 'Australia/Adelaide',
      },
      locale: 'en-US',
      timeFormat: 24,
    }

    const expected: EventDate = {
      countryCode: 'AU',
      name: 'Australia/Adelaide',
      date: '6/10/2023',
      time: '11:06:42',
      acronym: 'GMT+9:30',
      gmt: 'GMT+9:30',
      offset: 9.5,
      i18n: {
        region: 'Australia',
        timestamp: '6/10/2023, 11:06:42',
        date: '6/10/2023',
        time: "11:06:42",
      },
    }

    const result = getDateInformation(value)
    expect(result).toMatchObject(expected)
  })

  it('should throw an error when using an incompatible time zone', () => {
    const value: DateInformation = {
      originDate: new Date('2023-06-10T01:36:42.271Z'),
      zone: {
        countryCode: 'AU',
        name: 'Foo/Bar',
      },
      locale: 'en-US',
      timeFormat: 24,
    }
    const expected = `Incompatible Time Zone: ${value.zone.name}`

    try {
      getDateInformation(value)
    } catch (error: unknown) {
      expect(error).toBeInstanceOf(Error)
      if (error instanceof Error) {
        expect(error.message).toBe(expected)
      }
    }
  })
})
