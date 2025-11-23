import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FreelancerLayout from './layouts/FreelancerLayout';
import FreelancerDashboard from './pages/FreelancerDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<FreelancerLayout />}>
          <Route index element={<FreelancerDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
