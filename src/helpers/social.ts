type ShareProps = {
  url: string
}

export const shareToLinkedIn = ({ url }: ShareProps) => {
  const linkedInBaseURL = 'https://www.linkedIn.com/sharing/share-offsite'
  const linkedInURL = new URL(linkedInBaseURL)
  linkedInURL.searchParams.append('url', url)
  return linkedInURL.href
}

export const shareToFacebook = ({ url }: ShareProps) => {
  const facebookBaseURL = 'https://www.facebook.com/sharer.php'
  const facebookURL = new URL(facebookBaseURL)
  facebookURL.searchParams.append('u', url)
  return facebookURL.href
}

type TwitterProps = ShareProps & {
  text: string
  hashtags?: string[]
}

export const shareToTwitter = ({ url, text, hashtags }: TwitterProps) => {
  const twitterBaseURL = 'https://twitter.com/intent/tweet'
  const twitterURL = new URL(twitterBaseURL)
  twitterURL.searchParams.append('url', url)

  twitterURL.searchParams.append('text', text)
  if (hashtags) twitterURL.searchParams.append('hashtags', hashtags.toString())

  return twitterURL.href
}
