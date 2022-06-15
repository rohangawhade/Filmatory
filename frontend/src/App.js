import React, { useState } from 'react'
import Heading from './Components/Heading';
import SearchMovie from './Components/SearchMovie';
import DisplayInfo from './Components/DisplayInfo';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import movie from "./assets/movie2.gif";
import DisplayRecommend from './Components/DisplayRecommend';

function App() {
  const [data, setData] = useState();
  const [dispGIF, setGIF] = useState(true);
  const [movieData1, setMovieData1] = useState();
  const [movieData2, setMovieData2] = useState();
  const [movieData3, setMovieData3] = useState();
  const [movieData4, setMovieData4] = useState();

  return (
    <>
      <div onClick={e => { setGIF(true); setData(); }}>
        <Heading />
      </div>
      <SearchMovie
        data={data}
        setData={setData}
        setGIF={setGIF}
        setMovieData1={setMovieData1}
        setMovieData2={setMovieData2}
        setMovieData3={setMovieData3}
        setMovieData4={setMovieData4}
      />
      {dispGIF && <img src={movie} style={{ width: '30%', height: '30%', margin: 'auto', display: 'block' }} alt='Movie GIF' />}
      {data && <DisplayInfo data={data} />}
      {movieData4 && <h1  id='headerText' style={{textAlign: "center", margin: "20px"}}>Recommended Movies:</h1>}
      <div className='dispMovie'>
        {movieData1 && <DisplayRecommend movies={movieData1} />}
        {movieData2 && <DisplayRecommend movies={movieData2} />}
      </div>
      <div className='dispMovie'>
        {movieData3 && <DisplayRecommend movies={movieData3} />}
        {movieData4 && <DisplayRecommend movies={movieData4} />}
      </div>
    </>
  )
}

export default App