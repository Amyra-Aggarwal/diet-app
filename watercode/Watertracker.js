import React, { useState } from 'react';
import './style.css';

const MAX_CUPS = 25; // 25 cups * 100ml = 2500ml (2.5 liters)
const MIN_CUPS = 0;
const ML_PER_CUP = 100;

const WaterTracker = () => {
    const [cups, setCups] = useState(0);
    const [litres, setLitres] = useState(0);
    const [percentage, setPercentage] = useState(0);

    const addCup = () => {
        if (cups < MAX_CUPS) {
            setCups(cups + 1);
            setLitres(litres + ML_PER_CUP);
            setPercentage((litres + ML_PER_CUP) / 2500 * 100);
        }
    };

    const removeCup = () => {
        if (cups > MIN_CUPS) {
            setCups(cups - 1);
            setLitres(litres - ML_PER_CUP);
            setPercentage((litres - ML_PER_CUP) / 2500 * 100);
        }
    };

    return (
        <div>
            <h1>Water Tracker</h1>
            <div className="container">
                <div className="side-info">
                <svg width="800px" height="800px" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">                        
                        <title>glass_cup_fill</title>
    <g id="页面-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Food" transform="translate(-240.000000, -48.000000)">
            <g id="glass_cup_fill" transform="translate(240.000000, 48.000000)">
                <path d="M24,0 L24,24 L0,24 L0,0 L24,0 Z M12.5934901,23.257841 L12.5819402,23.2595131 L12.5108777,23.2950439 L12.4918791,23.2987469 L12.4918791,23.2987469 L12.4767152,23.2950439 L12.4056548,23.2595131 C12.3958229,23.2563662 12.3870493,23.2590235 12.3821421,23.2649074 L12.3780323,23.275831 L12.360941,23.7031097 L12.3658947,23.7234994 L12.3769048,23.7357139 L12.4804777,23.8096931 L12.4953491,23.8136134 L12.4953491,23.8136134 L12.5071152,23.8096931 L12.6106902,23.7357139 L12.6232938,23.7196733 L12.6232938,23.7196733 L12.6266527,23.7031097 L12.609561,23.275831 C12.6075724,23.2657013 12.6010112,23.2592993 12.5934901,23.257841 L12.5934901,23.257841 Z M12.8583906,23.1452862 L12.8445485,23.1473072 L12.6598443,23.2396597 L12.6498822,23.2499052 L12.6498822,23.2499052 L12.6471943,23.2611114 L12.6650943,23.6906389 L12.6699349,23.7034178 L12.6699349,23.7034178 L12.678386,23.7104931 L12.8793402,23.8032389 C12.8914285,23.8068999 12.9022333,23.8029875 12.9078286,23.7952264 L12.9118235,23.7811639 L12.8776777,23.1665331 C12.8752882,23.1545897 12.8674102,23.1470016 12.8583906,23.1452862 L12.8583906,23.1452862 Z M12.1430473,23.1473072 C12.1332178,23.1423925 12.1221763,23.1452606 12.1156365,23.1525954 L12.1099173,23.1665331 L12.0757714,23.7811639 C12.0751323,23.7926639 12.0828099,23.8018602 12.0926481,23.8045676 L12.108256,23.8032389 L12.3092106,23.7104931 L12.3186497,23.7024347 L12.3186497,23.7024347 L12.3225043,23.6906389 L12.340401,23.2611114 L12.337245,23.2485176 L12.337245,23.2485176 L12.3277531,23.2396597 L12.1430473,23.1473072 Z" id="MingCute" fill-rule="nonzero">

</path>
                <path d="M17.8829,2 C19.0749,2 20.0023,3.03613 19.8707,4.22086 L18.0929,20.2209 C17.9803,21.2337 17.1242,22 16.1051,22 L7.8952,22 C6.87611,22 6.01998,21.2337 5.90743,20.2209 L4.12966,4.22086 C3.99802,3.03613 4.9254,2 6.11742,2 L17.8829,2 Z M13.0001,15 C12.4478,15 12.0001,15.4477 12.0001,16 C12.0001,16.5523 12.4478,17 13.0001,17 C13.5524,17 14.0001,16.5523 14.0001,16 C14.0001,15.4477 13.5524,15 13.0001,15 Z M10.0001,12 C9.44784,12 9.00012,12.4477 9.00012,13 C9.00012,13.5523 9.44784,14 10.0001,14 C10.5524,14 11.0001,13.5523 11.0001,13 C11.0001,12.4477 10.5524,12 10.0001,12 Z M17.8829,4 L6.11742,4 L6.54222,7.82312 L6.7290328,7.78953544 C6.9886664,7.7461348 7.290124,7.709138 7.6289,7.68921 C8.75735176,7.62282882 10.2918071,7.74656972 12.0598056,8.4433791 L12.394,8.58084 C13.88575,9.22015875 15.1590918,9.35318355 16.0754329,9.32242418 L17.2992,9.25366 L17.8829,4 Z" id="形状" fill="#09244B">

</path>
            </g>
        </g>
    </g>
                    
                    </svg>
                    <span className="current-cups">{cups}/{MAX_CUPS}</span>
                </div>
                <div className="percentage-container">
                    <span className="current-percentage">{percentage.toFixed(2)}%</span>
                    <div className="progress" style={{ height: `${percentage}%` }}></div>
                </div>
                <div className="side-info">
                <svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
  <g fill="none" fill-rule="evenodd">
    <path fill="#B4DFFB" d="M26.6995662,63 C36.4747667,63 44.3991324,55.0756343 44.3991324,45.3004338 C44.3991324,35.5252333 26.6995662,9 26.6995662,9 C26.6995662,9 9,35.5252333 9,45.3004338 C9,55.0756343 16.9243657,63 26.6995662,63 Z"/>
    <path fill="#4796E7" d="M41.1107898,41 C48.351679,41 54.2215796,35.1300995 54.2215796,27.8892102 C54.2215796,20.648321 41.1107898,1 41.1107898,1 C41.1107898,1 28,20.648321 28,27.8892102 C28,35.1300995 33.8699005,41 41.1107898,41 Z"/>
    <path stroke="#B4DFFB" stroke-linecap="round" stroke-width="2" d="M32,28 C32,32.9705627 36.0294373,37 41,37 L41,37"/>
    <path stroke="#FFF" stroke-linecap="round" stroke-width="2" d="M13,46 C13,52.627417 18.372583,58 25,58 L25,58"/>
  </g>
</svg>
                    <span className="current-liters">{(litres / 1000).toFixed(1)}l/2.5l</span>
                </div>
                <div className="buttons">
                    <button className="remove" onClick={removeCup} disabled={cups === MIN_CUPS}>-</button>
                    <button className="add" onClick={addCup} disabled={cups === MAX_CUPS}>+</button>
                </div>
            </div>
        </div>
    );
};

export default WaterTracker;
