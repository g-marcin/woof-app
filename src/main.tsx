import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './common/i18next/index';
// import './firebase.ts';
import './index.css';
import './theme/theme.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
