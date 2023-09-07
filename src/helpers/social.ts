type Props = {
  url: string
  text: string
  hashtags?: string[]
}

export const shareToTwitter = ({ url, text, hashtags }: Props) => {
  const twitterBaseURL = 'https://twitter.com/intent/tweet'

  const twitterURL = new URL(twitterBaseURL)

  twitterURL.searchParams.append('url', url)

  twitterURL.searchParams.append('text', text)
  if (hashtags) twitterURL.searchParams.append('hashtags', hashtags.toString())

  return twitterURL.href
}

export const shareToLinkedin = ({ url }: { url: string }) => {
  const linkedinBaseURL = 'https://www.linkedin.com/sharing/share-offsite'
  const linkedinURL = new URL(linkedinBaseURL)
  linkedinURL.searchParams.append('url', url)
  return linkedinURL.href
}

export const shareToFacebook = ({ url }: { url: string }) => {
  const facebookBaseURL = 'https://www.facebook.com/sharer.php'
  const facebookURL = new URL(facebookBaseURL)
  facebookURL.searchParams.append('u', url)
  return facebookURL.href
}
