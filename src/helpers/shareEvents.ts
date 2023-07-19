const shareEvents = ({
  url,
  text,
  hashtags,
}: {
  url: string
  text: string
  hashtags?: string[]
}) => {
  const twitterBaseURL = 'https://twitter.com/intent/tweet'
  const twitterCharacterLimit = 280

  const twitterURL = new URL(twitterBaseURL)

  twitterURL.searchParams.append('url', url)

  if (text.length > twitterCharacterLimit - url.length) {
    text = text.substring(0, twitterCharacterLimit - url.length - 3) + '...'
  }
  twitterURL.searchParams.append('text', text)
  if (hashtags) twitterURL.searchParams.append('hashtags', hashtags.toString())

  return { twitter: twitterURL.href }
}
