import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { FaHome } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5";
import { LuChefHat } from "react-icons/lu";
import { MdOutlineFoodBank } from "react-icons/md";

const Footer = () => {
    return (
        <div>
            <footer>
                <nav>
                    <ul>
                        <li><Link to="/"><FaHome style={{fontSize : '34px'}}/></Link></li>
                        <li><Link to=""><IoFastFoodOutline style={{fontSize : '34px'}}/></Link></li>
                        <li><Link to="/recipe"><LuChefHat style={{fontSize : '34px'}}/></Link></li>
                        <li><Link to=""><MdOutlineFoodBank style={{fontSize : '34px'}}/></Link></li>
                    </ul>
                </nav>
            </footer>

        </div>
    )
}

export default Footer