import { getUserLocale } from './locale'

afterEach(() => {
  vi.resetAllMocks()
  vi.restoreAllMocks()
})

describe('getUserLocale()', () => {
  it('should return the user locale when available on navigator', () => {
    const expected = 'en-US'

    const spy = vi.spyOn(navigator, 'language', 'get')
    spy.mockReturnValue(expected)

    const result = getUserLocale()

    expect(result).toBe(expected)

    spy.mockRestore()
  })

  it('should return the Intl result when navigator.language is not available', () => {
    const expected = 'en-US'

    const spyNavigator = vi.spyOn<typeof navigator, any>(
      navigator,
      'language',
      'get',
    )
    spyNavigator.mockReturnValue(undefined)

    const spyIntl = vi
      .spyOn<typeof Intl, any>(Intl, 'DateTimeFormat')
      .mockImplementation(() => ({
        resolvedOptions: () => ({
          locale: expected,
        }),
      }))

    const result = getUserLocale()
    expect(result).toBe(expected)

    spyNavigator.mockRestore()
    spyIntl.mockRestore()
  })

  it('should return the default value', () => {
    const expected = 'en-US'

    const spyNavigator = vi.spyOn<typeof navigator, any>(
      navigator,
      'language',
      'get',
    )
    spyNavigator.mockReturnValue(undefined)

    const spyIntl = vi
      .spyOn<typeof Intl, any>(Intl, 'DateTimeFormat')
      .mockImplementation(() => undefined)

    const result = getUserLocale()
    expect(result).toBe(expected)

    spyNavigator.mockRestore()
    spyIntl.mockRestore()
  })
})
