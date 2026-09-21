import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Automatically handle stale bundle chunk cache when a new build is deployed
window.addEventListener('vite:preloadError', (event) => {
  console.warn('New website version detected, reloading to fetch latest assets...', event);
  window.location.reload();
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
