'use client'

import { toast } from 'react-hot-toast'

import { type Dispatch, type KeyboardEvent, type SetStateAction } from 'react'

import styles from './HashtagsInput.module.css'

type Props = {
  hashTags: string[]
  setHashTags: Dispatch<SetStateAction<string[]>>
}

const Hashtags = ({ hashTags, setHashTags }: Props) => {
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      const target = event.target as HTMLInputElement
      let hashTag = target.value.trim()

      if (!hashTag) return
      if (hashTag.charAt(0) === '#') {
        hashTag = hashTag.slice(1)
      }

      const regExp = /[^A-Za-z0-9#]/
      if (regExp.test(hashTag)) {
        return toast('Special characters are not allowed')
      }

      if (hashTag.includes(' ')) {
        return toast('Spaces are not allowed')
      }
      if (hashTags.includes(hashTag)) {
        return toast('Hashtag already exists')
      }

      setHashTags((prev: string[]) => [...prev, hashTag])
      return ((target.value as string | null) = null)
    }
  }

  const removeTag = (tag: string) => {
    setHashTags(hashTags.filter((t) => t !== tag))
  }

  /* 
  ! we need a better key={} in <span>
  */

  return (
    <>
      <div className={styles['hashtag-container']}>
        <input
          className={styles['hashtag-input']}
          placeholder="#Hashtag"
          type="text"
          onKeyDown={onKeyDown}
        />

        {hashTags.length > 0 && (
          <div className={styles['tags-container']}>
            {hashTags.map((hashTag) => (
              <span
                key={hashTag}
                className={styles['tag']}
                onClick={() => removeTag(hashTag)}
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
