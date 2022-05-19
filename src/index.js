import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { JobsContextProvider } from './context/Jobs-context';
import { CarsContextProvider } from './context/Cars-context';

import App from './App';
import './index.css';


ReactDOM.render(
  <CarsContextProvider>
    <JobsContextProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </JobsContextProvider>
  </CarsContextProvider>,
  document.getElementById('root')
);

