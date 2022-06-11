import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars';


function DisplayInfo({ data }) {
  return (
    <>
      <div id="movieDiv">
        <div id='poster'>
          <img src={data["Poster"]} alt="Movie Poster" />
        </div>
        <Scrollbars style={{ height: "inherit" }}>
          <div id='info'>
            {
              (data && Object.keys(data).map((k, i) => {
                return <p key={i}><strong>{k}</strong>: {data[k]}</p>
              }))
            }
          </div>
        </Scrollbars>
      </div>
    </>
  )
}

export default DisplayInfo