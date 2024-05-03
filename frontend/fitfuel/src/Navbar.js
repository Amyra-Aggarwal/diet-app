import React from 'react'
import './style.css';
import { useState } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
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
        <li><a href="#" className="logo">Fit<span>Fuel</span></a></li>  
        <li><a href=''><FaCalendarAlt style={{ fontSize: '24px' , alignItems : 'cen' }}/> {currentDate.month} {currentDate.date}, {currentDate.day}</a></li>
        <ul class="navbar">
          <li><a href=''>Hi, <FaCircleUser style={{ fontSize: '24px' }}/></a></li>
          <li><Logout /></li>
        </ul>
        
      </div>
  )
}

export default Navbar