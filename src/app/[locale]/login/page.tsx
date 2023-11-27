import { getTranslations } from 'next-intl/server'

import Login from '@/components/organisms/login/Login'

export const generateMetadata = async () => {
  const t = await getTranslations('Login')

  return {
    title: t('title'),
  }
}

const LoginPage = () => {
  return (
    <>
      <Login />
    </>
  )
}
export default LoginPage
