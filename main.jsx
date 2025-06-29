console.log("✅ VITE_API_URL:", import.meta.env.VITE_API_URL);


import React from 'react'
import ReactDOM from 'react-dom/client'
import TeamDashboard from './TeamDashboard'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <TeamDashboard />
  </React.StrictMode>
)