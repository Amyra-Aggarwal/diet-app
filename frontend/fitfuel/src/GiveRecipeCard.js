import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

function GiveRecipeCard({ data }) {
  const imageUrl = data.recipe_images && data.recipe_images.recipe_image.length > 0
    ? data.recipe_images.recipe_image[0]
    : 'https://via.placeholder.com/200';

  const { servings } = data;
  const firstServing = servings && servings.serving.length > 0 ? servings.serving[0] : {};
  const { calories = 'N/A', carbohydrate = 'N/A', fat = 'N/A', protein = 'N/A' } = firstServing;

  const directions = data.directions && data.directions.direction ? data.directions.direction : [];
  const ingredients = data.ingredients && data.ingredients.ingredient ? data.ingredients.ingredient : [];
  const categories = data.recipe_categories && data.recipe_categories.recipe_category ? data.recipe_categories.recipe_category : [];

  return (
    <div className="container d-flex justify-content-center mb-4">
      <Card style={{ width: '80%' }}>
        <Card.Img variant="top" src={imageUrl} alt={data.recipe_name} style={{ height: '500px', objectFit: 'cover' }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{data.recipe_name}</Card.Title>
          <Card.Text>{data.recipe_description}</Card.Text>

          <Card.Text>
            <strong>Cooking Time:</strong> {data.cooking_time_min} minutes<br />
            <strong>Preparation Time:</strong> {data.preparation_time_min} minutes<br />
            <strong>Number of Servings:</strong> {data.number_of_servings}<br />
            <strong>Rating:</strong> {data.rating}
          </Card.Text>

          <Card.Text>
            <strong>Ingredients:</strong>
            <ul>
              {ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient.ingredient_description}</li>
              ))}
            </ul>
          </Card.Text>

          <Card.Text>
            <strong>Directions:</strong>
            <ol>
              {directions.map((direction, index) => (
                <li key={index}>{direction.direction_description}</li>
              ))}
            </ol>
          </Card.Text>

          <Card.Text>
            <strong>Categories:</strong>
            <ul>
              {categories.map((category, index) => (
                <li key={index}>
                  <a href={category.recipe_category_url} target="_blank" rel="noopener noreferrer">
                    {category.recipe_category_name}
                  </a>
                </li>
              ))}
            </ul>
          </Card.Text>

          <Card.Text>
            <strong>Nutrition per Serving:</strong><br />
            Calories: {calories}<br />
            Carbohydrates: {carbohydrate}<br />
            Fat: {fat}<br />
            Protein: {protein}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default GiveRecipeCard;
