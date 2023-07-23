import { Prisma, UsersProviders } from '@prisma/client'

export const getUserByProvider = async ({ user, name }: UsersProviders) => {
  const payload = JSON.stringify({
    provider: name,
    user: user,
  })

  const options = {
    method: 'POST',
    body: payload,
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
    options,
  )
  if (response.status !== 200) {
    return ''
  }
  const result = await response.json()
  return result
}

export const getUserByUser = async (user: string) => {
  const payload = JSON.stringify({
    user: user,
  })

  const options = {
    method: 'POST',
    body: payload,
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
    options,
  )
  if (response.status !== 200) {
    return ''
  }
  const result = await response.json()
  return result
}

export const createUser = async ({
  userName,
  providers,
}: Prisma.UsersCreateInput) => {
  const payload = JSON.stringify({
    userName,
    providers,
  })

  const options = {
    method: 'PUT',
    body: payload,
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
    options,
  )
  if (response.status !== 201) {
    throw new Error("User can't be created")
  }
  const result = await response.json()
  return result
}
