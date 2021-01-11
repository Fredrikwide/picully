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
    <FirebaseProvider>
      <AuthProvider>
        <UpdateProvider>
          <App />
        </UpdateProvider>
      </AuthProvider>
    </FirebaseProvider>
  </ChakraProvider>
    ,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
