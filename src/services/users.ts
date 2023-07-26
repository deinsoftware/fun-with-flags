import { UsersProviders } from '@/libs/prisma'

import { Prisma } from '@/libs/prisma'

const { NEXT_PUBLIC_API_URL = '' } = process?.env || {}

export const getUserByProvider = async ({
  user,
  name,
}: UsersProviders): Promise<{ userName: string } | null> => {
  const payload = JSON.stringify({
    provider: name,
    user: user,
  })

  const options = {
    method: 'POST',
    body: payload,
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
): Promise<{ userName: string } | null> => {
  const payload = JSON.stringify({
    user: user,
  })

  const options = {
    method: 'POST',
    body: payload,
  }

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/users`, options)
  if (response.status !== 200) {
    return null
  }
  const result = await response.json()
  return result
}

export const createUser = async ({
  userName,
  providers,
}: Prisma.UsersCreateInput): Promise<{ userName: string } | null> => {
  const payload = JSON.stringify({
    userName,
    providers,
  })

  const options = {
    method: 'PUT',
    body: payload,
  }

  const response = await fetch(`${NEXT_PUBLIC_API_URL}/api/users`, options)
  if (response.status !== 201) {
    throw new Error("User can't be created")
  }
  const result = await response.json()
  return result
}
