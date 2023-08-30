import { it, expect, describe } from 'vitest'

import { shareEventsTwitter } from './share-events'

describe('shareEventsTwitter', () => {
  it('should return a valid Twitter URL', () => {
    const url = 'https://www.example.com'
    const text = 'This is a test tweet'
    const hashtags = ['test', 'events']
    const expectedURL =
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.example.com&text=This+is+a+test+tweet&hashtags=test%2Cevents'
    const actualURL = shareEventsTwitter({ url, text, hashtags })
    expect(actualURL).toBe(expectedURL)
  })

  it('should not include hashtags if they are not provided', () => {
    const url = 'https://www.example.com'
    const text = 'This is a test tweet'
    const expectedURL =
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.example.com&text=This+is+a+test+tweet'
    const actualURL = shareEventsTwitter({ url, text })
    expect(actualURL).toBe(expectedURL)
  })
})
