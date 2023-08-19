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

  it('should truncate the text if it is too long', () => {
    const url = 'https://www.example.com'
    const text =
      'La vida es un viaje maravilloso, lleno de experiencias y aventuras. Cada día es una nueva oportunidad para aprender, crecer y vivir al máximo. No te conformes con vivir una vida mediocre, sal y explora el mundo que te rodea. Conoce nuevas personas, prueba cosas nuevas, y nunca dejes de soñar.'
    const hashtags = ['test', 'events']
    const expectedURL =
      'https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.example.com&text=La+vida+es+un+viaje+maravilloso%2C+lleno+de+experiencias+y+aventuras.+Cada+d%C3%ADa+es+una+nueva+oportunidad+para+aprender%2C+crecer+y+vivir+al+m%C3%A1ximo.+No+te+conformes+con+vivir+una+vida+mediocre%2C+sal+y+explora+el+mundo+que+te+rodea.+Conoce+nuevas+personas%2C+prueb...&hashtags=test%2Cevents'
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
