import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout, selectUser, selectIsAuthenticated, selectIsBusiness } from '../../store/slices/authSlice';
import { Navbar, Nav, Container, Button, Dropdown } from 'react-bootstrap';
import forkKnifeLogo from '../../assets/fork-and-knife-cutlery-circle-interface-symbol-for-restaurant-svgrepo-com.svg';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const NavbarGenZ = () => {
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
      style={{
        background: genzGradients.hero,
        boxShadow: '0 6px 24px rgba(102,126,234,0.10)',
        borderBottom: `3px solid ${genzColors.accent1}`,
        fontFamily: genzFont,
        position: 'relative',
        zIndex: 10,
        width: '100vw',
        left: 0,
        right: 0,
        minHeight: 72,
        display: 'flex',
        alignItems: 'center',
        padding: '0 0.5rem',
        margin: 0,
        maxWidth: 'none',
      }}
      className="navbar-genz-no-sticky"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      {/* Logo always visible, fixed left */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        minWidth: 180,
        zIndex: 20,
        position: 'relative',
        flexShrink: 0
      }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src={forkKnifeLogo} alt="BeniBites logo" style={{ width: '2.2rem', height: '2.2rem', verticalAlign: 'middle', display: 'inline-block', filter: 'drop-shadow(0 2px 8px #764ba2)' }} />
          <span style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: '-1px', background: genzGradients.button, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>BeniBites</span>
        </Link>
      </div>
      {/* Playful stroke accent at the top left */}
      <div style={{ position: 'absolute', left: 0, top: -18, zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 80, height: 24 }} />
      </div>
      <Container style={{ display: 'flex', alignItems: 'center', flex: 1, justifyContent: 'flex-end' }}>
        <Nav className="me-auto d-flex align-items-center" style={{ gap: 18 }}>
          <Link
            to="/search"
            onClick={handleNavClick}
            style={{
              color: '#fff',
              fontWeight: 700,
              fontFamily: genzFont,
              fontSize: '1.1rem',
              background: 'rgba(255,255,255,0.18)',
              borderRadius: 18,
              padding: '8px 22px',
              marginRight: 8,
              border: '2px solid #fff',
              boxShadow: '0 2px 8px rgba(102,126,234,0.10)',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
              display: 'inline-block',
            }}
          >
            Find Restaurants
          </Link>
          {isBusiness && (
            <Link to="/business-dashboard" onClick={handleNavClick} style={{ color: '#fff', fontWeight: 700, fontFamily: genzFont, fontSize: '1.1rem', textDecoration: 'none', padding: '8px 18px', borderRadius: 14 }}>
              Dashboard
            </Link>
          )}
          {isAuthenticated && !isBusiness && (
            <Link to="/dashboard" onClick={handleNavClick} style={{ color: '#fff', fontWeight: 700, fontFamily: genzFont, fontSize: '1.1rem', textDecoration: 'none', padding: '8px 18px', borderRadius: 14 }}>
              Dashboard
            </Link>
          )}
        </Nav>
        <Nav className="d-flex align-items-center" style={{ gap: 18 }}>
          {isAuthenticated ? (
            <Dropdown align="end">
              <Dropdown.Toggle variant="link" className="nav-link dropdown-toggle d-flex align-items-center" style={{ color: '#fff', fontWeight: 700, fontFamily: genzFont, fontSize: '1.1rem', padding: '8px 18px', borderRadius: 14 }}>
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
              <Link
                to="/login"
                onClick={handleNavClick}
                style={{
                  color: genzColors.accent1,
                  fontWeight: 800,
                  fontFamily: genzFont,
                  fontSize: '1.1rem',
                  background: '#fff',
                  borderRadius: 18,
                  padding: '8px 22px',
                  marginLeft: 8,
                  border: '2px solid #feca57',
                  boxShadow: '0 2px 8px rgba(102,126,234,0.10)',
                  textDecoration: 'none',
                  transition: 'background 0.2s, color 0.2s',
                  display: 'inline-block',
                }}
              >
                Login
              </Link>
              <Button
                as={Link}
                to="/register"
                style={{
                  background: genzGradients.button,
                  color: genzColors.black,
                  fontWeight: 800,
                  border: 'none',
                  borderRadius: 18,
                  padding: '10px 24px',
                  fontFamily: genzFont,
                  letterSpacing: '1px',
                  boxShadow: '0 6px 16px rgba(102,126,234,0.18)',
                  marginLeft: 8,
                  textTransform: 'uppercase',
                }}
                onClick={handleNavClick}
              >
                Sign Up
              </Button>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavbarGenZ; 