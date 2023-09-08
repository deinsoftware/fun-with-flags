'use client'

import { toast } from 'react-hot-toast'

const ToastAlertMessage = () => {
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
            }}
          >
            Rechazar
          </button>
          <button
            style={{ width: '50%' }}
            onClick={() => {
              toast.dismiss(t.id)
              toast.success('Se aceptaron') /* <- add i18n */
            }}
          >
            Aceptar
          </button>
        </div>
      </div>
    ),
    {
      icon: "❓",
    },
  )
}

export default ToastAlertMessage
