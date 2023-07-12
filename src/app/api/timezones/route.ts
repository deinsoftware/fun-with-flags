import { NextResponse } from 'next/server'
import { prisma } from '@/utils/prisma'

import { Locale } from '@/shared/types/locale.types'
import { Countries } from '@/shared/types/countries.types'
import { FlagCountry } from '@/helpers/flags.types'

import { getRegionNames } from '@/helpers/dates'
import { calcOffset } from '@/helpers/flags'

const handler = async (request: Request) => {
  try {
    let locale = 'en-US'
    let date = new Date().toISOString()

    const contentType = request.headers.get('content-type')
    const contentLength = request.headers.get('content-length')
    if (contentType === 'application/json' && contentLength !== '0') {
      const body = await request.json()
      if (body.locale) locale = body.locale
      if (body.date) date = body.date
    }

    const result = (await prisma.timeZones.findMany({
      orderBy: {
        countryCode: 'asc',
      },
    })) as FlagCountry[]
    const timeZones = result.map((country) => {
      const { id, countryCode, timeZone } = country
      const regionName = getRegionNames(
        country.countryCode as Countries,
        locale as Locale,
      )
      const zoneList = calcOffset(timeZone, new Date(date))
      zoneList.sort((a, z) => a.offset - z.offset)
      return { id, countryCode, regionName, timeZone: zoneList }
    })

    return NextResponse.json(timeZones)
  } catch (error) {
    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to fetch data' }, { status: 500 })
  }
}

export { handler as POST }
