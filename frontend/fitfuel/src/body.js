import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

function Body() {
  return (
    <div>
      <Card className="mx-auto" border="primary" style={{ width: '950px', height: '150px', borderRadius: '10px' }}>
        {/* <Card.Header className='bg-primary'></Card.Header> */}
        <Card.Body className="d-flex align-items-center justify-content-between">
          <div>
            <Card.Title className='watertitle' >Water</Card.Title>
            <Card.Text className='text'>Recommended</Card.Text>
          </div>
          <Link to='/water'>
          <Button variant="primary" style={{ background: 'lightblue', color: 'darkblue', border: 'none', width: '165px', height: '40px' }}>
            <strong>Your AquaAlert</strong>
            <span style={{ marginLeft: '5px' }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="#00008b" viewBox="0 0 264.564 264.564" width="20px" height="20px">
                <g>
                  <g>
                    <path d="M132.281,264.564c51.24,0,92.931-41.681,92.931-92.918c0-50.18-87.094-164.069-90.803-168.891L132.281,0l-2.128,2.773 c-3.704,4.813-90.802,118.71-90.802,168.882C39.352,222.883,81.042,264.564,132.281,264.564z" />
                  </g>
                </g>
              </svg>
            </span>
          </Button>
          </Link>
        </Card.Body>
        {/* <Card.Footer className="bg-primary"></Card.Footer> */}
      </Card>

      <div>
        <h2 className='Daily'>Daily Meals</h2>

        <div className='container mt-5'>
          <div className='card' style={{ width: '900px', height: '230px', borderRadius: '10px' }}>
            <div className='row'>
              <div className='col-md-4'>
                <img src='https://images.immediate.co.uk/production/volatile/sites/30/2022/03/Healthy-breakfast-recipes-to-lose-weight-8f35f26.jpg' width="230px" height="230px" alt="Breakfast" style={{ borderRadius: '10px', marginLeft: '-53px' }} />
              </div>
              <div className='col-md-8'>
                <h1 className='breakfast'>Breakfast</h1>
                <h3 className='fuels'>"A good breakfast fuels you up and gets you ready for the day."</h3>
                <a href>
                <Button variant="primary" style={{ background: '#198754', color: 'white', border: 'none', width: '90px', height: '40px' }}>Explore</Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='container mt-5'>
          <div className='card' style={{ width: '900px', height: '230px', borderRadius: '10px' }}>
            <div className='row'>
              <div className='col-md-4'>
              <img src='https://www.realsimple.com/thmb/2bs-hZbuz0XnntP_K4bqRmRWU5E=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/school-lunch-ideas-3b96e172f93042acb20c565842403ab5.jpg' width="230px" height="230px" alt="Lunch" style={{ borderRadius: '10px', marginLeft: '-53px' }} />
              </div>
              <div className='col-md-8'>
                <h1 className='Lunch'>Lunch</h1>
                <h3 className='fuels'>"Lunchtime is the best time to reboot your day, refuel your body, and refresh your mind."</h3>
                <a href=''>
                <Button variant="primary" style={{ background: '#198754', color: 'white', border: 'none', width: '90px', height: '40px' }}>Explore</Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='container mt-5'>
          <div className='card' style={{ width: '900px', height: '230px', borderRadius: '10px' }}>
            <div className='row'>
              <div className='col-md-4'>
                <img src='https://cdn.shopify.com/s/files/1/2152/6107/t/21/assets/snack_299820876-sml-2-1660277971444.jpg?v=1660277972' width="230px" height="230px" alt="Snacks" style={{ borderRadius: '10px', marginLeft: '-53px' }} />
              </div>
              <div className='col-md-8'>
                <h1 className='Snacks'>Snacks</h1>
                <h3 className='fuels'>"Healthy snacks are like fuel for your body, giving you the energy you need to conquer the day."</h3>
                <a href="/destination-page">
                  <Button variant="primary" style={{ background: '#198754', color: 'white', border: 'none', width: '90px', height: '40px' }}>Explore</Button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className='container mt-5'>
          <div className='card' style={{ width: '900px', height: '230px', borderRadius: '10px' }}>
            <div className='row'>
              <div className='col-md-4'>
                <img src='https://img.taste.com.au/iCntbupq/w720-h480-cfill-q80/taste/2019/04/indian-lentil-and-egg-curry-148613-1.jpg' width="230px" height="230px" alt="Dinner" style={{ borderRadius: '10px', marginLeft: '-53px' }} />
              </div>
              <div className='col-md-8'>
                <h1 className='Dinner'>Dinner</h1>
                <h3 className='fuels'>"In the chaos of life, dinner is a moment of calm, a chance to recharge and refuel for whatever lies ahead."</h3>
                <a href="/destination-page">
                <Button variant="primary" style={{ background: '#198754', color: 'white', border: 'none', width: '90px', height: '40px' }}>Explore</Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;