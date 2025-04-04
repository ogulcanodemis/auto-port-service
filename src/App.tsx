import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './modules/dashboard/Dashboard';
import ServiceCreate from './modules/ServiceCreate/ServiceCreate';
import ServiceDetail from './modules/ServiceDetail/ServiceDetail';
import Header from './components/Header/Header';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/yeni-servis" element={<ServiceCreate />} />
          <Route path="/servis/:id" element={<ServiceDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
