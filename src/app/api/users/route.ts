import { NextResponse } from 'next/server'
import { prisma, Prisma } from '@/utils/prisma'
import { Providers } from '@/shared/types/providers.types'

const getUserByProvider = async (provider: Providers, user: string) => {
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

const postHandler = async (request: Request) => {
  try {
    const { provider, user } = (await request.json()) || {}
    if (!provider && !user) {
      return NextResponse.json(
        { error: 'not valid body parameters' },
        { status: 400 },
      )
    }

    return await getUserByProvider(provider, user)
  } catch (error) {
    console.error({ 'API Users Error': error })
    return NextResponse.json({ error: 'failed to fetch data' }, { status: 500 })
  }
}

const putHandler = async (request: Request) => {
  try {
    const data: Prisma.UsersCreateInput = (await request.json()) || {}

    const user = await prisma.users.create({
      data,
    })
    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    console.error({ 'API Users Error': error })
    return NextResponse.json({ error: 'failed to create' }, { status: 500 })
  }
}

const patchHandler = async (request: Request) => {
  try {
    const { userName, ...rest } = (await request.json()) || {}
    const data: Prisma.UsersUpdateInput = {
      ...rest,
    }

    const user = await prisma.users.update({
      data,
      where: { userName },
    })
    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'user not found' }, { status: 404 })
      }
    }

    console.error({ 'API Users Error': error })
    return NextResponse.json({ error: 'failed to update' }, { status: 500 })
  }
}

const delHandler = async (request: Request) => {
  try {
    const { userName } = (await request.json()) || {}
    if (!userName) {
      return NextResponse.json(
        { error: 'not valid body parameters' },
        { status: 400 },
      )
    }

    const user = await prisma.users.delete({
      where: {
        userName,
      },
      include: {
        Events: true,
      },
    })

    return NextResponse.json(user)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'user not found' }, { status: 404 })
      }
    }

    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to delete' }, { status: 501 })
  }
}

export {
  postHandler as POST,
  putHandler as PUT,
  patchHandler as PATCH,
  delHandler as DELETE,
}
