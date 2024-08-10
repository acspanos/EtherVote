import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {LoginProvider} from './context/LoginContext'
import { VotingProvider } from './context/VotingContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <VotingProvider>
    <LoginProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </LoginProvider>
  </VotingProvider>
)
