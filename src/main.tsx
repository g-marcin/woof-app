import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './common/i18next/index'
import '@assets/css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
