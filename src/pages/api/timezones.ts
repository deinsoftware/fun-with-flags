import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";

import { Locale } from "@/shared/types/locale.types";
import { Countries } from "@/shared/types/countries.types";
import { Country } from "@/shared/types/zones.types";

import { getRegionNames } from "@/helpers/date-time";
import { calcOffset } from "@/helpers/flags";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const locale: Locale = Intl.DateTimeFormat().resolvedOptions().locale as Locale || 'en-US'

        const result = await prisma.timeZones.findMany() as Country[]
        const timeZones = result.map(country => {
            const {id, countryCode, timeZone} = country
            const regionName = getRegionNames(locale, country.countryCode as Countries)
            const zoneList = calcOffset(new Date(), timeZone)
            return {id, countryCode, regionName, timeZone: zoneList}
        })
        res.status(200).json(timeZones)
    } catch (err) {
        res.status(500).send({ error: 'failed to fetch data' });
    }
}

export default handler