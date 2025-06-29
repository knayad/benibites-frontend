import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Alert } from 'react-bootstrap';
import { genzColors, genzGradients, genzFont } from '../../genzTheme.jsx';

const BusinessForgotPasswordGenZ = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError('Oops! Something went wrong. Try again? 🤔');
    } finally {
      setIsLoading(false);
    }
  };

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

      <div style={{
        background: 'rgba(255,255,255,0.98)',
        borderRadius: 32,
        padding: '2rem 1rem',
        maxWidth: 500,
        width: '100%',
        margin: '40px auto',
        border: `2px solid ${genzColors.accent1}`,
        boxShadow: '0 12px 32px rgba(102,126,234,0.18)',
        position: 'relative',
        zIndex: 2,
        boxSizing: 'border-box',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <h1 style={{
              fontWeight: 900,
              fontSize: '2.5rem',
              background: genzGradients.button,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: 0
            }}>
              Business Password Reset
            </h1>
            <span style={{ fontSize: '2.5rem' }}>🏢</span>
          </div>
          <p style={{
            color: genzColors.primary,
            fontSize: '1.1rem',
            fontWeight: 500,
            opacity: 0.8,
            margin: 0
          }}>
            Let's get your business account back up and running! 🔧
          </p>
        </div>

        {!isSubmitted ? (
          <Form onSubmit={handleSubmit}>
            {error && (
              <Alert variant="danger" style={{
                borderRadius: 16,
                border: '2px solid #ff6b6b',
                background: 'rgba(255,107,107,0.1)',
                color: '#d63031',
                marginBottom: '1.5rem'
              }}>
                {error}
              </Alert>
            )}

            <Form.Group className="mb-4">
              <Form.Label style={{
                color: genzColors.primary,
                fontWeight: 700,
                fontSize: '1rem',
                marginBottom: '0.5rem'
              }}>
                Business Email 📧
              </Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your business email"
                required
                style={{
                  borderRadius: 16,
                  border: `2px solid ${genzColors.accent1}`,
                  padding: '1rem 1.2rem',
                  fontSize: '1rem',
                  background: 'rgba(255,255,255,0.9)',
                  color: genzColors.black,
                  fontFamily: genzFont
                }}
              />
            </Form.Group>

            <Button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                background: genzGradients.button,
                color: genzColors.black,
                border: '2px solid #222',
                borderRadius: 16,
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: 800,
                textTransform: 'uppercase',
                letterSpacing: '1px',
                marginBottom: '1.5rem'
              }}
            >
              {isLoading ? (
                <>
                  <span role="img" aria-label="loading">⏳</span> Sending Reset Link...
                </>
              ) : (
                <>
                  <span role="img" aria-label="send">📤</span> Send Reset Link
                </>
              )}
            </Button>
          </Form>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'rgba(76, 175, 80, 0.1)',
              borderRadius: 20,
              padding: '2rem',
              border: '2px solid #4caf50',
              marginBottom: '2rem'
            }}>
              <span style={{ fontSize: '3rem', marginBottom: '1rem', display: 'block' }}>✅</span>
              <h3 style={{
                color: genzColors.primary,
                fontWeight: 700,
                marginBottom: '1rem'
              }}>
                Check Your Business Email!
              </h3>
              <p style={{
                color: genzColors.primary,
                opacity: 0.8,
                margin: 0
              }}>
                We've sent a password reset link to <strong>{email}</strong>
              </p>
            </div>
          </div>
        )}

        {/* Back to Business Login */}
        <div style={{ textAlign: 'center' }}>
          <Link to="/business-login" style={{
            color: genzColors.primary,
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span role="img" aria-label="back">←</span> Back to Business Login
          </Link>
        </div>

        {/* Help Text */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(102,126,234,0.05)',
          borderRadius: 16,
          border: `1px solid ${genzColors.accent1}`
        }}>
          <p style={{
            color: genzColors.primary,
            opacity: 0.7,
            fontSize: '0.9rem',
            margin: 0
          }}>
            <span role="img" aria-label="tip">💡</span> Can't find the email? Check your spam folder or contact your IT team!
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .forgot-card {
            padding: 1.2rem 0.3rem !important;
            border-radius: 18px !important;
            max-width: 98vw !important;
          }
        }
      `}</style>
    </div>
  );
};

export default BusinessForgotPasswordGenZ; 