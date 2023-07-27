import { NextResponse } from 'next/server'

import { Prisma } from '@prisma/client'

import { prisma } from '@/libs/prisma'

import { TimeZones } from '@/types/timeZones.types'

const handler = async (
  request: Request,
  { params }: { params: { zone: TimeZones } },
) => {
  try {
    const { zone } = params || ''
    if (!zone) {
      return NextResponse.json(
        { error: 'not valid body parameters' },
        { status: 400 },
      )
    }

    const timeZone = await prisma.timeZones.findFirstOrThrow({
      where: {
        timeZone: {
          some: {
            zoneNames: {
              has: zone,
            },
          },
        },
      },
      select: {
        countryCode: true,
      },
    })

    return NextResponse.json(timeZone)
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2025') {
        return NextResponse.json(
          { error: error?.message || 'timezone not found' },
          { status: 404 },
        )
      }
    }

    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to fetch data' }, { status: 500 })
  }
}

export { handler as GET }
