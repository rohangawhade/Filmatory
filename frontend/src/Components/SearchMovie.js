import React, { useState, useEffect } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Suggestion from './Suggestion';

function SearchMovie({ data, setData }) {

  const [suggest, setSuggest] = useState();
  const [err, setErr] = useState(false);

  useEffect(() => { }, [suggest])

  async function getData(movieName) {
    let apiData = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&t=${movieName}`);
    apiData = await apiData.json();
    if (apiData.Response === "True") {
      delete apiData.Ratings;
      setData(apiData);
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
            <Form.Label> <h5>Enter Movie</h5></Form.Label>
            <Form.Control type="text" id="movieInput" onChange={e => setSuggest(e.target.value)} />
          </Form.Group>
          <div>
            {
              suggest &&
              <ListGroup id="suggestion" onClick={e => callConsole(e)}>
                <Suggestion suggest={suggest} />
              </ListGroup>
            }

          </div>
          <Button className='buttons' variant="primary" type="submit">Search</Button>
        </Form>
      </div>
      {
        err ? <h4>No such movie found! Try again</h4> : <></>
      }

    </>
  )
}

export default SearchMovie