import React, { useState } from 'react'
import Heading from './Components/Heading';
import SearchMovie from './Components/SearchMovie';
import DisplayInfo from './Components/DisplayInfo';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';
import movie2 from "./assets/movie2.gif";

function App() {
  const [data, setData] = useState();
  const [dispGIF, setGIF] = useState(true);

  return (
    <>
    <div onClick={e => {setGIF(true); setData();}}>
      <Heading />
    </div>
      <SearchMovie data={data} setData={setData} setGIF={setGIF} />
      {dispGIF && <img src={movie2} style={{ width: '30%', height: '30%', margin: 'auto', display: 'block' }} alt='Movie GIF' />}
      {data && <DisplayInfo data={data} />}
    </>
  )
}

export default App