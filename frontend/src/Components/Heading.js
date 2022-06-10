import React from 'react'
import movieImage from "../assets/movieImage.png";


function Heading() {
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-evenly'}}>
      <img src={movieImage} style={{width: '150px'}} alt="Movie Maquire" />
      <h2>Movie Maguire</h2>
    </div>
  )
}

export default Heading