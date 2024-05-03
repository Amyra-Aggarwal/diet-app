import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { IoFastFoodOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { PiChefHat } from "react-icons/pi";
import { MdMenuBook } from "react-icons/md";

const Footer = () => {
    return (
        <div>
            <footer>
                <nav>
                    <ul>
                        <li><Link to="/"><IoHomeOutline style={{fontSize : '34px'}} />Home</Link></li>
                        <li><Link to="/food"><IoFastFoodOutline style={{fontSize : '34px'}}/>Foods</Link></li>
                        <li><Link to="/recipe"><PiChefHat style={{fontSize : '34px'}}/>Recipes</Link></li>
                        <li><Link to="/diet"><MdMenuBook style={{fontSize : '34px'}}/>Diet Plan</Link></li>
                    </ul>
                </nav>
            </footer>

        </div>
    )
}

export default Footer