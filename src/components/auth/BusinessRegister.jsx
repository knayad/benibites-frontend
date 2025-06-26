import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { register, clearError } from '../../store/slices/authSlice';

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
    website: ''
  });
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

    if (formData.password !== formData.confirmPassword) {
      setValidated(true);
      return;
    }

    setValidated(true);
    
    // Prepare user data for registration
    const userData = {
      name: formData.ownerName,
      email: formData.email,
      password: formData.password,
      roles: ['business'] // Set role as business
    };

    // Register the user first
    const result = await dispatch(register(userData));
    
    // If registration is successful, we can create the restaurant profile
    // This would typically be done in a separate step or through a different endpoint
    if (!result.error) {
      // Navigate to business dashboard where they can add their restaurant
      navigate('/business-dashboard');
    }
  };

  const cuisines = [
    'American', 'Italian', 'Mexican', 'Chinese', 'Japanese', 'Thai', 
    'Indian', 'French', 'Mediterranean', 'Greek', 'Spanish', 'Korean',
    'Vietnamese', 'Middle Eastern', 'Caribbean', 'African', 'Fusion'
  ];

  return (
    <div
      className="main-content"
      style={{
        background: 'linear-gradient(rgba(20,20,20,0.85), rgba(20,20,20,0.85))',
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div style={{ maxWidth: '600px', width: '100%' }}>
        <Card className="search-form">
          <Card.Body>
            <div className="text-center mb-4">
              <h2 style={{ color: 'var(--text-primary)' }}>Register Your Restaurant</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Join BeniBites to showcase your benefits and attract great talent</p>
            </div>

            {error && (
              <Alert variant="danger" dismissible onClose={() => dispatch(clearError())}>
                {error}
              </Alert>
            )}

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Restaurant Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                      placeholder="Enter restaurant name"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide your restaurant name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Owner Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleChange}
                      required
                      placeholder="Enter owner name"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide the owner name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="Enter business email"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      placeholder="Enter business phone"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a phone number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Street Address</Form.Label>
                    <Form.Control
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      placeholder="Enter street address"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide the street address.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      placeholder="Enter city"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide the city.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      required
                      placeholder="Enter state"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide the state.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>ZIP Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleChange}
                      required
                      placeholder="Enter ZIP code"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide the ZIP code.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Cuisine Type</Form.Label>
                    <Form.Select
                      name="cuisine"
                      value={formData.cuisine}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select cuisine type</option>
                      {cuisines.map(cuisine => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid">
                      Please select a cuisine type.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Website (Optional)</Form.Label>
                    <Form.Control
                      type="url"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="Enter website URL"
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength={8}
                      placeholder="Enter password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please provide a password (minimum 8 characters).
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      placeholder="Confirm password"
                    />
                    <Form.Control.Feedback type="invalid">
                      Please confirm your password.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <div className="d-grid gap-2">
                <Button 
                  type="submit" 
                  variant="primary" 
                  size="lg"
                  disabled={loading}
                >
                  {loading ? 'Creating Account...' : 'Create Business Account'}
                </Button>
              </div>

              <div className="text-center mt-3">
                <p style={{ color: 'var(--text-secondary)' }}>
                  Already have an account? <Link to="/login" style={{ color: 'var(--accent-color)' }}>Sign In</Link>
                </p>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default BusinessRegister; 