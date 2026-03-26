import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppModern from './AppModern';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppModern />
  </StrictMode>
);
