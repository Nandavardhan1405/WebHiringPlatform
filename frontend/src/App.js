import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import Sidebar from './components/Sidebar'; // Sidebar acts as the header now
import Dashboard from './components/Dashboard';
import Candidates from './components/Candidates';
import Assessments from './components/Assessments';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        {/* Header (formerly Sidebar, now takes top 15%) */}
        <div className="w-full" >
          <Sidebar /> {/* Sidebar component is now a header */}
        </div>

        {/* Main content (dynamically loaded pages take remaining 85% height) */}
        <div className="w-full flex-1 overflow-y-auto h-auto" >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/candidates" element={<Candidates />} />
            <Route path="/assessments" element={<Assessments />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
