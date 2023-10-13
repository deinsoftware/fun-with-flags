'use client'

import { useTranslations } from 'next-intl'

import CookieConsent from 'react-cookie-consent'

import Link from 'next/link'

import styles from './Notice.module.css'

const Notice = () => {
  const t = useTranslations('Notice')

  return (
    <CookieConsent
      buttonStyle={{
        color: '#F9FBFC',
        background: '#7E56DA',
        fontSize: '13px',
        fontWeight: 'bold',
      }} // estilos del botón de aceptar
      buttonText={t('CookieConsent.Button.agree')} // Texto del botón de aceptar
      cookieName="cookie-consent" // Nombre de la cookie
      expires={30} // Los días que dura para expirar la cookie
      hideOnDecline={true} // Ocultar al declinar
      location="bottom" // Ubicación - top, bottom
      overlay={true}
      overlayStyle={{ background: '#00000095' }} // Estilo del overlay
      style={{
        background: '#1C1C1C',
        minHeight: '80px',
        fontSize: 'var(--font-size-sm)',
      }} // Estilo del banner
    >
      <strong>{`${t('CookieConsent.intro')}. `}</strong>
      {`${t('CookieConsent.notice')} `}
      <Link className={styles['helper-text-link']} href="/legal">
        {`${t('CookieConsent.link')}.`}
      </Link>
    </CookieConsent>
  )
}

export default Notice
