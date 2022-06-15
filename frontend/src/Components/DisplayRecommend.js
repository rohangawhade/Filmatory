import React from 'react'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/CardGroup'


function DisplayRecommend({ movies }) {
    console.log(movies );
    return (
        <div className='recommend'>
            <CardGroup>
                {movies && 
                    <Card >
                        <Card.Img variant="top"  src={movies['Poster']} />
                        <Card.Body>
                            <Card.Title>{movies['Title']}</Card.Title>
                            <Card.Text>{movies['Plot']}</Card.Text>
                        </Card.Body>
                        <Card.Footer>
                            <small className="text-muted">Released Date: {movies['Released']}</small>
                        </Card.Footer>
                    </Card>
                }
            </CardGroup>
        </div>
    )
}

export default DisplayRecommend