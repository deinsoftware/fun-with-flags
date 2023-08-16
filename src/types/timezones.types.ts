const timeZones = [...Intl.supportedValuesOf('timeZone')] as const
export type Timezones = Readonly<(typeof timeZones)[number]>
