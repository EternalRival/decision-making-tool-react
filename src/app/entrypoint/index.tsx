import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Router } from '../routes';
import { StoreProvider } from '../store';
import '../styles/globals.css';

const root = document.querySelector('#root');

if (root === null) {
  throw new Error('no root element');
}

createRoot(root).render(
  <StrictMode>
    <StoreProvider>
      <Router />
    </StoreProvider>
  </StrictMode>
);
