import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <>
    <CssBaseline />
    <BrowserRouter basename="/#/app/">
      <App />
    </BrowserRouter>
  </>,
  document.getElementById('root')
);

