import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function FoodCard({ data }) {
  const imageUrl = data.food_images && data.food_images.food_image.length > 0
    ? data.food_images.food_image[0].image_url
    : 'https://via.placeholder.com/200';

  const { servings } = data;
  const firstServing = servings && servings.serving.length > 0 ? servings.serving[0] : {};
  const { calories = 'N/A', carbohydrate = 'N/A', fat = 'N/A', protein = 'N/A' } = firstServing;

  return (
    <div className="col-md-3 mb-4 d-flex">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={imageUrl} alt={data.food_name} style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{data.food_name}</Card.Title>
          <Card.Text>
            Calories: {calories}<br />
            Carbohydrates: {carbohydrate}<br />
            Fats: {fat}<br />
            Protein: {protein}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default FoodCard;
