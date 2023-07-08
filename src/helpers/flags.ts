import { FlagZone } from '@/helpers/flags.types'

import { convertGmtToNumber, getGmt } from './dates'

export const calcOffset = (
  timeZone: FlagZone[],
  originDate: Date = new Date()
) => {
  return timeZone.map((zone: FlagZone) => {
    if (zone.dst) {
      const options = {
        timeZone: zone.zoneNames[0],
      }

      const gmt = getGmt(options, originDate)
      const offset = convertGmtToNumber(gmt ?? '')

      if (offset) {
        zone.offset = offset
      }
    }
    return zone
  })
}
