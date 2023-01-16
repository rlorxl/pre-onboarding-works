import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import TodoContextProvider from './store/todoProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TodoContextProvider>
      <App />
    </TodoContextProvider>
  </React.StrictMode>
);
