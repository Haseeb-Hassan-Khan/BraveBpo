import React from 'react';
import {Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import UserDetails from './UserDetails';
import App from './App';

function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/user/:uuid" element={<UserDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;