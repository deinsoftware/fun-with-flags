import { Prisma } from '@prisma/client'

const { NEXT_PUBLIC_API_URL = '' } = process?.env || {}

export async function createEvent(
  body: Omit<Prisma.EventsCreateInput, 'Users'> & { userName: string },
  signal?: AbortSignal,
) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const payload = JSON.stringify(body)
  const params: RequestInit = {
    method: 'PUT',
    headers,
    body: payload,
    redirect: 'follow',
    signal,
  }
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/events`, params)
    const { ok, status } = response ?? {}
    const result = { ok, status, data: {} }
    if (response.ok) {
      result.data = await response.json()
    }
    return result
  } catch (error) {
    console.error(error)
    const result = {
      ok: false,
      status: 500,
      data: {},
    }
    return result
  }
}

export async function updateEvent(
  body: Prisma.EventsUpdateInput & { id: string },
  signal?: AbortSignal,
) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const payload = JSON.stringify(body)
  const params: RequestInit = {
    method: 'PATCH',
    headers,
    body: payload,
    redirect: 'follow',
    signal,
  }
  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/events`, params)
    const { ok, status } = response ?? {}
    const result = { ok, status, data: {} }
    if (response.ok) {
      result.data = await response.json()
    }
    return result
  } catch (error) {
    console.error(error)
    const result = {
      ok: false,
      status: 500,
      data: {},
    }
    return result
  }
}

export async function getEventsByUserName(
  body: {
    userName: string
  },
  signal?: AbortSignal,
) {
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const payload = JSON.stringify(body)
  const params: RequestInit = {
    method: 'POST',
    headers,
    body: payload,
    redirect: 'follow',
    signal,
  }

  try {
    const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/events`, params)
    const { ok, status } = response ?? {}
    const result = { ok, status, data: [] }
    if (response.ok) {
      result.data = await response.json()
    }
    return result
  } catch (error) {
    console.error(error)
    const result = {
      ok: false,
      status: 500,
      data: [],
    }
    return result
  }
}
