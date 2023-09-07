import { it, expect, describe, vi } from 'vitest'

import { copyTextToClipboard } from './navigator'

describe('copyTextToClipboard', () => {
    it('copies text to clipboard successfully', async () => {
    // Arrange
    const text = 'Hello, world!'

    // Act
    const result = await copyTextToClipboard(text)

    // Assert
    expect(result).toBe(true)
  })

  it('returns false when failed to copy text', async () => {
    // Arrange
    const text = 'Hello, world!'
    const error = new Error('Failed to copy text')

    // Mock the clipboard API to throw an error
    vi.spyOn(navigator.clipboard, 'writeText').mockRejectedValueOnce(error)

    // Act
    const result = await copyTextToClipboard(text)

    // Assert
    expect(result).toBe(false)
    expect(console.error).toHaveBeenCalledWith('Failed to copy text')
  })
})
