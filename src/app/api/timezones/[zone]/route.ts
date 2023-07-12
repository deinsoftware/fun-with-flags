import { NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'

import { TimeZones } from '@/shared/types/timeZones.types'

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

    const timeZone = await prisma.timeZones.findFirst({
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
    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to fetch data' }, { status: 500 })
  }
}

export { handler as GET }
