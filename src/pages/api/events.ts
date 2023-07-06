import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";

const getAllEvents = async (res: NextApiResponse) => {
    const events = await prisma.events.findMany();
    res.status(200).json(events);
}

const getEventById = async (id: string, res: NextApiResponse) => {
    const eventById = await prisma.events.findUnique({
        where: { id }
    })
    return res.status(200).json(eventById);
}

const getEventsByUserName = async (userName: string, res: NextApiResponse) => {
    const eventsByUserName = await prisma.events.findMany({
        where: {
            author: {
                userName
            }
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
            author: {
                select: {
                    userName: true
                }
            }
        }
    })
    return res.status(200).json(eventsByUserName)
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                await getAllEvents(res);
                break

            case 'POST':
                const { id, userName } = req.body || {}
                if (!id && !userName){
                    res.status(400).send({ error: 'not valid parameters' })
                }

                if (id) await getEventById(id, res)
                if (userName) await getEventsByUserName(userName, res)
                break

            default:
                res.status(400).send({ error: 'bad request' })
                break
        }

    } catch (err) {
        console.error({'API Events Error': err})
        res.status(500).send({ error: 'failed to fetch data' })
    }
}

export default handler
