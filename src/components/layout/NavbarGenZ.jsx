import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, Dropdown, Button } from 'react-bootstrap';
import forkKnifeLogo from '../../assets/fork-and-knife-cutlery-circle-interface-symbol-for-restaurant-svgrepo-com.svg';
import { genzColors, genzGradients, genzFont } from '../../genzTheme.jsx';

const NavbarGenZ = () => {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
      style={{
        background: 'linear-gradient(90deg, #fff 60%, #feca57 100%)',
        boxShadow: '0 6px 24px rgba(102,126,234,0.10)',
        borderBottom: `3px solid ${genzColors.accent1}`,
        fontFamily: genzFont,
        position: 'relative',
        zIndex: 10,
        width: '100vw',
        left: 0,
        right: 0,
        minHeight: 64,
        padding: '0 0.5rem',
        margin: 0,
        maxWidth: 'none',
      }}
    >
      <Container fluid style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: window.innerWidth >= 992 ? '0 2.5rem' : 0 }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <img src={forkKnifeLogo} alt="BeniBites logo" style={{ width: '2.2rem', height: '2.2rem', verticalAlign: 'middle', display: 'inline-block', filter: 'drop-shadow(0 2px 8px #764ba2)' }} />
          <span style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: '-1px', background: genzGradients.button, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display: 'inline-block' }}>BeniBites</span>
        </Link>
        <Navbar.Toggle aria-controls="navbar-genz-collapse" style={{ border: 'none', background: 'transparent', marginLeft: 8 }} />
        <Navbar.Collapse id="navbar-genz-collapse" style={{ background: 'transparent', width: '100vw', left: 0, right: 0, borderRadius: 18, marginTop: 8, boxShadow: '0 8px 32px rgba(102,126,234,0.10)' }}>
          <Nav className="w-100 d-flex flex-column flex-lg-row align-items-lg-center justify-content-lg-end" style={{ gap: 12 }}>
            <Link to="/search" className="nav-link" style={{
              color: genzColors.accent1,
              fontWeight: 700,
              fontFamily: genzFont,
              fontSize: '1.1rem',
              background: 'none',
              borderRadius: 18,
              padding: '8px 22px',
              border: `2px solid ${genzColors.accent1}`,
              boxShadow: '0 2px 8px rgba(102,126,234,0.10)',
              textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
              display: 'inline-block',
              marginLeft: window.innerWidth >= 992 ? 16 : 0,
              marginRight: window.innerWidth >= 992 ? 16 : 0
            }}>Find Restaurants</Link>
            <Dropdown as="span" className="d-inline-block">
              <Dropdown.Toggle as={Button} variant="outline-primary" style={{ fontWeight: 700, fontFamily: genzFont, fontSize: '1.1rem', borderRadius: 18, padding: '8px 22px', border: `2px solid ${genzColors.accent1}`, color: genzColors.accent1, background: 'none', marginLeft: 8 }}>Login</Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item as={Link} to="/login">User Login</Dropdown.Item>
                <Dropdown.Item as={Link} to="/business-login">Business Login</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Dropdown as="span" className="d-inline-block">
              <Dropdown.Toggle as={Button} style={{ fontWeight: 700, fontFamily: genzFont, fontSize: '1.1rem', borderRadius: 18, padding: '8px 22px', background: genzGradients.button, color: '#fff', border: `2px solid ${genzColors.accent1}`, marginLeft: 8, textTransform: 'uppercase', marginBottom: window.innerWidth < 992 ? 24 : 0, boxShadow: '0 2px 8px rgba(102,126,234,0.10)' }}>Sign Up</Dropdown.Toggle>
              <Dropdown.Menu align="end">
                <Dropdown.Item as={Link} to="/register">User Sign Up</Dropdown.Item>
                <Dropdown.Item as={Link} to="/register-business">Business Sign Up</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarGenZ; 