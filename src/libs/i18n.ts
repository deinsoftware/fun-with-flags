import { getRequestConfig } from 'next-intl/server'

export default getRequestConfig(async ({ locale }: { locale: string }) => ({
  defaultLocale: 'en',
  timeZone: 'America/New_York',
  now: new Date(),
  messages: (await import(`../messages/${locale}.json`)).default,
}))
