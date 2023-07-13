import { NextResponse } from 'next/server'
import { prisma, Prisma } from '@/utils/prisma'

const postHandler = async (request: Request) => {
  try {
    const { provider, user } = (await request.json()) || {}
    if (!provider && !user) {
      return NextResponse.json(
        { error: 'not valid body parameters' },
        { status: 400 },
      )
    }

    const userByProvider = await prisma.users.findFirstOrThrow({
      where: {
        providers: {
          some: {
            name: provider,
            user: user,
          },
        },
      },
      select: {
        userName: true,
      },
    })

    return NextResponse.json(userByProvider)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: error?.message || 'user not found' },
          { status: 404 },
        )
      }
    }

    console.error({ 'API Users Error': error })
    return NextResponse.json({ error: 'failed to fetch data' }, { status: 500 })
  }
}

const putHandler = async (request: Request) => {
  try {
    const data = (await request.json()) || {}

    const userExists = await prisma.users.findFirst({
      where: {
        userName: data.userName,
      },
      select: {
        userName: true,
      },
    })

    if (userExists !== null) {
      return NextResponse.json(
        { error: 'user already exists' },
        { status: 409 },
      )
    }

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
        return NextResponse.json(
          { error: error?.meta?.cause || 'user to update not found' },
          { status: 404 },
        )
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
        return NextResponse.json(
          { error: error?.meta?.cause || 'user to delete not exist' },
          { status: 404 },
        )
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
