'use client'

import { toast } from 'react-hot-toast'

import { type KeyboardEvent } from 'react'

import styles from './HashtagsInput.module.css'

type Props = {
  hashTagsList: string[]
  addHashtag: (tag: string) => void
  removeHashtag: (tag: string) => void
}

const Hashtags = ({ hashTagsList, addHashtag, removeHashtag }: Props) => {
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement
      let hashTag = target.value.trim()

      if (!hashTag) return
      if (hashTag.charAt(0) === '#') {
        hashTag = hashTag.replaceAll('#', '')
      }

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

      return ((hashTag as string | null) = null)
    }
  }

  return (
    <>
      <div className={styles['hashtag-container']}>
        <input
          className={styles['hashtag-input']}
          placeholder="#Hashtag"
          type="text"
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
                {hashTag.charAt(0).includes('#') ? hashTag : `#${hashTag}`}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Hashtags
