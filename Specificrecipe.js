import React from 'react'
import MyNavbar from './Components/MyNavbar'
import Footer from './Components/Footer'
import Card from 'react-bootstrap/Card';

export default function Specificrecipe({data}) {
  return (
    <div>
        <MyNavbar></MyNavbar>
        <div className="d-flex"> {/* Each card takes 3 out of 12 columns, making 4 cards fit in a row */}
      <Card >
        <Card.Img variant="top" src={data.recipe_image} alt={data.title} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{data.recipe_name}</Card.Title>
          <Card.Text>{data.recipe_description}</Card.Text>
          <Card.Text>
            {data.recipe_ingredients.ingredient}
          </Card.Text>
        </Card.Body>
      </Card>
      </div>
        <Footer></Footer></div>
  )
}
