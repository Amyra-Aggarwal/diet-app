import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './Navbar';

const MAX_CUPS = 25; // 25 cups * 100ml = 2500ml (2.5 liters)
const MIN_CUPS = 0;
const ML_PER_CUP = 100;
const TOTAL_ML = 2500; // 2.5 liters in milliliters

const WaterTracker = () => {
    const [cups, setCups] = useState(0);

    const addCup = () => {
        if (cups < MAX_CUPS) {
            setCups(cups + 1);
        }
    };

    const removeCup = () => {
        if (cups > MIN_CUPS) {
            setCups(cups - 1);
        }
    };

    const litres = (cups * ML_PER_CUP) / 1000;
    const percentage = (cups * ML_PER_CUP / TOTAL_ML) * 100;

    return (
        <div>
            <Navbar />
            <div className="container text-center mt-5">
                <h1>Water Tracker</h1>
                <div className="row justify-content-center mt-4">
                    <div className="col-2 d-flex flex-column align-items-center">
                        <svg className="mt-5" width="55" height="55" viewBox="0 0 24 24">
                            <path d="M17.8829,2 C19.0749,2 20.0023,3.03613 19.8707,4.22086 L18.0929,20.2209 C17.9803,21.2337 17.1242,22 16.1051,22 L7.8952,22 C6.87611,22 6.01998,21.2337 5.90743,20.2209 L4.12966,4.22086 C3.99802,3.03613 4.9254,2 6.11742,2 L17.8829,2 Z" fill="#09244B" />
                        </svg>
                        <span className="mt-2">{cups}/{MAX_CUPS}</span>
                    </div>
                    <div className="col-4 position-relative bg-primary text-white d-flex align-items-center justify-content-center rounded" style={{ minHeight: '300px', fontSize: '50px', width: '300px' }}>
                        <div className="position-absolute w-100 h-100 d-flex align-items-center justify-content-center" style={{ zIndex: 2 }}>
                            {percentage.toFixed(2)}%
                        </div>
                        <div className="position-absolute w-100 bg-info" style={{ height: `${percentage}%`, bottom: 0, transition: 'height 0.5s ease', zIndex: 1 }}></div>
                    </div>
                    <div className="col-2 d-flex flex-column align-items-center">
                        <svg className="mt-5" width="55" height="55" viewBox="0 0 64 64">
                            <path fill="#B4DFFB" d="M26.6995662,63 C36.4747667,63 44.3991324,55.0756343 44.3991324,45.3004338 C44.3991324,35.5252333 26.6995662,9 26.6995662,9 C26.6995662,9 9,35.5252333 9,45.3004338 C9,55.0756343 16.9243657,63 26.6995662,63 Z" />
                            <path fill="#4796E7" d="M41.1107898,41 C48.351679,41 54.2215796,35.1300995 54.2215796,27.8892102 C54.2215796,20.648321 41.1107898,1 41.1107898,1 C41.1107898,1 28,20.648321 28,27.8892102 C28,35.1300995 33.8699005,41 41.1107898,41 Z" />
                        </svg>
                        <span className="mt-2">{litres.toFixed(1)}l/2.5l</span>
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-3">
                    <button className="btn btn-primary mx-2 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px', fontSize: '30px', lineHeight: '0' }} onClick={removeCup} disabled={cups === MIN_CUPS}>-</button>
                    <button className="btn btn-primary mx-2 d-flex align-items-center justify-content-center rounded-circle" style={{ width: '60px', height: '60px', fontSize: '30px', lineHeight: '0' }} onClick={addCup} disabled={cups === MAX_CUPS}>+</button>
                </div>
            </div>
        </div>
    );
};

export default WaterTracker;

