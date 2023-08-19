import { Prisma, UsersProviders } from '@prisma/client'

const { NEXT_PUBLIC_API_URL = '' } = process?.env || {}

export const getUserByProvider = async ({
  user,
  name,
  signal,
}: UsersProviders & { signal?: AbortSignal }): Promise<{
  userName: string
} | null> => {
  const payload = JSON.stringify({
    provider: name,
    user: user,
  })

  const options = {
    method: 'POST',
    body: payload,
    signal,
  }

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/users`, options)
  if (response.status !== 200) {
    return null
  }
  const result = await response.json()
  return result
}

export const getUserByUser = async (
  user: string,
  signal?: AbortSignal,
): Promise<{ userName: string } | null> => {
  const payload = JSON.stringify({
    user: user,
  })

  const params: RequestInit = {
    method: 'POST',
    body: payload,
    signal,
  }

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/users`, params)
  if (response.status !== 200) {
    return null
  }
  const result = await response.json()
  return result
}

export const createUser = async ({
  userName,
  providers,
  signal,
}: Prisma.UsersCreateInput & { signal?: AbortSignal }): Promise<{
  userName: string
} | null> => {
  const payload = JSON.stringify({
    userName,
    providers,
  })

  const params: RequestInit = {
    method: 'PUT',
    body: payload,
    signal,
  }

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/users`, params)
  if (response.status !== 201) {
    throw new Error("User can't be created")
  }
  const result = await response.json()
  return result
}
