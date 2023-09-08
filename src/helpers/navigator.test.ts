import { afterEach, it, expect, describe, vi } from 'vitest'

import { copyTextToClipboard } from './navigator'

describe('copyTextToClipboard()', () => {
  let clipboardContents: string
  const originalClipboard = { ...global.navigator.clipboard }

  afterEach(() => {
    vi.resetAllMocks()
    vi.restoreAllMocks()
    clipboardContents = ''
    Object.assign(navigator, originalClipboard)
  })

  it('copies text to clipboard successfully', async () => {
    const text = 'Hello, world!'

    const mockClipboard = {
      clipboard: {
        writeText: vi.fn((text) => {
          clipboardContents = text
        }),
        readText: vi.fn(() => clipboardContents),
      },
    }
    Object.assign(navigator, mockClipboard)

    const result = await copyTextToClipboard(text)

    expect(result).toBe(true)
    expect(navigator.clipboard.writeText).toBeCalledTimes(1)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
    expect(navigator.clipboard.readText()).toBe(text)
  })

  it('returns false when failed to copy text', async () => {
    const text = 'Hello, world!'
    const error = 'Failed to copy text'

    const mockClipboard = {
      clipboard: {
        writeText: vi.fn((text) => Promise.reject(error)),
      },
    }
    Object.assign(navigator, mockClipboard)

    vi.spyOn(console, 'error')

    const result = await copyTextToClipboard(text)

    expect(result).toBe(false)
    expect(navigator.clipboard.writeText).toBeCalledTimes(1)
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(text)
    expect(console.error).toHaveBeenCalledWith('Failed to copy text')
  })
})
