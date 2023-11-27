import { getTranslations } from 'next-intl/server'

import { MetadataProps } from '@/app/layout.types'

export const generateMetadata = async ({
  params: { locale },
}: MetadataProps) => {
  const t = await getTranslations('Settings')

  return {
    title: t('title'),
  }
}

const SettingsPage = () => {
  return <></>
}

export default SettingsPage
