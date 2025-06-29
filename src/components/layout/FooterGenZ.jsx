import React from 'react';
import { Link } from 'react-router-dom';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const FooterGenZ = () => {
  return (
    <footer style={{
      background: 'linear-gradient(120deg, #764ba2 0%, #f093fb 50%, #f5576c 100%)',
      color: '#fff',
      fontFamily: genzFont,
      padding: '3rem 0 1.5rem',
      borderTop: `2px solid #feca57`,
      position: 'relative',
      overflow: 'hidden',
      width: '100vw',
    }}>
      {/* Playful stroke accents */}
      <div style={{ position: 'absolute', right: '15%', top: '18%', transform: 'rotate(15deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 60, height: 18 }} />
      </div>
      <div style={{ position: 'absolute', left: '10%', bottom: '30%', transform: 'rotate(-25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 40, height: 12 }} />
      </div>
      <div style={{ position: 'absolute', right: '5%', bottom: '20%', transform: 'rotate(10deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 50, height: 15 }} />
      </div>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 2rem',
        width: '100%',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '2.5rem',
          marginBottom: '2.5rem',
        }}>
          {/* Brand Section */}
          <div>
            <h3 style={{
              fontWeight: 900,
              fontSize: '2.1rem',
              color: '#feca57',
              marginBottom: '0.5rem',
              letterSpacing: '-1px',
            }}>
              BeniBites
            </h3>
            <p style={{
              fontSize: '1.15rem',
              lineHeight: 1.6,
              opacity: 0.85,
              fontWeight: 500,
              color: '#b6e0fe',
              marginBottom: '1.5rem',
            }}>
              Where restaurant workers discover amazing perks and benefits! <span role="img" aria-label="pizza">🍕</span> <span role="img" aria-label="sparkles">✨</span>
            </p>
            <div style={{ display: 'flex', gap: '1.2rem', marginTop: '1.5rem' }}>
              {["📱", "📧", "📷"].map((icon, i) => (
                <div key={i} style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #feca57',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                }}>
                  <span style={{ fontSize: '1.5rem' }}>{icon}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h5 style={{
              fontWeight: 800,
              fontSize: '1.25rem',
              marginBottom: '1.2rem',
              color: '#feca57',
              letterSpacing: '-0.5px',
            }}>
              Quick Links
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link to="/" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  transition: 'color 0.3s',
                  display: 'inline-block',
                  padding: '4px 0',
                }}>Home</Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link to="/search" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  transition: 'color 0.3s',
                  display: 'inline-block',
                  padding: '4px 0',
                }}>Find Restaurants</Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link to="/register" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  transition: 'color 0.3s',
                  display: 'inline-block',
                  padding: '4px 0',
                }}>Sign Up</Link>
              </li>
            </ul>
          </div>
          {/* For Businesses */}
          <div>
            <h5 style={{
              fontWeight: 800,
              fontSize: '1.25rem',
              marginBottom: '1.2rem',
              color: '#feca57',
              letterSpacing: '-0.5px',
            }}>
              For Businesses
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link to="/register-business" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  transition: 'color 0.3s',
                  display: 'inline-block',
                  padding: '4px 0',
                }}>Register Business</Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link to="/business-dashboard" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 700,
                  fontSize: '1.08rem',
                  transition: 'color 0.3s',
                  display: 'inline-block',
                  padding: '4px 0',
                }}>Business Dashboard</Link>
              </li>
            </ul>
          </div>
          {/* Stay Updated */}
          <div>
            <h5 style={{
              fontWeight: 800,
              fontSize: '1.25rem',
              marginBottom: '1.2rem',
              color: '#feca57',
              letterSpacing: '-0.5px',
            }}>
              Stay Updated
            </h5>
            <p style={{
              fontSize: '1.08rem',
              lineHeight: 1.5,
              opacity: 0.85,
              marginBottom: '1.5rem',
              color: '#b6e0fe',
            }}>
              Get the latest restaurant perks and exclusive offers delivered to your inbox! <span role="img" aria-label="tada">🎉</span>
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1,
                  minWidth: '180px',
                  padding: '1rem 1.2rem',
                  borderRadius: 18,
                  border: '2px solid #feca57',
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '1.08rem',
                  outline: 'none',
                  marginRight: 0,
                  marginBottom: '0.5rem',
                  width: '100%',
                  boxSizing: 'border-box',
                  display: 'block',
                }}
              />
              <button style={{
                background: 'linear-gradient(120deg, #feca57 0%, #4ecdc4 100%)',
                color: '#222',
                border: 'none',
                borderRadius: 18,
                padding: '1rem 2rem',
                fontFamily: genzFont,
                fontWeight: 700,
                fontSize: '1.08rem',
                cursor: 'pointer',
                transition: 'all 0.3s',
                boxShadow: '0 2px 8px rgba(102,126,234,0.10)',
                width: '100%',
                minWidth: '180px',
                display: 'block',
                marginTop: '0.5rem',
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
        {/* Bottom Section */}
        <div style={{
          borderTop: '1.5px solid #feca57',
          paddingTop: '1.5rem',
          textAlign: 'center',
          marginTop: '1.5rem',
          fontSize: '1.05rem',
          color: '#b6e0fe',
          opacity: 0.95,
          fontWeight: 500,
          letterSpacing: '0.01em',
        }}>
          © 2024 BeniBites. All rights reserved. Made with <span style={{ color: '#ff6b6b', fontWeight: 700 }}>❤️</span> for restaurant workers!
        </div>
      </div>
    </footer>
  );
};

export default FooterGenZ; 