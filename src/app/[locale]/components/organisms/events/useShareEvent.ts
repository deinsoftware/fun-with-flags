import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'

import { FormData } from './CreateEvent.types'

import { copyTextToClipboard } from '@/helpers/navigator'
import { shareToTwitter } from '@/helpers/social'
import { toastStyle } from '@/libs/react-host-toast-config'

type TextProps = Pick<FormData, 'eventName' | 'eventDescription' | 'combo'> &
  Partial<Pick<FormData, 'eventLink' | 'hashtags'>>

const getEventText = ({
  eventName,
  eventDescription,
  combo,
  eventLink,
  hashtags,
}: TextProps) => {
  let text = `${eventName.trim()}\n`
  if (eventDescription && eventDescription.trim()) {
    text += `\n${eventDescription.trim()}\n`
  }
  if (combo && combo.trim()) {
    text += `\n${combo.trim()}\n`
  }
  if (eventLink && eventLink.trim()) {
    text += `\n${eventLink.trim()}\n`
  }

  if (Array.isArray(hashtags)) {
    const tags = hashtags.map((tag) => `#${tag}`).join(' ')
    text += `\n${tags}`
  }

  return text
}

type Props = {
  formData: FormData
}

export const useShareEvent = ({ formData }: Props) => {
  const t = useTranslations('Events.Create')

  const { eventName, eventDescription, combo, eventLink, hashtags } =
    formData ?? {}

  const handleShareEventOnTwitter = () => {
    const text = getEventText({ eventName, eventDescription, combo })

    const url = shareToTwitter({
      text,
      url: `\n${eventLink}\n\n`,
      hashtags: hashtags,
    })
    window.open(url, '_blank')
  }

  const handleCopyToClipboard = async () => {
    const text = getEventText({
      eventName,
      eventDescription,
      combo,
      eventLink,
      hashtags,
    })
    const result = await copyTextToClipboard(text)

    if (result) {
      toast.success(t('Toast.copiedToClipboard'), {
        style: toastStyle,
      })
    } else {
      toast.error(t('Toast.copiedToClipboardError'), {
        style: toastStyle,
      })
    }
  }

  return {
    handleShareEventOnTwitter,
    handleCopyToClipboard,
  }
}
