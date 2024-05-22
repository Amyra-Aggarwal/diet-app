import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function RecipeCard({ data }) {
  const navigate= useNavigate();

  const toggleDetails = () => {
    localStorage.setItem('recipeid', data.recipe_id);
    navigate('/srecipe')
  };

  return (
    <div className="col-md-3 mb-4 d-flex">
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={data.recipe_image} alt={data.title} style={{ height: '200px', objectFit: 'cover' }} />
        <Card.Body className="d-flex flex-column">
          <Card.Title>{data.recipe_name}</Card.Title>
          <Card.Text>{data.recipe_description}</Card.Text>
          <Card.Text>
            {data.recipe_types.recipe_type.map((type, index) => (
              <span key={index}>{type}<br /></span>
            ))}
          </Card.Text>
          <Card.Text>
            Calories: {data.recipe_nutrition.calories}<br />
            Carbohydrates: {data.recipe_nutrition.carbohydrate}<br />
            Fats: {data.recipe_nutrition.fat}<br />
            Protein: {data.recipe_nutrition.protein}
          </Card.Text>
          <div className="mt-auto w-100">
            <Button variant="success" onClick={toggleDetails}>View Recipe</Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default RecipeCard;