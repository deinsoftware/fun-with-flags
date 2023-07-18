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

  const twitterURL = new URL(twitterBaseURL)

  twitterURL.searchParams.append('url', url)

  if (text.length > 140) {
    text = text.substring(0, 137) + '...'
  }
  twitterURL.searchParams.append('text', text)
  if (hashtags) twitterURL.searchParams.append('hashtags', hashtags.toString())

  return { twitter: twitterURL.href }
}
