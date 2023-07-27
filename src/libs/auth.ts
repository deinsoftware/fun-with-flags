import {
  Account,
  User,
  Session,
  NextAuthOptions,
  DefaultSession,
} from 'next-auth'
import { AdapterUser } from 'next-auth/adapters'
import GoogleProvider from 'next-auth/providers/google'

import { Providers } from '@prisma/client'

import { createUser, getUserByProvider, getUserByUser } from '@/services/users'

const {
  GOOGLE_CLIENT_ID = '',
  GOOGLE_CLIENT_SECRET = '',
  NEXTAUTH_SECRET = '',
} = process?.env || {}

const pages = {
  signIn: '/login',
}

const providers = [
  GoogleProvider({
    clientId: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
  }),
]

const callbacks = {
  async signIn({
    user,
    account,
  }: {
    user: AdapterUser | User
    account: Account | null
  }) {
    try {
      if (!user) {
        return false
      }

      if (account?.provider === 'google') {
        const userProvider = {
          user: user?.email ?? '',
          name: account?.provider as Providers,
        }
        const currentUser = await getUserByProvider(userProvider)
        if (currentUser) {
          return true
        }

        const userName = user?.email?.split('@').shift() ?? ''
        const newUser = {
          userName,
          providers: [userProvider],
        }
        createUser(newUser)
        return true
      }

      return false //other providers are not allowed
    } catch (error) {
      console.error({ 'Login Error': error })
      return false
    }
  },

  async session({ session }: { session: Session | DefaultSession }) {
    const user = session?.user?.email ?? ''
    const currentUser = await getUserByUser(user)
    if (currentUser !== null && !!session?.user) {
      session.user.name = currentUser.userName
    }
    return session
  },
}

export const authOptions: NextAuthOptions = {
  pages,
  providers,
  callbacks,
  secret: NEXTAUTH_SECRET,
}
