import { useState, useEffect } from 'react'

export function useFetch(url) {
  const [data, setData] = useState(null)

  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  let raw = JSON.stringify({
    locale: 'en-US',
    date: '2023-02-24',
  })

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  }

  useEffect(() => {
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.log('error', error))
  }, [])

  return { data }
}
