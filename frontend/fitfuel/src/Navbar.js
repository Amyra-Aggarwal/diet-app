import React, { useState } from 'react';
import { FaCalendarAlt, FaUserCircle } from "react-icons/fa";
import './style.css';
import Logout from './Logout';

function getDate() {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const Days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const today = new Date();
  const monthIndex = today.getMonth();
  const DayIndex = today.getDay();
  const month = months[monthIndex];
  const day = Days[DayIndex];
  const date = today.getDate();
  return { month, date, day };
}

const Navbar = () => {
  const [currentDate, setCurrentDate] = useState(getDate());
  return (
    <div className='header'>
      <ul>
        <li><a href="#" className="logo">Fit<span>Fuel</span></a></li>  
        <li><a href=''><FaCalendarAlt style={{ fontSize: '24px', alignItems: 'center' }}/> {currentDate.month} {currentDate.date}, {currentDate.day}</a></li>
      </ul>
      <ul className="navbar">
        <li><a href=''>Hi, <FaUserCircle style={{ fontSize: '24px' }}/></a></li>
        <li><Logout /></li>
      </ul>
    </div>
  );
}

export default Navbar;
