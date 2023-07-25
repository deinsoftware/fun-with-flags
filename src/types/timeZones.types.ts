const timeZones = [...Intl.supportedValuesOf('timeZone')] as const
export type TimeZones = (typeof timeZones)[number]
