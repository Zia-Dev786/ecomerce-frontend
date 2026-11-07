import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './core/hooks/userHook.jsx'
import CartPovider from './core/hooks/cartHook.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <UserProvider>
    <CartPovider>
    <App />
    </CartPovider>
  </UserProvider>
  </BrowserRouter>,
)
