import { convertGmtToNumber, getLocaleGmt } from './dates'

import { FlagZone } from '@/helpers/flags.types'

export const calcOffset = (
  timeZone: FlagZone[],
  originDate: Date = new Date(),
) => {
  return timeZone.map((zone: FlagZone) => {
    if (zone.dst) {
      const options = {
        timeZone: zone.zoneNames[0],
      }

      const gmt = getLocaleGmt(options, originDate)
      const offset = convertGmtToNumber(gmt ?? '')

      if (offset) {
        zone.offset = offset
      }
    }
    return zone
  })
}
