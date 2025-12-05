import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import FreelancerLayout from './layouts/FreelancerLayout';
import FreelancerDashboard from './pages/FreelancerDashboard';
import Projects from './pages/Projects';
import Proposals from './pages/Proposals';
import Contracts from './pages/Contracts';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<FreelancerLayout />}>
            <Route index element={<FreelancerDashboard />} />
            <Route path='projects' element={<Projects />} />
            <Route path='proposals' element={<Proposals />} />
            <Route path='contracts' element={<Contracts />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
