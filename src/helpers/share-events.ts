export const shareEventsTwitter = ({
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

  return twitterURL.href
}

export const shareEventsLinkedin = ({ url }: { url: string }) => {
  const linkedinBaseURL = 'https://www.linkedin.com/sharing/share-offsite'
  const linkedinURL = new URL(linkedinBaseURL)
  linkedinURL.searchParams.append('url', url)
  return linkedinURL.href
}

export const shareEventsFacebook = ({ url }: { url: string }) => {
  const facebookBaseURL = 'https://www.facebook.com/sharer.php'
  const facebookURL = new URL(facebookBaseURL)
  facebookURL.searchParams.append('u', url)
  return facebookURL.href
}
