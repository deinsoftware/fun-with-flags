import toast from 'react-hot-toast'

import { toastIconTheme, toastStyle } from '@/libs/toast'

type Props = {
  response: {
    ok: boolean
    status: number
  }
  t: (arg0: string, arg1?: { title: string }) => string
  title: string
  description?: string
}

export const showResponseResult = ({
  response: { ok, status = 500 },
  t,
  title,
  description,
}: Props) => {
  const message = t(`${status}`, { title })
  //Todo: change iconTheme only on success
  toast[ok ? 'success' : 'error'](message, {
    style: toastStyle,
    iconTheme: toastIconTheme,
  })
}
