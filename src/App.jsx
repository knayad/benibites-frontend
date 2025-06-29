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
import BusinessDashboardGenZ from './components/dashboard/BusinessDashboardGenZ';
import BusinessLoginGenZ from './components/auth/BusinessLoginGenZ';
import WriteReviewGenZ from './components/pages/WriteReviewGenZ';
import WriteEmployeeReviewGenZ from './components/pages/WriteEmployeeReviewGenZ';
import ProfileGenZ from './components/dashboard/ProfileGenZ';
import MyReviewsGenZ from './components/dashboard/MyReviewsGenZ';
import ForgotPasswordGenZ from './components/auth/ForgotPasswordGenZ';
import BusinessForgotPasswordGenZ from './components/auth/BusinessForgotPasswordGenZ';
import NotFoundGenZ from './components/pages/NotFoundGenZ';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<HomeGenZ />} />
              <Route path="/search" element={<SearchResultsGenZ />} />
              <Route path="/restaurant/:id" element={<RestaurantDetailGenZ />} />
              <Route path="/login" element={<LoginGenZ />} />
              <Route path="/register" element={<RegisterGenZ />} />
              <Route path="/register-business" element={<BusinessRegisterGenZ />} />
              <Route path="/dashboard" element={<DashboardGenZ />} />
              <Route path="/business-dashboard" element={<BusinessDashboardGenZ />} />
              <Route path="/business-login" element={<BusinessLoginGenZ />} />
              <Route path="/write-review/:id" element={<WriteReviewGenZ />} />
              <Route path="/write-employee-review/:id" element={<WriteEmployeeReviewGenZ />} />
              <Route path="/profile" element={<ProfileGenZ />} />
              <Route path="/my-reviews" element={<MyReviewsGenZ />} />
              <Route path="/forgot-password-genz" element={<ForgotPasswordGenZ />} />
              <Route path="/business-forgot-password-genz" element={<BusinessForgotPasswordGenZ />} />
              <Route path="*" element={<NotFoundGenZ />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
