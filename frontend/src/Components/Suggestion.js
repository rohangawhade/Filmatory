import React, { useEffect, useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
function Suggestion({suggest}) {

    const [names, setNames] = useState([]);

    useEffect(() => getSuggestions(suggest), [suggest])

    async function getSuggestions(movieName) {
        let apiData = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${process.env.REACT_APP_MOVIE_API_KEY}`)
        apiData = await apiData.json();

        if (apiData.Response === "True") {
            let arr = [];
            let count = 0;
            apiData.Search.map(i => {
                if (count < 5) {
                    count += 1;
                    arr.push(i.Title);
                    return null;
                }
                else {
                    setNames(arr);
                    return null;
                }
            });
        }
    }

    return (
        <div>
            {names && names.map((k,i) => <ListGroup.Item key={i}>{k}</ListGroup.Item>)}
        </div>
    )
}

export default Suggestion