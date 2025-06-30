import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { genzColors, genzGradients, genzFont } from '../../genzTheme.jsx';

const BusinessProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    businessName: user?.businessName || '',
    ownerName: user?.ownerName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    cuisine: user?.cuisine || '',
    website: user?.website || '',
    employeeCount: user?.employeeCount || ''
  });

  const cuisines = [
    'American', 'Italian', 'Mexican', 'Chinese', 'Japanese', 'Thai', 
    'Indian', 'French', 'Mediterranean', 'Greek', 'Spanish', 'Korean',
    'Vietnamese', 'Middle Eastern', 'Caribbean', 'African', 'Fusion'
  ];

  const employeeCountOptions = [
    '1-10 employees',
    '11-25 employees', 
    '26-50 employees',
    '51-100 employees',
    '101-250 employees',
    '251-500 employees',
    '500+ employees'
  ];

  useEffect(() => {
    if (user) {
      setFormData({
        businessName: user.businessName || '',
        ownerName: user.ownerName || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zipCode: user.zipCode || '',
        cuisine: user.cuisine || '',
        website: user.website || '',
        employeeCount: user.employeeCount || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    // TODO: Implement business profile update with backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      businessName: user?.businessName || '',
      ownerName: user?.ownerName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      zipCode: user?.zipCode || '',
      cuisine: user?.cuisine || '',
      website: user?.website || '',
      employeeCount: user?.employeeCount || ''
    });
    setIsEditing(false);
    setValidated(false);
  };

  return (
    <div>
      <h3 style={{
        color: genzColors.accent1,
        fontWeight: 800,
        fontSize: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        Business Profile 🏪
      </h3>

      {error && (
        <Alert 
          variant="danger" 
          dismissible 
          style={{
            background: 'rgba(255, 107, 107, 0.2)',
            border: `2px solid ${genzColors.accent2}`,
            borderRadius: 16,
            color: genzColors.accent2,
            fontWeight: 600,
            borderColor: genzColors.accent2,
            marginBottom: '1.5rem'
          }}
        >
          {error}
        </Alert>
      )}

      {!isEditing ? (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h4 style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.3rem'
            }}>
              Restaurant Information
            </h4>
            <Button
              onClick={() => setIsEditing(true)}
              style={{
                background: genzGradients.button,
                color: genzColors.black,
                border: 'none',
                borderRadius: 16,
                padding: '0.8rem 1.5rem',
                fontFamily: genzFont,
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              ✏️ Edit Profile
            </Button>
          </div>

          <Row>
            <Col md={6} lg={4}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1rem'
              }}>
                <Card.Body>
                  <h5 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    Business Name
                  </h5>
                  <p style={{ color: '#fff', opacity: 0.9 }}>
                    {formData.businessName || 'Not set'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1rem'
              }}>
                <Card.Body>
                  <h5 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    Owner Name
                  </h5>
                  <p style={{ color: '#fff', opacity: 0.9 }}>
                    {formData.ownerName || 'Not set'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1rem'
              }}>
                <Card.Body>
                  <h5 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    Email
                  </h5>
                  <p style={{ color: '#fff', opacity: 0.9 }}>
                    {formData.email || 'Not set'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1rem'
              }}>
                <Card.Body>
                  <h5 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    Phone
                  </h5>
                  <p style={{ color: '#fff', opacity: 0.9 }}>
                    {formData.phone || 'Not set'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1rem'
              }}>
                <Card.Body>
                  <h5 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    Cuisine Type
                  </h5>
                  <p style={{ color: '#fff', opacity: 0.9 }}>
                    {formData.cuisine || 'Not set'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1rem'
              }}>
                <Card.Body>
                  <h5 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    Employee Count
                  </h5>
                  <p style={{ color: '#fff', opacity: 0.9 }}>
                    {formData.employeeCount || 'Not set'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1rem'
              }}>
                <Card.Body>
                  <h5 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    Address
                  </h5>
                  <p style={{ color: '#fff', opacity: 0.9 }}>
                    {formData.address || 'Not set'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1rem'
              }}>
                <Card.Body>
                  <h5 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    City
                  </h5>
                  <p style={{ color: '#fff', opacity: 0.9 }}>
                    {formData.city || 'Not set'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1rem'
              }}>
                <Card.Body>
                  <h5 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    State
                  </h5>
                  <p style={{ color: '#fff', opacity: 0.9 }}>
                    {formData.state || 'Not set'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1rem'
              }}>
                <Card.Body>
                  <h5 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    ZIP Code
                  </h5>
                  <p style={{ color: '#fff', opacity: 0.9 }}>
                    {formData.zipCode || 'Not set'}
                  </p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={6} lg={4}>
              <Card style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.2)',
                marginBottom: '1rem'
              }}>
                <Card.Body>
                  <h5 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    Website
                  </h5>
                  <p style={{ color: '#fff', opacity: 0.9 }}>
                    {formData.website || 'Not set'}
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      ) : (
        <Card style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          border: '2px solid rgba(255, 255, 255, 0.2)',
          padding: '2rem'
        }}>
          <Card.Body style={{ padding: 0 }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '2rem'
            }}>
              <h4 style={{
                color: '#fff',
                fontWeight: 700,
                fontSize: '1.3rem'
              }}>
                Edit Business Information
              </h4>
              <Button
                onClick={handleCancel}
                variant="outline-secondary"
                style={{
                  border: `2px solid ${genzColors.accent1}`,
                  color: genzColors.accent1,
                  borderRadius: 16,
                  padding: '0.8rem 1.5rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: '1rem',
                  background: 'transparent'
                }}
              >
                ❌ Cancel
              </Button>
            </div>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.accent1,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Business Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="businessName"
                      value={formData.businessName}
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
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                      Business name is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.accent1,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Owner Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="ownerName"
                      value={formData.ownerName}
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
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                      Owner name is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.accent1,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Email
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
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
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                      Please provide a valid email address.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.accent1,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Phone
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
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
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                      Phone number is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.accent1,
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}>
                      Cuisine Type
                    </Form.Label>
                    <Form.Select
                      name="cuisine"
                      value={formData.cuisine}
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
                      <option value="">🍽️ Select cuisine type</option>
                      {cuisines.map(cuisine => (
                        <option key={cuisine} value={cuisine}>{cuisine}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                      Cuisine type is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.accent1,
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
                      {employeeCountOptions.map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                      Employee count is required.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3">
                <Form.Label style={{
                  color: genzColors.accent1,
                  fontWeight: 700,
                  fontSize: '1rem'
                }}>
                  Address
                </Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
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
                      color: genzColors.accent1,
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
                      color: genzColors.accent1,
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
                      color: genzColors.accent1,
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

              <Form.Group className="mb-4">
                <Form.Label style={{
                  color: genzColors.accent1,
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

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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
                    fontSize: '1rem',
                    cursor: loading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.3s ease',
                    opacity: loading ? 0.7 : 1
                  }}
                >
                  {loading ? 'Saving... 🔄' : '💾 Save Changes'}
                </Button>
                <Button
                  type="button"
                  onClick={handleCancel}
                  variant="outline-secondary"
                  style={{
                    border: `2px solid ${genzColors.accent1}`,
                    color: genzColors.accent1,
                    borderRadius: 20,
                    padding: '1rem 2rem',
                    fontFamily: genzFont,
                    fontWeight: 700,
                    fontSize: '1rem',
                    background: 'transparent',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ❌ Cancel
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default BusinessProfile; 