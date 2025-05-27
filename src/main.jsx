import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ContextShare from './context/ContextShare.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
   <GoogleOAuthProvider clientId='1032065808069-b5h74fts2h4le44hpi091iul29k9t765.apps.googleusercontent.com'>
   <ContextShare><App /></ContextShare> 
    </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
