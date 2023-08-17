import React from 'react'

type Props<T> = {
  fn: () => void
  time: number
  deps: T
}

export default function useDebounce<T>({ fn, time, deps }: Props<T>) {
  const initialized = React.useRef<boolean>()

  React.useEffect(() => {
    if (!initialized.current) {
      initialized.current = true
      return
    }

    const interval = setTimeout(fn, time)

    return () => clearTimeout(interval)
  }, [fn, time, deps])
}
