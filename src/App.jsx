import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import NavigationBar from './components/layout/NavigationBar';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import SearchResults from './components/pages/SearchResults';
import RestaurantDetail from './components/pages/RestaurantDetail';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BusinessRegister from './components/auth/BusinessRegister';
import Dashboard from './components/dashboard/Dashboard';
import BusinessDashboard from './components/dashboard/BusinessDashboard';
import WriteReview from './components/pages/WriteReview';
import WriteEmployeeReview from './components/pages/WriteEmployeeReview';
import Profile from './components/dashboard/Profile';
import MyReviews from './components/dashboard/MyReviews';
import ForgotPassword from './components/auth/ForgotPassword';
import NotFound from './components/pages/NotFound';
import AdminDashboard from './components/dashboard/AdminDashboard';
import BusinessClaim from './components/pages/BusinessClaim';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <NavigationBar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/restaurant/:id" element={<RestaurantDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/business-dashboard" element={<BusinessDashboard />} />
              <Route path="/write-review/:id" element={<WriteReview />} />
              <Route path="/write-employee-review/:id" element={<WriteEmployeeReview />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/my-reviews" element={<MyReviews />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/business-claim/:id" element={<BusinessClaim />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
