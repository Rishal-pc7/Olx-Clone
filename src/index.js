import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { firebaseContext,fireStoreContext } from './store/firebaseContext';
import { firebase,firestore } from './firebase/config';
import Context from './store/firebaseContext';
import { BrowserRouter } from 'react-router-dom';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <firebaseContext.Provider value={{firebase}}>
    <fireStoreContext.Provider value={{firestore}}>
      <Context>
        <BrowserRouter>
         <App />
        </BrowserRouter>
      </Context>
    </fireStoreContext.Provider>
    </firebaseContext.Provider>
  </React.StrictMode>
);

