import React from 'react';
import { Card } from 'react-bootstrap';

function RecipeDetails({ data }) {
  return (
    <div className="col-md-6 mb-4">
      <Card className="h-100">
        <Card.Img variant="top" src={data.recipe_image} alt={data.title} style={{ height: '300px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title>{data.recipe_name}</Card.Title>
          <Card.Text>{data.recipe_description}</Card.Text>
          <Card.Text>
            <h5>Ingredients:</h5>
            <ul>
              {data.recipe_ingredients.ingredient.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </Card.Text>
          <Card.Text>
            <h5>Recipe Types:</h5>
            {data.recipe_types.recipe_type.map((type, index) => (
              <span key={index}>{type}<br /></span>
            ))}
          </Card.Text>
          <Card.Text>
            <h5>Nutrition:</h5>
            <p>
              Calories: {data.recipe_nutrition.calories}<br />
              Carbohydrates: {data.recipe_nutrition.carbohydrate}<br />
              Fats: {data.recipe_nutrition.fat}<br />
              Protein: {data.recipe_nutrition.protein}
            </p>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecipeDetails;
