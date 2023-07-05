import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/utils/prisma"

import { Locale } from '@/shared/types/locale.types'
import { Countries } from "@/shared/types/countries.types"
import { FlagCountry } from "@/helpers/flags.types"

import { getRegionNames } from "@/helpers/dates"
import { calcOffset } from "@/helpers/flags"

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const { locale = 'en-US', date = new Date().toISOString() } = req.body || {}

        const result = await prisma.timeZones.findMany() as FlagCountry[]
        const timeZones = result.map(country => {
            const {id, countryCode, timeZone} = country
            const regionName = getRegionNames(country.countryCode as Countries, locale as Locale)
            const zoneList = calcOffset(timeZone, new Date(date))
            return {id, countryCode, regionName, timeZone: zoneList}
        })

        res.status(200).json(timeZones)
    } catch (err) {
        res.status(500).send({ error: 'failed to fetch data' })
    }
}

export default handler