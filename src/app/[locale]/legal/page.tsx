import { useTranslations } from 'next-intl'
import { getTranslator } from 'next-intl/server'

import styles from './page.module.css'

import ButtonBack from '@/components/atoms/ui/ButtonBack'

import Subtitle from '@/components/atoms/ui/Subtitle'

import { MetadataProps } from '@/app/layout.types'

export const generateMetadata = async ({
  params: { locale },
}: MetadataProps) => {
  const t = await getTranslator(locale, 'Notice')

  return {
    title: t('title'),
  }
}

const CreateEventPage = () => {
  const t = useTranslations('Notice')

  return (
    <>
      <main className={styles['container']}>
        <section className={styles['section']}>
          <Subtitle>{t('Page.Privacy.title')}</Subtitle>

          {t.rich('Page.Privacy.policy', {
            paragraph: (chunks) => <p>{chunks}</p>,
          })}
        </section>

        <section className={styles['section']}>
          <Subtitle>{t('Page.Cookie.title')}</Subtitle>

          {t.rich('Page.Cookie.notice', {
            paragraph: (chunks) => <p>{chunks}</p>,
          })}
        </section>

        <section className={styles['section']}>
          <Subtitle>{t('Page.Legal.title')}</Subtitle>

          {t.rich('Page.Legal.notice', {
            paragraph: (chunks) => <p>{chunks}</p>,
          })}
        </section>

        <ButtonBack />
      </main>
    </>
  )
}
export default CreateEventPage
