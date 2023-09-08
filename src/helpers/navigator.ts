export async function copyTextToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy text')
    return false
  }
}
