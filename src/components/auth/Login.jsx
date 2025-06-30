import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { login, clearError } from '../../store/slices/authSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, userType } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      if (userType === 'business') {
        navigate('/business-dashboard');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, userType, navigate]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    await dispatch(login(formData));
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: genzGradients.hero,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: genzFont,
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Playful stroke accents */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', transform: 'rotate(25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 80, height: 24 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', transform: 'rotate(-15deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 60, height: 18 }} />
      </div>
      <div style={{ position: 'absolute', top: '60%', left: '5%', transform: 'rotate(-10deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 40, height: 12 }} />
      </div>
      
      <div style={{ maxWidth: '500px', width: '100%', position: 'relative', zIndex: 2 }}>
        <Card style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: 32,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          border: `2px solid ${genzColors.accent1}`,
          overflow: 'hidden'
        }}>
          <Card.Body style={{ padding: '2.5rem 2rem' }}>
            <div className="text-center mb-4">
              <h2 style={{
                fontWeight: 900,
                fontSize: '2rem',
                background: genzGradients.button,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1.2rem'
              }}>
                Welcome Back!
              </h2>
              <p style={{
                color: genzColors.primary,
                fontSize: '1rem',
                opacity: 0.8,
                margin: 0
              }}>
                Ready to discover amazing restaurant perks? Let's get you back in! 🍕
              </p>
            </div>

            {error && (
              <Alert 
                variant="danger" 
                dismissible 
                onClose={() => dispatch(clearError())}
                style={{
                  background: 'rgba(255, 107, 107, 0.2)',
                  border: `2px solid ${genzColors.accent2}`,
                  borderRadius: 16,
                  color: genzColors.accent2,
                  fontWeight: 600,
                  borderColor: genzColors.accent2
                }}
              >
                {error}
              </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label style={{
                  color: genzColors.primary,
                  fontWeight: 700,
                  fontSize: '1rem'
                }}>
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email address"
                  style={{
                    padding: '1rem 1.2rem',
                    borderRadius: 20,
                    border: `2px solid ${genzColors.accent1}`,
                    background: 'rgba(255,255,255,0.9)',
                    color: genzColors.black,
                    fontFamily: genzFont,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
                <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                  Please provide a valid email address.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-4">
                <Form.Label style={{
                  color: genzColors.primary,
                  fontWeight: 700,
                  fontSize: '1rem'
                }}>
                  Password
                </Form.Label>
                <div style={{ position: 'relative' }}>
                  <Form.Control
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    placeholder="Enter your password"
                    style={{
                      padding: '1rem 1.2rem',
                      paddingRight: '3rem',
                      borderRadius: 20,
                      border: `2px solid ${genzColors.accent1}`,
                      background: 'rgba(255,255,255,0.9)',
                      color: genzColors.black,
                      fontFamily: genzFont,
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      background: 'none',
                      border: 'none',
                      color: genzColors.accent1,
                      cursor: 'pointer',
                      fontSize: '1.2rem'
                    }}
                  >
                    {showPassword ? '🙈' : '👁️'}
                  </button>
                </div>
                <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                  Please provide your password.
                </Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid mb-3">
                <Button 
                  type="submit" 
                  disabled={loading}
                  style={{
                    background: genzGradients.button,
                    color: genzColors.black,
                    border: 'none',
                    borderRadius: 20,
                    padding: '1rem 2rem',
                    fontFamily: genzFont,
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Signing In... 🔄' : 'Sign In ✨'}
                </Button>
              </div>

              <div className="text-center">
                <p className="mb-2" style={{ color: genzColors.primary }}>
                  Don't have an account?{' '}
                  <Link to="/register" style={{ color: genzColors.accent1, fontWeight: 700, textDecoration: 'none' }}>
                    Sign up here! 🚀
                  </Link>
                </p>
                <p className="mb-2" style={{ color: genzColors.primary }}>
                  <Link to="/forgot-password" style={{ color: genzColors.accent2, fontWeight: 700, textDecoration: 'none' }}>
                    Forgot your password? 🔑
                  </Link>
                </p>
                <p className="mb-0" style={{ color: genzColors.primary }}>
                  Are you a restaurant owner?{' '}
                  <Link to="/register-business" style={{ color: genzColors.accent1, fontWeight: 700, textDecoration: 'none', whiteSpace: 'nowrap' }}>
                    Register your business →
                  </Link>
                </p>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default Login; 