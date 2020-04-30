import './config/ReactotronConfig';
import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes';
import './global.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Flip } from 'react-toastify';

function App() {
  return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Routes />
          <ToastContainer
            autoClose={3000}
            hideProgressBar
            closeOnClick
            transition={Flip}
            rtl={false}
            draggable
            position="top-right" />
        </PersistGate>
      </Provider>
  );
}

export default App;
