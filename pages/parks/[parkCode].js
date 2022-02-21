/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function Park({data}) {
  if (data)
    return (
      <>
        <h1>Data has loaded</h1>
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        <img
          src={data?.images[0].url}
          alt={data?.images[0].altText}
          style={{width: '200px'}}
        />
      </>
    )
  else return <div>Loading...</div>
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  }
}

export async function getStaticProps({params}) {
  //  Set the base URL for the API
  const URL = 'https://developer.nps.gov/api/v1/'

  // Set data to null to handle errors
  let data = null

  try {
    // Call API Data for /PARK
    const res = await fetch(
      `${URL}parks?parkCode=${params?.parkCode}&limit=465&api_key=${process.env.NPS_API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent': '*',
        },
      }
    )

    data = await res.json()
    data = data.data[0]
    data = {
      name: data.fullName,
      description: data.description,
      images: data.images,
    }
  } catch (err) {}

  return {
    props: {
      data,
    },
  }
}
