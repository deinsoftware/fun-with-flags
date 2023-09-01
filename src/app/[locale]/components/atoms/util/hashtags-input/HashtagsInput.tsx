'use client'

import { useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'

import { type KeyboardEvent, useState } from 'react'

import styles from './HashtagsInput.module.css'

type Props = {
  hashTagsList: string[]
  addHashtag: (tag: string) => void
  removeHashtag: (tag: string) => void
}

const Hashtags = ({ hashTagsList, addHashtag, removeHashtag }: Props) => {
  const t = useTranslations('Events.Create')

  const initialState = ''
  const [tag, setTag] = useState(initialState)

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement
    let hashTag = target.value.trim().replaceAll('#', '')

    if (event.key === 'Enter' && hashTag) {
      if (hashTag.includes(' ')) {
        return toast('Spaces are not allowed')
      }

      const regExp = /[^A-Za-z0-9#]/
      if (regExp.test(hashTag)) {
        return toast('Special characters are not allowed')
      }

      if (hashTagsList.includes(hashTag)) {
        return toast('Hashtag already exists')
      }

      addHashtag(hashTag)
      setTag(initialState)
    }
  }

  return (
    <>
      <div className={styles['hashtag-container']}>
        <input
          className={styles['hashtag-input']}
          placeholder={t('Form.Fields.hashtags')}
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyDown={onKeyDown}
        />

        {hashTagsList.length > 0 && (
          <div className={styles['tags-container']}>
            {hashTagsList.map((hashTag) => (
              <span
                key={hashTag}
                className={styles['tag']}
                onClick={() => removeHashtag(hashTag)}
              >
                {`#${hashTag}`}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Hashtags
