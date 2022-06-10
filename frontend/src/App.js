import React, { useState } from 'react'
import Heading from './Components/Heading';
import SearchMovie from './Components/SearchMovie';
import DisplayInfo from './Components/DisplayInfo';

import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [data, setData] = useState();
  return (
    <>
      <Heading />
      <SearchMovie data={data} setData={setData} />
      {data && <DisplayInfo data={data}/>}
    </>
  )
}

export default App