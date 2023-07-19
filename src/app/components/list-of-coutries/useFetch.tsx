import { useState, useEffect } from 'react'

export function useFetch(url, locale, date) {
  const [data, setData] = useState(null)

  let myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/json')

  // let body = JSON.stringify({
  //   locale: 'en-US',
  //   date: '2023-02-24',
  // })

  let body = JSON.stringify({
    locale,
    date,
  })

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: body,
    redirect: 'follow',
  }

  useEffect(() => {
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('error', error))
  }, [])

  return { data }
}
