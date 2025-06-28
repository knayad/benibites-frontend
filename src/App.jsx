import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/layout/NavbarGenZ';
import Footer from './components/layout/FooterGenZ';
import HomeGenZ from './components/pages/HomeGenZ';
import SearchResultsGenZ from './components/pages/SearchResultsGenZ';
import RestaurantDetailGenZ from './components/pages/RestaurantDetailGenZ';
import LoginGenZ from './components/auth/LoginGenZ';
import RegisterGenZ from './components/auth/RegisterGenZ';
import BusinessRegisterGenZ from './components/auth/BusinessRegisterGenZ';
import DashboardGenZ from './components/dashboard/DashboardGenZ';
import BusinessDashboard from './components/dashboard/BusinessDashboard';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomeGenZ />} />
              <Route path="/search" element={<SearchResultsGenZ />} />
              <Route path="/restaurant/:id" element={<RestaurantDetailGenZ />} />
              <Route path="/login" element={<LoginGenZ />} />
              <Route path="/register" element={<RegisterGenZ />} />
              <Route path="/register-business" element={<BusinessRegisterGenZ />} />
              <Route path="/dashboard" element={<DashboardGenZ />} />
              <Route path="/business-dashboard" element={<BusinessDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
