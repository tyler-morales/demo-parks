/* eslint-disable @next/next/no-img-element */
import React from 'react'

export default function Park({parkInfo}) {
  if (parkInfo)
    return (
      <>
        <h1>Data has loaded</h1>
        <h2>{parkInfo.name}</h2>
        <p>{parkInfo.description}</p>
        <img
          src={parkInfo?.images[0].url}
          alt={parkInfo?.images[0].altText}
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
  let parkInfo = null

  try {
    // Call API Data for /PARK
    const parkData = await fetch(
      `${URL}parks?parkCode=${params?.parkCode}&limit=465&api_key=${process.env.NPS_API_KEY}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'User-Agent': '*',
        },
      }
    )

    parkInfo = await parkData.json()
    parkInfo = parkInfo.data[0]
    parkInfo = {
      name: parkInfo.fullName,
      description: parkInfo.description,
      images: parkInfo.images,
    }
  } catch (err) {}

  return {
    props: {
      parkInfo,
    },
  }
}
