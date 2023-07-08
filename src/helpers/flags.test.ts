import { it, expect, describe } from 'vitest'

import { FlagZone } from './flags.types'

import { calcOffset } from './flags'

describe('calcOffset()', () => {
  it('should not change the offset when dst is disabled', () => {
    const zoneList: FlagZone[] = [
      {
        capital: true,
        dst: false,
        initial: 'CO',
        offset: -5,
        zoneNames: ['America/Bogota'],
      },
    ]
    const expected: FlagZone[] = [...zoneList]

    const result = calcOffset(zoneList)
    expect(result).toMatchObject(expected)
  })

  it('should not change the offset for dts time on January', () => {
    const zoneList: FlagZone[] = [
      {
        capital: true,
        initial: 'PST',
        offset: -7,
        dst: true,
        zoneNames: ['America/Los_Angeles', 'America/Phoenix'],
      },
    ]
    const date = new Date('2023-01-01T01:36:42.271Z')
    const expected: FlagZone[] = [...zoneList]
    expected[0].offset = -8

    const result = calcOffset(zoneList, date)
    expect(result).toMatchObject(expected)
  })

  it('should change the offset for dts time on July', () => {
    const zoneList: FlagZone[] = [
      {
        capital: true,
        initial: 'PST',
        offset: -7,
        dst: true,
        zoneNames: ['America/Los_Angeles', 'America/Phoenix'],
      },
    ]
    const date = new Date('2023-07-01T01:36:42.271Z')
    const expected: FlagZone[] = [...zoneList]
    expected[0].offset = -7

    const result = calcOffset(zoneList, date)
    expect(result).toMatchObject(expected)
  })
})
