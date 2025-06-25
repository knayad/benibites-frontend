import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import SearchResults from './components/pages/SearchResults';
import RestaurantDetail from './components/pages/RestaurantDetail';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BusinessRegister from './components/auth/BusinessRegister';
import Dashboard from './components/dashboard/Dashboard';
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
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/register-business" element={<BusinessRegister />} />
              <Route path="/dashboard" element={<Dashboard />} />
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
