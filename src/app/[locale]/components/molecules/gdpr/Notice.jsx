'use client'

import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

import CookieConsent from 'react-cookie-consent'

import Link from 'next/link'

import styles from './Notice.module.css'

import { toastStyle } from '@/libs/toast'

const Notice = () => {
  const t = useTranslations('Notice')

  return (
    <CookieConsent
      // enableDeclineButton // Habilitar el botón de declinar
      buttonStyle={{
        color: '#F9FBFC',
        background: '#7E56DA',
        fontSize: '13px',
        fontWeight: 'bold',
      }} // estilos del botón de aceptar
      buttonText={t('CookieConsent.Button.agree')} // Texto del botón de aceptar
      cookieName="cookie-consent" // Nombre de la cookie
      declineButtonStyle={{
        fontWeight: 'bold',
        color: '#FFFFFF',
        background: '#FF0000',
      }}
      declineButtonText={t('CookieConsent.Button.decline')} // Texto del botón de declinar
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
      onDecline={() => {
        toast(`${t('CookieConsent.Toast.onDecline')}.`, {
          style: toastStyle,
          duration: 5000,
        })
      }}
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
