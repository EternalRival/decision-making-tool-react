import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '~/assets/styles/globals.css';
// import App from './App.tsx'

const root = document.getElementById('root');

if (root === null) {
  throw new Error('no root element');
}

createRoot(root).render(
  <StrictMode>
    123
    {/* <App /> */}
  </StrictMode>
);
