import React from 'react'
import './Navbar.css';
import { useState } from 'react';
import { FaCalendarAlt } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";


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
        <li><a href=''>
          <div className="sv">  <FaCalendarAlt style={{ fontSize: '24px'}}/> 
          <div className='date'>
           {currentDate.month} {currentDate.date}, {currentDate.day}</div>
          </div></a> </li>
        <ul class="navbar">
          <li><a href=''>Hi, <FaCircleUser style={{ fontSize: '24px' }}/></a></li>
          <li><a href=''> Log Out</a></li>
        </ul>
        
      </div>
  )
}

export default Navbar