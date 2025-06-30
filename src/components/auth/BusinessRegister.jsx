import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { registerBusiness, clearError } from '../../store/slices/authSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const BusinessRegister = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cuisine: '',
    website: '',
    employeeCount: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/business-dashboard');
    }
  }, [isAuthenticated, navigate]);

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
    const result = await dispatch(registerBusiness(formData));
    if (registerBusiness.fulfilled.match(result)) {
      navigate('/business-dashboard');
    }
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
      
      <div style={{ maxWidth: '700px', width: '100%', position: 'relative', zIndex: 2 }}>
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
                Register Your Restaurant!
              </h2>
              <p style={{
                color: genzColors.primary,
                fontSize: '1rem',
                opacity: 0.8,
                margin: 0
              }}>
                Join the community and start offering amazing perks to restaurant workers! 🍕✨
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
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Restaurant Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      placeholder="Restaurant name"
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
                      Restaurant name is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Owner's Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      required
                      placeholder="Owner's full name"
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
                      Owner name is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label style={{
                  color: genzColors.primary,
                  fontWeight: 700,
                  fontSize: '1rem'
                }}>
                  Business Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Business email address"
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

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="📞 Phone number"
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
                      Phone number is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Cuisine Type
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="cuisine"
                      value={formData.cuisine}
                      onChange={handleChange}
                      required
                      placeholder="🍽️ Cuisine type"
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
                      Cuisine type is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label style={{
                  color: genzColors.primary,
                  fontWeight: 700,
                  fontSize: '1rem'
                }}>
                  Restaurant Address
                </Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="🏠 Restaurant address"
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
                  Address is required.
                </Form.Control.Feedback>
              </Form.Group>

              <Row className="mb-3">
                <Col md={4}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      City
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="🏙️ City"
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
                      City is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      State
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      placeholder="🗺️ State"
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
                      State is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      ZIP Code
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      placeholder="📮 ZIP Code"
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
                      ZIP code is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Website (Optional)
                    </Form.Label>
                    <Form.Control
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="🌐 Website URL"
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
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Employee Count
                    </Form.Label>
                    <Form.Select
                      name="employeeCount"
                      value={formData.employeeCount}
                      onChange={handleChange}
                      required
                      style={{
                        padding: '1rem 1.2rem',
                        borderRadius: 20,
                        border: `2px solid ${genzColors.accent1}`,
                        background: 'rgba(255,255,255,0.9)',
                        color: genzColors.black,
                        fontFamily: genzFont,
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="">👥 Select employee count</option>
                      <option value="1-10">1-10 employees</option>
                      <option value="11-25">11-25 employees</option>
                      <option value="26-50">26-50 employees</option>
                      <option value="51-100">51-100 employees</option>
                      <option value="101-250">101-250 employees</option>
                      <option value="251-500">251-500 employees</option>
                      <option value="500+">500+ employees</option>
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                      Employee count is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <Form.Group>
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
                        minLength={8}
                        placeholder="Create password"
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
                      Password must be at least 8 characters.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Confirm Password
                    </Form.Label>
                    <div style={{ position: 'relative' }}>
                      <Form.Control
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        placeholder="Confirm password"
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
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
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
                        {showConfirmPassword ? '🙈' : '👁️'}
                      </button>
                    </div>
                    <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                      Please confirm your password.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

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
                  {loading ? 'Creating Business Account... 🔄' : 'Register Business ✨'}
                </Button>
              </div>
            </Form>

            <div className="text-center">
              <p className="mb-2" style={{ color: genzColors.primary }}>
                Already have a business account?{' '}
                <Link to="/login" style={{ color: genzColors.accent1, fontWeight: 700, textDecoration: 'none' }}>
                  Sign in here! 🔑
                </Link>
              </p>
              <p className="mb-0" style={{ color: genzColors.primary }}>
                Not a business?{' '}
                <Link to="/register" style={{ color: genzColors.accent2, fontWeight: 700, textDecoration: 'none' }}>
                  User Registration →
                </Link>
              </p>
            </div>

            {/* Benefits for Businesses */}
            <div style={{
              marginTop: '2rem',
              padding: '1.5rem',
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: 20,
              border: `2px solid ${genzColors.accent1}`
            }}>
              <h4 style={{
                color: genzColors.primary,
                fontWeight: 800,
                fontSize: '1.1rem',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                Why register your business? 🚀
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: genzColors.primary,
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  <span style={{ fontSize: '1.2rem' }}>👥</span>
                  Attract top talent
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: genzColors.primary,
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  <span style={{ fontSize: '1.2rem' }}>⭐</span>
                  Build your reputation
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: genzColors.primary,
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  <span style={{ fontSize: '1.2rem' }}>📊</span>
                  Track employee satisfaction
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: genzColors.primary,
                  fontSize: '0.9rem',
                  fontWeight: 600
                }}>
                  <span style={{ fontSize: '1.2rem' }}>🎯</span>
                  Stand out from competitors
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default BusinessRegister; 