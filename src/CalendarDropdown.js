import React, { useEffect, useState } from 'react';
import './cdd.css';

const CalendarDialog = ({ onClose }) => {
    // Add your dialog box content and functionality here
    return (
        <div className="dialog">
            <h2>Select Date</h2>
            {/* Add your date picker or calendar component here */}
            <button onClick={onClose}>Close</button>
        </div>
    );
};

const Calendar = () => {
    const [currYear, setCurrYear] = useState(new Date().getFullYear());
    const [currMonth, setCurrMonth] = useState(new Date().getMonth());
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [date, setDate] = useState(new Date());
    
    const months = ["January", "February", "March", "April", "May", "June", "July",
                    "August", "September", "October", "November", "December"];

    useEffect(() => {
        renderCalendar();
    }, [currYear, currMonth]);

    const renderCalendar = () => {
        const daysTag = document.querySelector(".days");
        const currentDate = document.querySelector(".current-date");

        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
        let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
        let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
        let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
            liTag += `<li class="${isToday}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
        }

        currentDate.innerText = `${months[currMonth]} ${currYear}`;
        daysTag.innerHTML = liTag;
    };


    const handleDialogToggle = () => {
        setIsDialogOpen(!isDialogOpen);
    };

    const handlePrevNextClick = (direction) => {
        setCurrMonth(currMonth => direction === "prev" ? currMonth - 1 : currMonth + 1);
        if (currMonth < 0 || currMonth > 11) {
            const newDate = new Date(currYear, currMonth, new Date().getDate());
            setCurrYear(newDate.getFullYear());
            setCurrMonth(newDate.getMonth());
        } else {
            setDate(new Date());
        }
    };

    return (
        <div className="wrapper">
            <header>
                <p className="current-date"></p>
                <div className="icons">
                    <span id="prev" className="material-symbols-rounded" onClick={() => handlePrevNextClick("prev")}>chevron_left</span>
                    <span id="next" className="material-symbols-rounded" onClick={() => handlePrevNextClick("next")}>chevron_right</span>
                    <span className="material-symbols-rounded" onClick={handleDialogToggle}>calendar_today</span>
                </div>
            </header>
            <div className="calendar">
                <ul className="weeks">
                    <li>Sun</li>
                    <li>Mon</li>
                    <li>Tue</li>
                    <li>Wed</li>
                    <li>Thu</li>
                    <li>Fri</li>
                    <li>Sat</li>
                </ul>
                <ul className="days">
                </ul>
            </div>
            {isDialogOpen && <CalendarDialog onClose={handleDialogToggle} />}
        </div>
    );
};

export default Calendar;
