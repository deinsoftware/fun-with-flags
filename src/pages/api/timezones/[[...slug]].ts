import { NextApiRequest, NextApiResponse } from "next"
import prisma from "@/utils/prisma"

import { Locale } from "@/shared/types/locale.types"
import { Countries } from "@/shared/types/countries.types"
import { Country } from "@/shared/types/zones.types"

import { getRegionNames } from "@/helpers/date-time"
import { calcOffset } from "@/helpers/flags"

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const { slug } = req.query
        let locale: Locale = 'en-US'
        let date = new Date()

        if (slug && Array.isArray(slug)){
            const [_locale, _date] = slug
            if (_locale) {
                locale = _locale as Locale
            }

            if (_date) {
                date = new Date(_date)
            }
        }

        const result = await prisma.timeZones.findMany() as Country[]
        const timeZones = result.map(country => {
            const {id, countryCode, timeZone} = country
            const regionName = getRegionNames(country.countryCode as Countries, locale)
            const zoneList = calcOffset(date, timeZone)
            return {id, countryCode, regionName, timeZone: zoneList}
        })
        res.status(200).json(timeZones)
    } catch (err) {
        res.status(500).send({ error: 'failed to fetch data' });
    }
}

export default handler