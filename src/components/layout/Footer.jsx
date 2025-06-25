import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-content">
          <div className="footer-section">
            <h5>BeniBites</h5>
            <p>
              Connecting restaurant workers with businesses that value their employees. 
              Find your next great opportunity or discover restaurants that care.
            </p>
          </div>
          
          <div className="footer-section">
            <h5>For Job Seekers</h5>
            <ul className="list-unstyled">
              <li><Link to="/search">Find Restaurants</Link></li>
              <li><Link to="/register">Create Account</Link></li>
              <li><Link to="/dashboard">My Dashboard</Link></li>
              <li><Link to="/dashboard/reviews">My Reviews</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h5>For Businesses</h5>
            <ul className="list-unstyled">
              <li><Link to="/register-business">Register Business</Link></li>
              <li><Link to="/business-dashboard">Business Dashboard</Link></li>
              <li><Link to="/business-dashboard/benefits">Manage Benefits</Link></li>
              <li><Link to="/business-dashboard/reviews">Respond to Reviews</Link></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h5>Support</h5>
            <ul className="list-unstyled">
              <li><Link to="/help">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/privacy">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 BeniBites. All rights reserved. Empowering restaurant workers and businesses.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer; 