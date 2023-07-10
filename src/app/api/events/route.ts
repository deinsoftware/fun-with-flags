import { NextResponse } from 'next/server'
import { Prisma } from '@prisma/client'
import prisma from '@/utils/prisma'
import type { Events } from '@prisma/client'

const getEventById = async (id: string) => {
  const eventById = await prisma.events.findUnique({
    where: { id },
  })
  return NextResponse.json(eventById)
}

const eventsSelect: Prisma.EventsSelect = {
  id: true,
  description: true,
  img: true,
  lang: true,
  name: true,
  tags: true,
  timeZone: true,
  createdAt: true,
  updatedAt: true,
  url: true,
  userId: false,

  Users: {
    select: {
      userName: true,
    },
  },
}

const getEventsByUserName = async (userName: string) => {
  const eventsByUserName = await prisma.events.findMany({
    where: {
      Users: {
        userName,
      },
    },
    select: eventsSelect,
  })
  return NextResponse.json(eventsByUserName)
}

const getHandler = async () => {
  try {
    const events = await prisma.events.findMany()
    return NextResponse.json(events)
  } catch (error) {
    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to fetch data' }, { status: 500 })
  }
}

const postHandler = async (request: Request) => {
  try {
    const { id, userName } = (await request.json()) || {}
    if (!id && !userName) {
      return NextResponse.json(
        { error: 'not valid body parameters' },
        { status: 400 },
      )
    }

    if (id) {
      return await getEventById(id)
    }
    if (userName) {
      return await getEventsByUserName(userName)
    }

    return NextResponse.json({ error: 'bad request' }, { status: 400 })
  } catch (error) {
    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to fetch data' }, { status: 500 })
  }
}

const putHandler = async (request: Request) => {
  try {
    const { userName, ...rest } = (await request.json()) || {}
    const data: Events = {
      ...rest,
      Users: {
        connect: {
          userName,
        },
      },
    }

    const event = await prisma.events.create({
      data,
      select: eventsSelect,
    })
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to create' }, { status: 501 })
  }
}

const patchHandler = async (request: Request) => {
  try {
    const { id, ...rest } = (await request.json()) || {}
    const data: Events = {
      ...rest,
    }

    const event = await prisma.events.update({
      data,
      where: { id },
      select: eventsSelect,
    })
    return NextResponse.json(event, { status: 201 })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'event not found' }, { status: 404 })
      }
    }

    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to create' }, { status: 501 })
  }
}

const delHandler = async (request: Request) => {
  try {
    const { id } = (await request.json()) || {}
    if (!id) {
      return NextResponse.json(
        { error: 'not valid body parameters' },
        { status: 400 },
      )
    }

    const event = await prisma.events.delete({
      where: {
        id,
      },
      select: eventsSelect,
    })
    return NextResponse.json(event)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json({ error: 'event not found' }, { status: 404 })
      }
    }

    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to delete' }, { status: 501 })
  }
}

export {
  getHandler as GET,
  postHandler as POST,
  putHandler as PUT,
  patchHandler as PATCH,
  delHandler as DELETE,
}
