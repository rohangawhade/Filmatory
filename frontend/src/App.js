import { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Column from 'react-bootstrap/Col'
import ListGroup from 'react-bootstrap/ListGroup'
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

function App() {
  const [data, setData] = useState();
  const [display, setDisplay] = useState(false);
  const [err, setErr] = useState(false);

  async function getData(movieName) {
    let apiData = await fetch(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_MOVIE_API_KEY}&t=${movieName}`);
    apiData = await apiData.json();
    if (apiData.Response === "True") {
      delete apiData.Ratings;
      setDisplay(true);
      setErr(false);
      setData(apiData);
      document.getElementById("suggestion").innerHTML = "";
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

  function callConsole(e){
    getData(e.target.innerText);
  }

  async function getSuggestions(movieName) {
    let apiData = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=8000b122`)
    apiData = await apiData.json();

    if (apiData.Response === "True") {
      let content = "";
    let arr=[];
      let count = 0;
      apiData.Search.map(i => {
        if(count < 5){
          count += 1;
          arr.push(i.Title);
          content += `<div class="list-group movieSuggestion"><div class="list-group-item">${i.Title}</div></div>`;
          return content;
        }
        else{
          return content;
        }
      });
      content += `</ListGroup>`
      document.getElementById("suggestion").innerHTML = content
    }
  }

  function GetNames(e) {
    getSuggestions(e.target.value);
  }

  return (
    <div className="App">
      <p style={{ fontSize: "60px", fontWeight: 700 }}>Filmatory</p>

      <div id="formData">
        <Form onSubmit={onSubmit} >
          <Form.Group as={Column} className="mb-3 lg-2" controlId="formBasicEmail">
            <Form.Label> <h5>Enter Movie</h5></Form.Label>
            <Form.Control type="text" onChange={e => GetNames(e)}/>
          </Form.Group>
          <div>
            <ListGroup id="suggestion" onClick={e => callConsole(e)}>
            </ListGroup>
          </div>
          <Button className='buttons' variant="primary" type="submit">Search</Button>
        </Form>
      </div>
      <div id="movieDiv">
        <div id='poster'>
          {display ? (data && <img src={data["Poster"]} alt="Movie Poster" />) : <></>}
        </div>
        <div id='info'>
          {
            display ? (data && Object.keys(data).map((k, i) => {
              return <p key={i}><strong>{k}</strong>: {data[k]}</p>
            })) : <></>
          }
          {
            err ? <h2>No such movie found! Try again</h2> : <></>
          }
        </div>
      </div>
    </div>
  );
}

export default App;
