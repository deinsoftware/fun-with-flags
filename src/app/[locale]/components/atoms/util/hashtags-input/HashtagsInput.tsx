'use client'

import { useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'
import { type KeyboardEvent, useState } from 'react'

import { X } from 'lucide-react'

import styles from './HashtagsInput.module.css'

import { lucidIconsHashtags } from '@/libs/icon-config'

type Props = {
  hashTagsList: string[]
  addHashtag: (tag: string) => void
  removeHashtag: (tag: string) => void
}

const Hashtags = ({ hashTagsList, addHashtag, removeHashtag }: Props) => {
  const t = useTranslations('Hashtags')

  const initialState = ''
  const [tag, setTag] = useState(initialState)

  const validateHashTag = (hashTag: string) => {
    let trimmedHashTag = hashTag.trim().replaceAll('#', '')

    if (trimmedHashTag.includes(' ')) {
      return t('Form.Error.Validation.spaces')
    }

    const regExp = /[^A-Za-z0-9#]/
    if (regExp.test(trimmedHashTag)) {
      return t('Form.Error.Validation.special')
    }

    if (hashTagsList.includes(trimmedHashTag)) {
      return t('Form.Error.Validation.existent')
    }

    return null
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    let hashTag = target.value.trim().replaceAll('#', '')

    if (event.key === 'Enter' && hashTag) {
      const validationError = validateHashTag(hashTag)
      if (validationError) {
        return toast(validationError)
      }

      addHashtag(hashTag)
      setTag(initialState)
    }
  }

  const handleClick = (tag: string) => {
    let hashTag = tag.trim().replaceAll('#', '')

    const validationError = validateHashTag(hashTag)
    if (validationError) {
      return toast(validationError)
    }

    addHashtag(hashTag)
    setTag(initialState)
  }

  return (
    <>
      <div className={styles['hashtag-container']}>
        <div className={styles['actions']}>
          <input
            className={styles['hashtag-input']}
            placeholder={t('Form.Fields.input')}
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            onKeyDown={onKeyDown}
          />
          <button
            className={styles['add-hashtag']}
            type="button"
            onClick={() => handleClick(tag)}
          >
            {t('Form.Button.add')}
          </button>
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
