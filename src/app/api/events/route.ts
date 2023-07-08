import { NextResponse } from 'next/server'
import prisma from '@/utils/prisma'

const getEventById = async (id: string) => {
  const eventById = await prisma.events.findUnique({
    where: { id },
  })
  return NextResponse.json(eventById)
}

const getEventsByUserName = async (userName: string) => {
  const eventsByUserName = await prisma.events.findMany({
    where: {
      Users: {
        userName,
      },
    },
    select: {
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
    },
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
        { error: 'not valid parameters' },
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

export { getHandler as GET, postHandler as POST }
