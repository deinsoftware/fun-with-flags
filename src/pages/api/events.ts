import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/utils/prisma";

const getAll = async (res: NextApiResponse) => {
    const events = await prisma.events.findMany();
    res.status(200).json(events);
}

const getById = async (id: string, res: NextApiResponse) => {
    const eventById = await prisma.events.findUnique({
        where: { id }
    });
    return res.status(200).json(eventById);
}

const getByUserName = async (userName: string, res: NextApiResponse) => {
    const eventByUserName = await prisma.events.findMany({
        where: { userName }
    });
    res.status(200).json(eventByUserName);
}


const handler = async (
    req: NextApiRequest,
    res: NextApiResponse) => {
    try {
        switch (req.method) {
            case 'GET':
                await getAll(res);
                break

            case 'POST':
                const { id, userName } = req.body || {}
                if (!id && !userName){
                    res.status(400).send({ error: 'not valid parameters' })
                }
                if (id) await getById(id, res)
                if (userName) await getByUserName(userName, res)
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





