import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function FoodCard({ data }) {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await axios.get(data.food_url);
        const html = response.data;
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const imageElement = doc.querySelector('img');
        const imageSrc = imageElement ? imageElement.src : '';
        setImageUrl(imageSrc);
      } catch (error) {
        console.error('Error fetching image:', error);
      }
    };

    fetchImage();
  }, [data.food_url]);

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} alt={data.food_name} />
      <Card.Body>
        <Card.Title>{data.food_name}</Card.Title>
        <Card.Text>
          Nutritional Description: {data.food_description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default FoodCard;
