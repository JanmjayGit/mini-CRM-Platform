import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Campaigns from './pages/Campaigns';
import CreateCampaign from './pages/CreateCampaign';
import CustomerList from "./Customer/CustomerList.jsx";
import Order from './orders/order.jsx';
import RedirectHandler from './RedirectHandler/RedirectHandler';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/create" element={<CreateCampaign />} />
        <Route path="/customer" element={<CustomerList />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/oauth2/redirect" element={<RedirectHandler />} />
      </Routes>
    </Router>
  );
};

export default App;
