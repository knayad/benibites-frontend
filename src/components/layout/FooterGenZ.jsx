import React from 'react';
import { Link } from 'react-router-dom';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const FooterGenZ = () => {
  return (
    <footer style={{
      background: genzGradients.hero,
      color: '#fff',
      fontFamily: genzFont,
      padding: '3rem 0 2rem',
      borderTop: `3px solid ${genzColors.accent1}`,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Playful stroke accents */}
      <div style={{ position: 'absolute', right: '10%', top: 20, transform: 'rotate(15deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 60, height: 18 }} />
      </div>
      <div style={{ position: 'absolute', left: '15%', bottom: 40, transform: 'rotate(-25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 40, height: 12 }} />
      </div>
      
      <div className="container">
        <div className="row">
          <div className="col-lg-4 mb-4">
            <div style={{ marginBottom: '1.5rem' }}>
              <h3 style={{
                fontWeight: 900,
                fontSize: '2rem',
                letterSpacing: '-1px',
                background: genzGradients.button,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                BeniBites
              </h3>
              <p style={{
                fontSize: '1.1rem',
                lineHeight: 1.6,
                opacity: 1,
                fontWeight: 500,
                color: '#fff'
              }}>
                Where restaurant workers discover amazing perks and benefits! 🍕✨
              </p>
            </div>
            <div style={{
              display: 'flex',
              gap: '1rem',
              marginTop: '1.5rem'
            }}>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📱</span>
              </div>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📧</span>
              </div>
              <div style={{
                width: 44,
                height: 44,
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '2px solid rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}>
                <span style={{ fontSize: '1.2rem' }}>📷</span>
              </div>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 style={{
              fontWeight: 800,
              fontSize: '1.2rem',
              marginBottom: '1.2rem',
              color: genzColors.accent1
            }}>
              Quick Links
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link to="/" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'color 0.3s ease',
                  display: 'inline-block',
                  padding: '4px 0'
                }}>
                  Home
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link to="/search" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'color 0.3s ease',
                  display: 'inline-block',
                  padding: '4px 0'
                }}>
                  Find Restaurants
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link to="/register" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'color 0.3s ease',
                  display: 'inline-block',
                  padding: '4px 0'
                }}>
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 style={{
              fontWeight: 800,
              fontSize: '1.2rem',
              marginBottom: '1.2rem',
              color: genzColors.accent1
            }}>
              For Businesses
            </h5>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link to="/register-business" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'color 0.3s ease',
                  display: 'inline-block',
                  padding: '4px 0'
                }}>
                  Register Business
                </Link>
              </li>
              <li style={{ marginBottom: '0.8rem' }}>
                <Link to="/business-login" style={{
                  color: '#fff',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '1rem',
                  transition: 'color 0.3s ease',
                  display: 'inline-block',
                  padding: '4px 0'
                }}>
                  Business Sign In
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="col-lg-4 mb-4">
            <h5 style={{
              fontWeight: 800,
              fontSize: '1.2rem',
              marginBottom: '1.2rem',
              color: genzColors.accent1
            }}>
              Stay Updated
            </h5>
            <p style={{
              fontSize: '1rem',
              lineHeight: 1.5,
              opacity: 1,
              marginBottom: '1.5rem',
              color: '#fff'
            }}>
              Get the latest restaurant perks and exclusive offers delivered to your inbox! 🎉
            </p>
            <div style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '1rem'
            }}>
              <input
                type="email"
                placeholder="Your email address"
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: 20,
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '0.95rem',
                  outline: 'none'
                }}
              />
              <button style={{
                padding: '12px 20px',
                borderRadius: 20,
                background: genzGradients.button,
                color: genzColors.black,
                border: 'none',
                fontWeight: 700,
                fontFamily: genzFont,
                fontSize: '0.95rem',
                cursor: 'pointer',
                transition: 'transform 0.2s ease'
              }}>
                Subscribe
              </button>
            </div>
          </div>
        </div>
        
        <hr style={{
          border: 'none',
          height: '2px',
          background: `linear-gradient(90deg, transparent, ${genzColors.accent1}, transparent)`,
          margin: '2rem 0 1.5rem'
        }} />
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <p style={{
            margin: 0,
            fontSize: '0.9rem',
            opacity: 1,
            fontWeight: 500,
            color: '#fff'
          }}>
            © 2024 BeniBites. All rights reserved. Made with ❤️ for restaurant workers!
          </p>
          <div style={{
            display: 'flex',
            gap: '1.5rem',
            fontSize: '0.9rem'
          }}>
            <Link to="/privacy" style={{
              color: '#fff',
              textDecoration: 'none',
              opacity: 1,
              fontWeight: 500
            }}>
              Privacy Policy
            </Link>
            <Link to="/terms" style={{
              color: '#fff',
              textDecoration: 'none',
              opacity: 1,
              fontWeight: 500
            }}>
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterGenZ; 