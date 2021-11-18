import React from 'react';
import { PersistGate } from "redux-persist/es/integration/react";
import { Provider } from 'react-redux';
import { BrowserRouter } from "react-router-dom";

import { store, persistor } from './stores';
import { Routes } from './routes';

import './styles/index.css';

const App = () => {
  return (
    <div>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <BrowserRouter>
            <Routes />
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </div>
  );
}

export default App;