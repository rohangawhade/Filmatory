import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Suggestion from './Suggestion';

function SearchMovie({ data, movieData, setData, setGIF, setMovieData1, setMovieData2, setMovieData3, setMovieData4 }) {

  const [suggest, setSuggest] = useState();
  const [err, setErr] = useState(false);

  if(err){
    setMovieData1();
    setMovieData2();
    setMovieData3();
    setMovieData4();
  }

  async function GetMovieData(movieName) {
    for(let i=0; i<4; i=i+1){
      let apiData = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&t=${movieName[i]}`);
      apiData = await apiData.json();
      const dict = {}
      console.log(apiData);
      dict['Title'] = apiData.Title;
      dict['Plot'] = apiData.Plot;
      dict['Poster'] = apiData.Poster;
      dict['Released'] = apiData.Released;
      if(i === 0){setMovieData1(dict)}
      else if(i === 1){setMovieData2(dict)}
      else if(i === 2){setMovieData3(dict)}
      else if(i === 3){setMovieData4(dict)}
    }
    // let arr = []
    // movieName.map(async (k, i) => {
    //   console.log("inside");
    //   let apiData = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&t=${k}`);
    //   apiData = await apiData.json();
    //   const dict = {}
    //   dict['Title'] = apiData.Title
    //   dict['Plot'] = apiData.Plot
    //   dict['Poster'] = apiData.Poster
    //   dict['Released'] = apiData.Released
    //   arr.push(dict);
    // })
    // console.log(arr);
    // setMovieData(arr);
  }

  async function getData(movieName) {
    setGIF(false);
    let apiData = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&t=${movieName}`);
    apiData = await apiData.json();
    if (apiData.Response === "True") {
      delete apiData.Ratings;
      setData(apiData);

      try {
        let res = await fetch(" http://127.0.0.1:5000/recommend", {
          method: "POST",
          body: JSON.stringify(apiData),
          headers: {
            'Content-Type': 'application/json'
          }
        });
        let resJson = await res.json();
        await GetMovieData(resJson.response);
        console.log(`Recommended Movies: ${resJson['response']}`);
      } catch (error) {
        console.log(error);
      }

      setErr(false);
      document.getElementById("movieInput").value = "";
      setSuggest();
    }
    else {
      setErr(true);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    setData();
    getData(e.target[0].value);
  }

  function callConsole(e) {
    getData(e.target.innerText);
  }
  return (
    <>
      <div id="formData">
        <Form onSubmit={onSubmit} >
          <Form.Group className="mb-3 lg-2" >
            <Form.Control type="text" id="movieInput" placeholder='Enter Movie' onChange={e => { setSuggest(e.target.value) }} />
          </Form.Group>
          <div>
            {
              suggest &&
              <ListGroup id="suggestion" onClick={e => callConsole(e)}>
                <Suggestion suggest={suggest} />
              </ListGroup>
            }

          </div>
          <Button className='buttons' variant="dark" type="submit">Search</Button>
        </Form>
      </div>
      {
        err ? <h4 style={{ margin: "auto", display: "table" }}>No such movie found! Try again</h4> : <></>
      }

    </>
  )
}

export default SearchMovie