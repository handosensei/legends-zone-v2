import React from 'react';

//import Scss
import './assets/scss/themes.scss';

//imoprt Route
import Route from './Routes';

// Fake Backend 
import fakeBackend from "./helpers/AuthType/fakeBackend";
import {ToastContainer} from "react-toastify";

// Activating fake backend
fakeBackend();

function App() {
  return (
    <React.Fragment>
      <Route />
      <ToastContainer />
    </React.Fragment>
  );
}

export default App;
