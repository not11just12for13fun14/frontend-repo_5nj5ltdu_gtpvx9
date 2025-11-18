import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Leads from './pages/Leads'
import TemplatesRedirect from './pages/TemplatesRedirect'
import TopNav from './components/TopNav'
import './index.css'

const LeadsPage = () => (
  <div className="min-h-screen bg-slate-50">
    <TopNav />
    <Leads />
  </div>
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/leads" element={<LeadsPage />} />
        <Route path="/templates" element={<TemplatesRedirect />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)