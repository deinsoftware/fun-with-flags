import { getTranslator } from 'next-intl/server'

import Login from '@/components/organisms/login/Login'
import { MetadataProps } from '@/app/layout.types'

export const generateMetadata = async ({
  params: { locale },
}: MetadataProps) => {
  const t = await getTranslator(locale, 'Login')

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
