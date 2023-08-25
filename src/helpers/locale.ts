import { Locale } from '@/types/locale.types'

export const getUserLocale = (): Locale => {
  const locale =
    navigator.language ||
    Intl.DateTimeFormat()?.resolvedOptions()?.locale ||
    'en-US'
  return locale as Locale
}
