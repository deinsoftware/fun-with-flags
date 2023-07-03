import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        const events = await prisma.events.findMany()
        res.status(200).json(events)
    } catch (err) {
        res.status(500).send({ error: 'failed to fetch data' });
    }
}

export default handler
