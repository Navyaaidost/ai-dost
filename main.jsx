import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import { storage } from './storage.js';

// App.jsx calls window.storage.* (the API Claude.ai artifacts provide
// automatically). Outside Claude.ai we polyfill it with localStorage.
window.storage = storage;

createRoot(document.getElementById('root')).render(<App />);
