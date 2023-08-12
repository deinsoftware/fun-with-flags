import { EventBody } from '@/types/event.types'

const { NEXT_PUBLIC_API_URL = '' } = process?.env || {}

export async function createEvent(
  { description, eventName, timeZone, url, userName, tags, lang }: EventBody,
  signal?: AbortSignal,
): Promise<any> {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const body = JSON.stringify({
    description,
    lang: lang ?? 'es-CO',
    name: eventName,
    tags,
    timeZone,
    url,
    userName,
  })
  const params: RequestInit = {
    method: 'PUT',
    headers,
    body,
    redirect: 'follow',
    signal,
  }
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/events`, params)
    if (!response.ok) {
      return { message: 'failed to create event', error: response }
    }
    const data = await response.json()

    return `Created event: ${data.name}`
  } catch (error) {
    return { message: 'Server error', error }
  }
}
