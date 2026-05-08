import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { DashboardLayout } from './layout/DashboardLayout';
import Dashboard from './pages/Dashboard';
import ISSTracker from './pages/ISSTracker';

// Placeholder for other pages
const Placeholder = ({ title }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh]">
    <h1 className="text-4xl font-black uppercase mb-4">{title}</h1>
    <p className="text-slate-500 italic">Under Construction: Telemetry link establishing...</p>
  </div>
);

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="iss" element={<ISSTracker />} />
            <Route path="chat" element={<Placeholder title="Mission Control Chat" />} />
            <Route path="news" element={<Placeholder title="Space News Feed" />} />
            <Route path="*" element={<Placeholder title="404: Lost in Space" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
