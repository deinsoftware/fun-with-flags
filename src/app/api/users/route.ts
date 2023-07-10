import { NextResponse } from 'next/server'
import prisma from '@/utils/prisma'
import { Providers } from '@/shared/types/providers.types'

const getUser = async (provider: Providers, user: string) => {
  const userByProvider = await prisma.users.findFirst({
    where: {
      providers: {
        name: provider,
        user: user,
      },
    },
    select: {
      userName: true,
    },
  })

  return NextResponse.json(userByProvider)
}

const handler = async (request: Request) => {
  try {
    const { provider, user } = (await request.json()) || {}
    if (!provider && !user) {
      return NextResponse.json(
        { error: 'not valid body parameters' },
        { status: 400 },
      )
    }

    return await getUser(provider, user)
  } catch (error) {
    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to fetch data' }, { status: 500 })
  }
}

export { handler as POST }
