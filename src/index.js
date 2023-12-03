import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './context/AuthProvider';
// import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);

function setGlobalFont(fontFamily) {
  const style = document.createElement('style');
  style.innerHTML = `
      body, h1, p, div {
          font-family: ${fontFamily}, sans-serif;
      }
  `;
  document.head.appendChild(style);
}

setGlobalFont('Arial'); 

function setGlobalSubFont(fontFamily) {
  const style = document.createElement('style');
  style.innerHTML = `
      input, select, button, Link {
          font-family: ${fontFamily}, sans-serif;
      }
  `;
  document.head.appendChild(style);
}

setGlobalSubFont('helvetica'); 


