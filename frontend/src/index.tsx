import React from 'react';
import ReactDOM from 'react-dom/client';

import './App.css';
import { RoutesPages } from './routes';

const rootEl = document.getElementById('root');
if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <RoutesPages />
    </React.StrictMode>,
  );
}
