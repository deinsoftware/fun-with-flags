const timeZones = [...Intl.supportedValuesOf('timeZone')] as const
export type Timezones = (typeof timeZones)[number]
