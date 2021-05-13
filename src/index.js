import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from "@chakra-ui/react"
import { AuthProvider } from './contexts/AuthContext';
import { FirebaseProvider } from './contexts/FirebaseContext';
import './app.css'
import { UpdateProvider } from './contexts/UpdateContext';
ReactDOM.render(
  <ChakraProvider>
      <AuthProvider>
        <FirebaseProvider>
          <UpdateProvider>
            <App />
          </UpdateProvider>
        </FirebaseProvider>
      </AuthProvider>
  </ChakraProvider>
    ,

  document.getElementById('root')
);

reportWebVitals();
