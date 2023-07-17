import { it, expect, describe, vi } from 'vitest'
import { Roles, Providers } from '@prisma/client'
import { GET as getUser } from './route'

import prismaMock from '@/libs/__mocks__/prisma'
vi.mock('@/libs/prisma')

describe('getUsers()', () => {
  it('createUser should return the generated user', async () => {
    const result = {
      id: '64af43ca3ebf1ffdcc8cb10c',
      userName: 'user',
      providers: [
        {
          name: Providers.google,
          user: 'user@google.com',
        },
      ],
      role: Roles.USER,
      createdAt: new Date('2023-07-13T00:22:34.251Z'),
      updatedAt: new Date('2023-07-13T00:22:34.251Z'),
    }
    prismaMock.users.findUnique.mockResolvedValue(result)

    const request = new Request('https://localhost/api/users/:userName')
    const pathVariables = {
      params: { userName: result.userName },
    }
    const user = await getUser(request, pathVariables)

    expect(prismaMock.users.findUnique).toHaveBeenCalledTimes(1)
    expect(prismaMock.users.findUnique).toHaveBeenCalledWith({
      where: { userName: result.userName },
    })
    expect(user).toStrictEqual(result)
  })
})
