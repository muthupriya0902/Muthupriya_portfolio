import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import App from './App';

if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual';
}

const navigationEntry = performance.getEntriesByType('navigation')[0];
const isRefresh = navigationEntry?.type === 'reload';

if (isRefresh) {
  // A refresh should restart the portfolio at its header, including when the
  // previous visit ended at a section hash or a saved scroll position.
  window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => window.scrollTo(0, 0));
  });
} else if (!window.location.hash) {
  window.scrollTo(0, 0);
}

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
