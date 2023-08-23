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
      const hashTag = event.target.value.trim()

      if (!hashTag) return
      if (hashTag.includes(' ')) {
        return toast('Spaces are not allowed')
      }
      if (hashTags.includes(hashTag)) {
        toast('Hashtag already exists')
        return (event.target.value = null)
      }

      setHashTags((prev: string[]) => [...prev, hashTag])
      event.target.value = null
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
