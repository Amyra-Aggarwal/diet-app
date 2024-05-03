import React from 'react';
import './style.css';
import { CgAdd } from "react-icons/cg";

const Body = () => {
  return (
    <div className='body'>
      <div className="card">
        <div className='watercard'>
          <div className='text'>
            <h1 className="Water">Water</h1>
            <div className="watercard-actions">
            <CgAdd style={{ fontSize: '54px' }} />
            </div>
          </div>
            <p className="card-text">Recommeded until now 1.4L</p>
        </div>
      </div>

<br></br>

      <div className='Daily'>Daily Meals</div>

<br></br>

      <div className='food'>

        <div className='foodcard'>
          <div className='text'>
            <h1 className="Breakfast">Breakfast</h1>
            <div className="card-actions">
            <CgAdd style={{ fontSize: '54px', color: 'green' }} />
            </div>
          </div> 
          <p className="card-text">Recommeded 447 Kcal</p>
        </div>

        <div className='foodcard'>
          <div className='text'>
            <h1 className="lunch">Lunch</h1>
            <div className="card-actions">
            <CgAdd style={{ fontSize: '54px' }} />
            </div>
          </div>
          <p className="card-text">Recommeded 447 Kcal</p>
        </div>
      </div>

      <div className='food'>

        <div className='foodcard'>
          <div className='text'>
            <h1 className="card-title">Snacks</h1>
            <div className="snackscard-actions">
            <CgAdd style={{ fontSize: '54px' }} />
            </div>
          </div>
          <p className="card-text">Recommeded 447 Kcal</p>
        </div>

        <div className='foodcard'>
          <div className='text'>
            <h1 className="card-title">Dinner</h1>
            <div className="card-actions">
            <CgAdd style={{ fontSize: '54px' }} />
            </div>
          </div>
          <p className="card-text">Recommeded 447 Kcal</p>
        </div>
      </div>
    </div>
  );
}

export default Body;
