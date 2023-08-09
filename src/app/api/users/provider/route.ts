import { NextResponse } from 'next/server'

import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'

const putHandler = async (request: Request) => {
  try {
    const { userName, provider } = (await request.json()) || {}

    const user = await prisma.users.findFirstOrThrow({
      where: {
        userName,
      },
    })

    if (user.providers.some((_provider) => _provider.name === provider.name)) {
      return NextResponse.json(
        { error: 'provider already exist' },
        { status: 409 },
      )
    }
    user.providers.push(provider)
    const { id, ...rest } = user

    const result = await prisma.users.update({
      data: rest,
      where: { userName },
    })
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: error?.meta?.cause || 'user not found' },
          { status: 404 },
        )
      }
    }

    console.error({ 'API Users Error': error })
    return NextResponse.json({ error: 'failed to update' }, { status: 500 })
  }
}

const patchHandler = async (request: Request) => {
  try {
    const { userName, provider } = (await request.json()) || {}

    const user = await prisma.users.findFirstOrThrow({
      where: {
        userName,
      },
    })

    if (!user.providers.some((_provider) => _provider.name === provider.name)) {
      return NextResponse.json({ error: 'no provider found' }, { status: 404 })
    }

    const providers = user.providers.map((_provider) => {
      if (_provider.name !== provider.name) {
        return _provider
      }
      return provider
    })
    user.providers = providers
    const { id, ...rest } = user

    const result = await prisma.users.update({
      data: rest,
      where: { userName },
    })
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: error?.meta?.cause || 'user not found' },
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
    const { userName, provider } = (await request.json()) || {}

    const user = await prisma.users.findFirstOrThrow({
      where: {
        userName,
      },
    })

    if (!user.providers.some((_provider) => _provider.name === provider.name)) {
      return NextResponse.json({ error: 'no provider found' }, { status: 404 })
    }

    const providers = user.providers.filter(
      (_provider) => _provider.name !== provider.name,
    )
    if (providers.length === 0) {
      return NextResponse.json(
        { error: 'user need to have at least a provider' },
        { status: 400 },
      )
    }
    user.providers = providers
    const { id, ...rest } = user

    const result = await prisma.users.update({
      data: rest,
      where: { userName },
    })
    return NextResponse.json(result)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: error?.meta?.cause || 'user not found' },
          { status: 404 },
        )
      }
    }

    console.error({ 'API Users Error': error })
    return NextResponse.json({ error: 'failed to delete' }, { status: 500 })
  }
}

export { putHandler as PUT, patchHandler as PATCH, delHandler as DELETE }
