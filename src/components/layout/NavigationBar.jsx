import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, Button } from 'react-bootstrap';
import forkKnifeLogo from '../../assets/fork-and-knife-cutlery-circle-interface-symbol-for-restaurant-svgrepo-com.svg';
import { genzColors, genzGradients, genzFont } from '../../genzTheme.jsx';

const NavigationBar = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      style={{
        background: 'rgba(255,255,255,0.98)',
        boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
        borderBottom: `2px solid ${genzColors.accent1}`,
        fontFamily: genzFont,
        position: 'relative',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        width: '100vw',
        minHeight: 64,
        padding: '0.5rem 0',
        margin: 0,
        maxWidth: 'none'
      }}
    >
      <Container fluid style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        padding: '0 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <Link to="/" style={{ 
          textDecoration: 'none', 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.5rem' 
        }}>
          <img 
            src={forkKnifeLogo} 
            alt="BeniBites logo" 
            style={{ 
              width: '2.2rem', 
              height: '2.2rem', 
              filter: 'drop-shadow(0 2px 8px #764ba2)' 
            }} 
          />
          <span style={{ 
            fontWeight: 900, 
            fontSize: '2.2rem', 
            background: genzGradients.button, 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            BeniBites
          </span>
        </Link>
        
        <Navbar.Toggle 
          aria-controls="navbar-genz-collapse" 
          style={{ 
            border: 'none', 
            background: 'transparent', 
            marginLeft: 8 
          }} 
        />
        
        <Navbar.Collapse 
          id="navbar-genz-collapse" 
          style={{ 
            background: 'transparent', 
            width: '100%', 
            borderRadius: 18, 
            marginTop: 8 
          }}
        >
          <Nav className="w-100 d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-end" style={{ gap: 12 }}>
            <Link 
              to="/search" 
              className="nav-link" 
              style={{
                color: genzColors.primary,
                fontWeight: 700,
                fontFamily: genzFont,
                fontSize: '1.1rem',
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 18,
                padding: '0.8rem 1.5rem',
                border: `2px solid ${genzColors.accent1}`,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
            >
              🔍 Find Restaurants
            </Link>
            
            <Link 
              to="/login" 
              className="nav-link" 
              style={{
                color: genzColors.primary,
                fontWeight: 700,
                fontFamily: genzFont,
                fontSize: '1.1rem',
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: 18,
                padding: '0.8rem 1.5rem',
                border: `2px solid ${genzColors.accent1}`,
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                display: 'inline-block'
              }}
            >
              🔑 Login
            </Link>
            
            <Dropdown as="span" className="d-inline-block">
              <Dropdown.Toggle 
                as={Button} 
                style={{ 
                  fontWeight: 700, 
                  fontFamily: genzFont, 
                  fontSize: '1.1rem', 
                  borderRadius: 18, 
                  padding: '0.8rem 1.5rem', 
                  background: genzGradients.button, 
                  color: genzColors.black, 
                  border: `2px solid ${genzColors.accent1}`, 
                  marginLeft: 8, 
                  textTransform: 'uppercase', 
                  marginBottom: window.innerWidth < 992 ? 24 : 0
                }}
              >
                ✨ Sign Up
              </Dropdown.Toggle>
              <Dropdown.Menu align="end" style={{
                background: 'rgba(255,255,255,0.98)',
                border: `2px solid ${genzColors.accent1}`,
                borderRadius: 16,
                boxShadow: '0 8px 32px rgba(102,126,234,0.18)'
              }}>
                <Dropdown.Item as={Link} to="/register" style={{ color: genzColors.primary }}>👤 User Sign Up</Dropdown.Item>
                <Dropdown.Item as={Link} to="/register-business" style={{ color: genzColors.primary }}>🏪 Business Sign Up</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar; 