import React from 'react'
import ReactDOM from 'react-dom/client'
import Portfolio from './Portfolio'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <Portfolio />
    </BrowserRouter>
  </React.StrictMode>
)