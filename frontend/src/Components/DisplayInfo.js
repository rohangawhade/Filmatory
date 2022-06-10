import React from 'react'

function DisplayInfo({ data }) {
  return (
    <>
      <div id="movieDiv">
        <div id='poster'>
          <img src={data["Poster"]} alt="Movie Poster" />
        </div>
        <div id='info'>
          {
            (data && Object.keys(data).map((k, i) => {
              return <p key={i}><strong>{k}</strong>: {data[k]}</p>
            }))
          }
        </div>
      </div>
    </>
  )
}

export default DisplayInfo