import React from 'react';
import { render } from 'react-dom';
import App from './components/App.jsx';
import exampleData from './dummyData.js';

render(
  <div>
    <App />
  </div>,
  document.getElementById('app')
)
