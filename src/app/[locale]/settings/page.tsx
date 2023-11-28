import { getTranslations } from 'next-intl/server'

export const generateMetadata = async () => {
  const t = await getTranslations('Settings')

  return {
    title: t('title'),
  }
}

const SettingsPage = () => {
  return <></>
}

export default SettingsPage
