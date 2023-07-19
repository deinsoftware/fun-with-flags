import { NextResponse } from 'next/server'
import { prisma } from '@/libs/prisma'

const handler = async (
  request: Request,
  { params }: { params: { userName: string } },
) => {
  try {
    const { userName } = params || ''
    if (!userName) {
      return NextResponse.json(
        { error: 'not valid body parameters' },
        { status: 400 },
      )
    }

    const user = await prisma.users.findUnique({
      where: { userName },
    })

    if (!user) {
      return NextResponse.json({ error: 'user not found' }, { status: 404 })
    }
    return NextResponse.json(user)
  } catch (error) {
    console.error({ 'API Events Error': error })
    return NextResponse.json({ error: 'failed to fetch data' }, { status: 500 })
  }
}

export { handler as GET }
