'use client'

import { useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'
import { type KeyboardEvent, useState } from 'react'

import { X } from 'lucide-react'

import styles from './Hashtags.module.css'

import { lucidIconsHashtags } from '@/libs/icon-config'
import Button from '@/components/atoms/ui/Button'

type Props = {
  hashTagsList: string[]
  addHashtag: (tag: string) => void
  removeHashtag: (tag: string) => void
}

const Hashtags = ({ hashTagsList, addHashtag, removeHashtag }: Props) => {
  const t = useTranslations('Hashtags')

  const initialState = ''
  const [tag, setTag] = useState(initialState)

  const validateHashTag = (tag: string) => {
    if (tag.includes(' ')) {
      return t('Form.Error.Validation.spaces')
    }

    const regExp = /[^A-Za-z0-9#]/
    if (regExp.test(tag)) {
      return t('Form.Error.Validation.special')
    }

    if (hashTagsList.includes(tag)) {
      return t('Form.Error.Validation.existent', { tag })
    }

    return null
  }

  const addTag = (tags: string) => {
    const validationError = tags
      .split(',')
      .filter((tag) => tag.trim())
      .map((tag) => {
        const hashTag = tag.trim().replaceAll('#', '')

        const validationError = validateHashTag(hashTag)
        if (validationError !== null) {
          toast(validationError)
          return tag
        }

        addHashtag(hashTag)
        return null
      })

    if (validationError.some((errorFound) => errorFound)) {
      return setTag(validationError.filter((tag) => tag).join(','))
    }

    setTag(initialState)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    const tags = target.value

    if (event.key === 'Enter' && tags) {
      addTag(tags)
    }
  }

  return (
    <>
      <div className={styles['hashtag-container']}>
        <div className={styles['actions']}>
          <input
            className={styles['hashtag-input']}
            maxLength={50}
            placeholder={`${t('Form.Fields.input')} (${t('Form.Fields.info')})`}
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <Button handleClick={() => addTag(tag)}>
            {t('Form.Button.add')}
          </Button>
        </div>

        {hashTagsList.length > 0 && (
          <div className={styles['tags-container']}>
            {hashTagsList.map((hashTag) => (
              <div key={hashTag} className={styles['tag']}>
                <span className={styles['tag-text']}>{`#${hashTag}`}</span>
                <i
                  className={styles['remove-hashtag-icon']}
                  onClick={() => removeHashtag(hashTag)}
                >
                  <X
                    color={lucidIconsHashtags.color.red}
                    size={lucidIconsHashtags.size}
                  />
                </i>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Hashtags
