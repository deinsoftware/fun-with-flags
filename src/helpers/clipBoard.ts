export function copyText(text: string) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert('Text copied')
    })
    .catch((err) => {
      console.error('Failed to copy text')
    })
}
