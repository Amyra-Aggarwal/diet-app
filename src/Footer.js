import React from 'react';
import './Footer.css';
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
                        <li><a href=""><FaHome style={{fontSize : '34px'}}/></a></li>
                        <li><a href=""><IoFastFoodOutline style={{fontSize : '34px'}}/></a></li>
                        <li><a href=""><LuChefHat style={{fontSize : '34px'}}/></a></li>
                        <li><a href=""><MdOutlineFoodBank style={{fontSize : '34px'}}/></a></li>
                    </ul>
                </nav>
            </footer>

        </div>
    )
}

export default Footer