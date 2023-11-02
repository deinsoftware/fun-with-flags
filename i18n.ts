import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }) => ({
  // The time zone can either be statically defined, read from the
  // user profile if you store such a setting, or based on dynamic
  // request information like the locale or headers.
  timeZone: 'America/New_York',
  now: new Date(),
}))
