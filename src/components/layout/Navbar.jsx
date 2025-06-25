import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser, selectIsAuthenticated, selectIsBusiness } from '../../store/slices/authSlice';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import forkKnifeLogo from '../../assets/fork-and-knife-cutlery-circle-interface-symbol-for-restaurant-svgrepo-com.svg';

const NavigationBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isBusiness = useSelector(selectIsBusiness);
  const [expanded, setExpanded] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout());
    navigate('/');
    setExpanded(false);
  };

  const handleNavClick = () => {
    setExpanded(false);
  };

  return (
    <Navbar 
      expand="lg" 
      className="navbar"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="navbar-brand">
          <span style={{ fontSize: '2.2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src={forkKnifeLogo} alt="BeniBites logo" style={{ width: '2.2rem', height: '2.2rem', verticalAlign: 'middle', display: 'inline-block' }} />
            <span style={{ fontWeight: 800, fontSize: '2.2rem', letterSpacing: '1px', color: '#ff6b35' }}>BeniBites</span>
          </span>
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/search" onClick={handleNavClick}>
              Find Restaurants
            </Nav.Link>
            {isBusiness && (
              <Nav.Link as={Link} to="/business-dashboard" onClick={handleNavClick}>
                Dashboard
              </Nav.Link>
            )}
            {isAuthenticated && !isBusiness && (
              <Nav.Link as={Link} to="/dashboard" onClick={handleNavClick}>
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          
          <Nav>
            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="link" className="nav-link dropdown-toggle">
                  {user?.name || 'Account'}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown-menu-dark">
                  <Dropdown.Item as={Link} to="/dashboard" onClick={handleNavClick}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/dashboard/reviews" onClick={handleNavClick}>
                    My Reviews
                  </Dropdown.Item>
                  {isBusiness && (
                    <Dropdown.Item as={Link} to="/business-dashboard" onClick={handleNavClick}>
                      Business Dashboard
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={handleLogout}>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" onClick={handleNavClick}>
                  Login
                </Nav.Link>
                <Button 
                  as={Link} 
                  to="/register" 
                  className="btn-signup"
                  onClick={handleNavClick}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 