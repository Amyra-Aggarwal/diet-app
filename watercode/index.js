import React from 'react';
import ReactDOM from 'react-dom';
import Watertracker from './Watertracker'; // Corrected import path

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Watertracker />
  </React.StrictMode>
);
