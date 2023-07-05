import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/utils/prisma'

import { Providers } from '@/shared/types/providers.types'

const getUser = async (
  provider: Providers,
  user: string,
  res: NextApiResponse
) => {
  const userByProvider = await prisma.users.findFirst({
    where: {
      providers: {
        name: provider,
        user: user,
      },
    },
    select: {
      userName: true,
    },
  })
  return res.status(200).json(userByProvider)
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { provider, user } = req.body || {}
    if (!provider && !user) {
      res.status(400).send({ error: 'not valid parameters' })
    }

    await getUser(provider, user, res)
  } catch (err) {
    console.error({ 'API Events Error': err })
    res.status(500).send({ error: 'failed to fetch data' })
  }
}

export default handler
