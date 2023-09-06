'use client'

import { toast } from 'react-hot-toast'

type Props = {
  handleAccept: () => any /* <- pls, no */
  handleReject: () => any /* <- pls, no */
}

const ToastAlertMessage = ({ handleAccept, handleReject }: Props) => {
  toast.loading(
    (t) => (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <p>¿Desea cargar los últimos cambios?</p> {/* <- add i18n */}
        <div style={{ display: 'flex', width: '100%', gap: '0.5rem' }}>
          <button
            style={{ width: '50%' }}
            onClick={() => {
              toast.dismiss(t.id)
              toast.success('Vacío') /* <- add i18n */
              return handleReject()
            }}
          >
            Rechazar
          </button>
          <button
            style={{ width: '50%' }}
            onClick={() => {
              toast.dismiss(t.id)
              toast.success('Se aceptaron') /* <- add i18n */
              return handleAccept()
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    ),
    {
      // icon: "❓",
    },
  )
}

export default ToastAlertMessage
