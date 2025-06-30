import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { genzColors, genzGradients, genzFont } from '../../genzTheme.jsx';
import cookiesMeme from '../../assets/404cookies.jpg';

const NotFound = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [showCookie, setShowCookie] = useState(false);

  const funMessages = [
    "Oops! This page went on a lunch break 🍕",
    "Looks like this page ghosted us 👻",
    "This page is playing hide and seek 🕵️",
    "Page not found - probably getting coffee ☕",
    "This page is on vacation 🏖️",
    "404: Page decided to quit without notice 😅"
  ];

  const [currentMessage] = useState(() => 
    funMessages[Math.floor(Math.random() * funMessages.length)]
  );

  return (
    <div style={{
      background: genzGradients.hero,
      width: '100%',
      minHeight: 0,
      padding: '2rem 0.5rem',
      fontFamily: genzFont,
      position: 'relative',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Playful stroke accents */}
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '15%', left: '10%', transform: 'rotate(25deg)', zIndex: 1 }} aria-hidden="true">
        <path d="M10 30 Q 40 5, 60 30 T 110 30" stroke="#4ecdc4" strokeWidth="5" fill="none"/>
      </svg>
      <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', bottom: '20%', right: '15%', transform: 'rotate(-15deg)', zIndex: 1 }} aria-hidden="true">
        <path d="M5 25 Q 20 5, 40 25 T 75 25" stroke="#feca57" strokeWidth="4" fill="none"/>
      </svg>
      <svg width="100" height="36" viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '60%', left: '5%', transform: 'rotate(-10deg)', zIndex: 1 }} aria-hidden="true">
        <path d="M10 30 Q 40 5, 60 30 T 90 30" stroke="#764ba2" strokeWidth="5" fill="none"/>
      </svg>
      <svg width="90" height="32" viewBox="0 0 90 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '30%', right: '10%', transform: 'rotate(20deg)', zIndex: 1 }} aria-hidden="true">
        <path d="M5 25 Q 20 5, 45 25 T 85 25" stroke="#ff6b6b" strokeWidth="4" fill="none"/>
      </svg>

      <div style={{
        background: 'rgba(255,255,255,0.98)',
        borderRadius: 32,
        padding: '2rem 1rem',
        maxWidth: 600,
        width: '100%',
        margin: '40px auto',
        border: `2px solid ${genzColors.accent1}`,
        boxShadow: '0 12px 32px rgba(102,126,234,0.18)',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        boxSizing: 'border-box',
      }}>
        {/* 404 Number */}
        <div style={{
          fontSize: '8rem',
          fontWeight: 900,
          background: genzGradients.button,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1rem',
          lineHeight: 1,
          textShadow: '0 4px 8px rgba(0,0,0,0.1)'
        }}>
          404
        </div>

        {/* Fun Message */}
        <h1 style={{
          fontSize: '2rem',
          fontWeight: 700,
          color: genzColors.primary,
          marginBottom: '1rem'
        }}>
          {currentMessage}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '1.1rem',
          color: genzColors.primary,
          opacity: 0.8,
          marginBottom: '2rem'
        }}>
          Don't worry, we've got your back! Let's get you back to finding amazing restaurants.
        </p>

        {/* Fun Animation or Cookie Meme */}
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {!showCookie ? (
            <span
              style={{
                fontSize: '4rem',
                cursor: 'pointer',
                transition: 'transform 0.3s ease',
                transform: isHovered ? 'scale(1.2) rotate(10deg)' : 'scale(1) rotate(0deg)',
                display: 'inline-block'
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => setShowCookie(true)}
              role="img"
              aria-label="confused face"
              tabIndex={0}
            >
              🤔
            </span>
          ) : (
            <img
              src={cookiesMeme}
              alt="Medium rare cookies meme"
              style={{
                maxWidth: '100%',
                width: '320px',
                height: 'auto',
                borderRadius: '18px',
                boxShadow: '0 8px 32px rgba(254,202,87,0.18)',
                cursor: 'pointer',
                transition: 'transform 0.3s',
                display: 'block',
                margin: '0 auto'
              }}
              onClick={() => setShowCookie(false)}
              title="Medium rare cookies are the best cookies"
            />
          )}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          alignItems: 'center'
        }}>
          <Link to="/" style={{ textDecoration: 'none', width: '100%', maxWidth: '300px' }}>
            <Button
              style={{
                width: '100%',
                background: genzGradients.button,
                color: genzColors.black,
                border: '2px solid #222',
                borderRadius: 16,
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              <span role="img" aria-label="home">🏠</span> Go Home
            </Button>
          </Link>

          <Link to="/search" style={{ textDecoration: 'none', width: '100%', maxWidth: '300px' }}>
            <Button
              variant="outline"
              style={{
                width: '100%',
                background: 'rgba(255,255,255,0.9)',
                color: genzColors.primary,
                border: `2px solid ${genzColors.accent1}`,
                borderRadius: 16,
                padding: '1rem 2rem',
                fontSize: '1.1rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '1px'
              }}
            >
              <span role="img" aria-label="search">🔍</span> Search Restaurants
            </Button>
          </Link>
        </div>

        {/* Fun Stats */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(102,126,234,0.05)',
          borderRadius: 20,
          border: `1px solid ${genzColors.accent1}`
        }}>
          <p style={{
            color: genzColors.primary,
            opacity: 0.7,
            fontSize: '0.9rem',
            margin: 0
          }}>
            <span role="img" aria-label="fun fact">🎯</span> Fun fact: You're the 404th person to visit this page today! 
            <br />
            <span role="img" aria-label="restaurants">🍔</span> But we have thousands of real restaurants waiting for you!
          </p>
        </div>

        {/* Quick Links */}
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <Link to="/login" style={{
            color: genzColors.primary,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '0.5rem 1rem',
            borderRadius: 12,
            background: 'rgba(102,126,234,0.1)',
            border: `1px solid ${genzColors.accent1}`
          }}>
            Login
          </Link>
          <Link to="/register" style={{
            color: genzColors.primary,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '0.5rem 1rem',
            borderRadius: 12,
            background: 'rgba(102,126,234,0.1)',
            border: `1px solid ${genzColors.accent1}`
          }}>
            Register
          </Link>
          <Link to="/business-login" style={{
            color: genzColors.primary,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.9rem',
            padding: '0.5rem 1rem',
            borderRadius: 12,
            background: 'rgba(102,126,234,0.1)',
            border: `1px solid ${genzColors.accent1}`
          }}>
            Business Login
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .notfound-card {
            padding: 1.2rem 0.3rem !important;
            border-radius: 18px !important;
            max-width: 98vw !important;
          }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .floating-emoji {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default NotFound; 