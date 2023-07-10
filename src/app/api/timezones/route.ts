import { NextResponse } from 'next/server'
import prisma from '@/utils/prisma'

import { Locale } from '@/shared/types/locale.types'
import { Countries } from '@/shared/types/countries.types'
import { FlagCountry } from '@/helpers/flags.types'

import { getRegionNames } from '@/helpers/dates'
import { calcOffset } from '@/helpers/flags'

const handler = async (request: Request) => {
  try {
    const { locale = 'en-US', date = new Date().toISOString() } =
      (await request.json()) || {}

    const result = (await prisma.timeZones.findMany()) as FlagCountry[]
    const timeZones = result.map((country) => {
      const { id, countryCode, timeZone } = country
      const regionName = getRegionNames(
        country.countryCode as Countries,
        locale as Locale,
      )
      const zoneList = calcOffset(timeZone, new Date(date))
      return { id, countryCode, regionName, timeZone: zoneList }
    })

    return NextResponse.json(timeZones)
  } catch (error) {
    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to fetch data' }, { status: 500 })
  }
}

export { handler as POST }
