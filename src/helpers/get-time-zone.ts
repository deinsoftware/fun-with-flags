export function getTimezone() {
  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
  return timezone
}
