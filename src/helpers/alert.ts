import toast from 'react-hot-toast'

import { toastIconTheme, toastStyle } from '@/libs/toast'

type Props = {
  response: {
    ok: boolean
    status: number
  }
  t: (arg0: string, arg1?: { title: string; action?: string }) => string
  title: string
  action?: 'delete' | 'update'
}

export const showResponseResult = ({
  response: { ok, status = 500 },
  t,
  title,
  action,
}: Props) => {
  const message = t(`${status}`, { title, action })
  const options: {
    style: typeof toastStyle
    iconTheme?: typeof toastIconTheme
  } = {
    style: toastStyle,
  }

  if (ok) {
    options.iconTheme = toastIconTheme
  }
  toast[ok ? 'success' : 'error'](message, options)
}
