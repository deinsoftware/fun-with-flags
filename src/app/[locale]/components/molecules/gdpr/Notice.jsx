'use client'

import toast from 'react-hot-toast'

import CookieConsent from 'react-cookie-consent'

import { toastStyle } from '@/libs/react-host-toast-config'

const Notice = () => {
  return (
    <CookieConsent
      enableDeclineButton // Habilitar el botón de declinar
      buttonStyle={{
        color: '#F9FBFC',
        background: '#7E56DA',
        fontSize: '13px',
        fontWeight: 'bold',
      }} // estilos del botón de aceptar
      buttonText="Let's go" // Texto del botón de aceptar
      cookieName="cookie-consent" // Nombre de la cookie
      declineButtonStyle={{
        fontWeight: 'bold',
        color: '#FFFFFF',
        background: '#FF0000',
      }}
      declineButtonText="I decline" // Texto del botón de declinar
      expires={20} // Los días que dura para expirar la cookie
      hideOnDecline={false} // Ocultar al declinar
      location="bottom" // Ubicación - top, bottom
      style={{ background: '#1C1C1C', minHeight: '100px' }} // Estilo del banner
      onDecline={() => {
        toast('Remember that this website needs cookies to create an event', {
          style: toastStyle,
        })
      }}
    >
      This website uses cookies to enhance the user experience.
    </CookieConsent>
  )
}

export default Notice
