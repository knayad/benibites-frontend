import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card, Alert, Row, Col, Badge, Spinner, Modal } from 'react-bootstrap';
import { fetchRestaurantById } from '../../store/slices/restaurantsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';
import { getCuisineEmoji } from '../../utils/cuisineMap.js';

const BusinessClaimGenZ = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentRestaurant, loading } = useSelector((state) => state.restaurants);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    businessName: '',
    businessPhone: '',
    businessEmail: '',
    businessAddress: '',
    businessCity: '',
    businessState: '',
    businessZip: '',
    businessWebsite: '',
    businessHours: '',
    businessDescription: '',
    ownerName: '',
    ownerPhone: '',
    ownerEmail: '',
    verificationMethod: 'phone',
    agreeToTerms: false
  });
  const [validated, setValidated] = useState(false);
  const [claimStep, setClaimStep] = useState(1);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentRestaurant) {
      setFormData(prev => ({
        ...prev,
        businessName: currentRestaurant.name || '',
        businessAddress: currentRestaurant.address || '',
        businessCity: currentRestaurant.city || '',
        businessState: currentRestaurant.state || '',
        businessZip: currentRestaurant.zip || '',
        businessDescription: currentRestaurant.description || ''
      }));
    }
  }, [currentRestaurant]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNext = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    setClaimStep(prev => prev + 1);
  };

  const handleBack = () => {
    setClaimStep(prev => prev - 1);
  };

  const handleSubmitClaim = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // TODO: Implement backend claim submission
    console.log('Claim data:', formData);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowVerificationModal(true);
    }, 2000);
  };

  const handleVerificationSubmit = async () => {
    // TODO: Implement verification code validation
    console.log('Verification code:', verificationCode);
    
    // Simulate verification
    setTimeout(() => {
      setShowVerificationModal(false);
      setClaimStep(4);
    }, 1500);
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: genzGradients.hero,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: genzFont,
        color: '#fff',
        fontSize: '1.2rem'
      }}>
        <Spinner animation="border" style={{ color: genzColors.accent1, marginRight: '1rem' }} />
        Loading restaurant details...
      </div>
    );
  }

  if (!currentRestaurant) {
    return (
      <div style={{
        minHeight: '100vh',
        background: genzGradients.hero,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: genzFont,
        color: '#ff6b6b',
        fontSize: '1.2rem'
      }}>
        Restaurant not found
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: genzGradients.hero,
      fontFamily: genzFont,
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '64px'
    }}>
      <div style={{ position: 'absolute', top: '10%', left: '8%', transform: 'rotate(25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 80, height: 24 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', transform: 'rotate(-15deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 60, height: 18 }} />
      </div>

      <div className="container" style={{ padding: '2rem' }}>
        <Card style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 32,
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2,
          marginBottom: '3rem'
        }}>
          <Card.Body style={{ padding: '3rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: 100,
                height: 100,
                borderRadius: '50%',
                background: genzGradients.button,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '3rem',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
              }}>
                {getCuisineEmoji(currentRestaurant.cuisine)}
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{
                  fontWeight: 900,
                  fontSize: '2.5rem',
                  letterSpacing: '-2px',
                  background: genzGradients.button,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  Claim Your Business
                </h1>
                <p style={{
                  color: '#fff',
                  fontSize: '1.1rem',
                  fontWeight: 500,
                  opacity: 0.9
                }}>
                  Take control of {currentRestaurant.name} and manage your online presence!
                </p>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              position: 'relative'
            }}>
              {[
                { step: 1, label: 'Business Info', icon: '' },
                { step: 2, label: 'Owner Info', icon: '' },
                { step: 3, label: 'Verification', icon: '' },
                { step: 4, label: 'Complete', icon: '' }
              ].map((stepInfo, index) => (
                <div key={stepInfo.step} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  flex: 1,
                  position: 'relative'
                }}>
                  <div style={{
                    width: 50,
                    height: 50,
                    borderRadius: '50%',
                    background: claimStep >= stepInfo.step ? genzGradients.button : 'rgba(255, 255, 255, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    marginBottom: '0.5rem',
                    border: claimStep >= stepInfo.step ? '2px solid #222' : '2px solid rgba(255, 255, 255, 0.3)'
                  }}>
                    {stepInfo.icon}
                  </div>
                  <span style={{
                    color: '#fff',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    textAlign: 'center'
                  }}>
                    {stepInfo.label}
                  </span>
                  {index < 3 && (
                    <div style={{
                      position: 'absolute',
                      top: 25,
                      left: '60%',
                      width: '80%',
                      height: 2,
                      background: claimStep > stepInfo.step ? genzColors.accent1 : 'rgba(255, 255, 255, 0.2)',
                      zIndex: -1
                    }} />
                  )}
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 32,
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2
        }}>
          <Card.Body style={{ padding: '3rem' }}>
            {claimStep === 1 && (
              <Form noValidate validated={validated} onSubmit={handleNext}>
                <h2 style={{
                  color: genzColors.accent1,
                  fontWeight: 800,
                  fontSize: '2rem',
                  marginBottom: '2rem'
                }}>
                  Business Information
                </h2>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#fff', fontWeight: 600 }}>Business Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        required
                        style={{
                          borderRadius: 16,
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#fff',
                          padding: '1rem'
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#fff', fontWeight: 600 }}>Business Phone *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="businessPhone"
                        value={formData.businessPhone}
                        onChange={handleChange}
                        required
                        style={{
                          borderRadius: 16,
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#fff',
                          padding: '1rem'
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div style={{ textAlign: 'right', marginTop: '2rem' }}>
                  <Button
                    type="submit"
                    style={{
                      background: genzGradients.button,
                      color: genzColors.black,
                      border: '2px solid #222',
                      borderRadius: 20,
                      padding: '1rem 2rem',
                      fontWeight: 800,
                      fontSize: '1rem'
                    }}
                  >
                    Next Step
                  </Button>
                </div>
              </Form>
            )}

            {claimStep === 2 && (
              <Form noValidate validated={validated} onSubmit={handleNext}>
                <h2 style={{
                  color: genzColors.accent1,
                  fontWeight: 800,
                  fontSize: '2rem',
                  marginBottom: '2rem'
                }}>
                  Owner Information
                </h2>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#fff', fontWeight: 600 }}>Owner Name *</Form.Label>
                      <Form.Control
                        type="text"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        required
                        style={{
                          borderRadius: 16,
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#fff',
                          padding: '1rem'
                        }}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{ color: '#fff', fontWeight: 600 }}>Owner Phone *</Form.Label>
                      <Form.Control
                        type="tel"
                        name="ownerPhone"
                        value={formData.ownerPhone}
                        onChange={handleChange}
                        required
                        style={{
                          borderRadius: 16,
                          border: '2px solid rgba(255, 255, 255, 0.3)',
                          background: 'rgba(255, 255, 255, 0.1)',
                          color: '#fff',
                          padding: '1rem'
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                  <Button
                    onClick={handleBack}
                    variant="outline-light"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 20,
                      padding: '1rem 2rem',
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    type="submit"
                    style={{
                      background: genzGradients.button,
                      color: genzColors.black,
                      border: '2px solid #222',
                      borderRadius: 20,
                      padding: '1rem 2rem',
                      fontWeight: 800,
                      fontSize: '1rem'
                    }}
                  >
                    Next Step
                  </Button>
                </div>
              </Form>
            )}

            {claimStep === 3 && (
              <div>
                <h2 style={{
                  color: genzColors.accent1,
                  fontWeight: 800,
                  fontSize: '2rem',
                  marginBottom: '2rem'
                }}>
                  Verification & Terms
                </h2>
                
                <Alert variant="info" style={{
                  borderRadius: 16,
                  border: '2px solid rgba(102, 126, 234, 0.3)',
                  background: 'rgba(102, 126, 234, 0.1)',
                  color: '#fff',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{ color: genzColors.accent1, fontWeight: 700 }}>Verification Process</h4>
                  <p style={{ margin: 0 }}>
                    We'll verify your ownership of {currentRestaurant.name} using the phone method. 
                    This helps ensure only legitimate business owners can claim their listings.
                  </p>
                </Alert>

                <Form.Group className="mb-3">
                  <Form.Check
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    label={
                      <span style={{ color: '#fff' }}>
                        I agree to the Terms of Service and confirm that I am the authorized representative of this business
                      </span>
                    }
                    required
                  />
                </Form.Group>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
                  <Button
                    onClick={handleBack}
                    variant="outline-light"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 20,
                      padding: '1rem 2rem',
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleSubmitClaim}
                    disabled={!formData.agreeToTerms || isSubmitting}
                    style={{
                      background: genzGradients.button,
                      color: genzColors.black,
                      border: '2px solid #222',
                      borderRadius: 20,
                      padding: '1rem 2rem',
                      fontWeight: 800,
                      fontSize: '1rem',
                      opacity: formData.agreeToTerms ? 1 : 0.6
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <Spinner animation="border" size="sm" style={{ marginRight: '0.5rem' }} />
                        Submitting...
                      </>
                    ) : (
                      'Submit Claim Request'
                    )}
                  </Button>
                </div>
              </div>
            )}

            {claimStep === 4 && (
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}></div>
                <h2 style={{
                  color: genzColors.accent1,
                  fontWeight: 800,
                  fontSize: '2rem',
                  marginBottom: '1rem'
                }}>
                  Claim Request Submitted!
                </h2>
                <p style={{
                  color: '#fff',
                  fontSize: '1.1rem',
                  opacity: 0.9,
                  marginBottom: '2rem'
                }}>
                  We've received your claim request for {currentRestaurant.name}. Our team will review your submission and contact you within 2-3 business days to complete the verification process.
                </p>
                
                <Alert variant="success" style={{
                  borderRadius: 16,
                  border: '2px solid rgba(40, 167, 69, 0.3)',
                  background: 'rgba(40, 167, 69, 0.1)',
                  color: '#fff',
                  marginBottom: '2rem'
                }}>
                  <h4 style={{ color: '#28a745', fontWeight: 700 }}>What's Next?</h4>
                  <ul style={{ textAlign: 'left', margin: 0 }}>
                    <li>Check your email for confirmation</li>
                    <li>Prepare for verification (phone)</li>
                    <li>We'll contact you within 2-3 business days</li>
                    <li>Once verified, you'll get full business dashboard access</li>
                  </ul>
                </Alert>

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <Button
                    onClick={() => navigate(`/restaurant/${id}`)}
                    style={{
                      background: genzGradients.button,
                      color: genzColors.black,
                      border: '2px solid #222',
                      borderRadius: 20,
                      padding: '1rem 2rem',
                      fontWeight: 800,
                      fontSize: '1rem'
                    }}
                  >
                    View Restaurant Page
                  </Button>
                  <Button
                    onClick={() => navigate('/')}
                    variant="outline-light"
                    style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 20,
                      padding: '1rem 2rem',
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  >
                    Back to Home
                  </Button>
                </div>
              </div>
            )}
          </Card.Body>
        </Card>
      </div>

      <Modal
        show={showVerificationModal}
        onHide={() => setShowVerificationModal(false)}
        centered
        style={{ fontFamily: genzFont }}
      >
        <Modal.Header style={{
          background: genzGradients.button,
          borderBottom: '2px solid #222',
          borderRadius: '16px 16px 0 0'
        }}>
          <Modal.Title style={{ color: genzColors.black, fontWeight: 800 }}>
            Verification Required
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ padding: '2rem' }}>
          <p style={{ marginBottom: '1.5rem' }}>
            Please enter the verification code sent to your phone:
          </p>
          <Form.Control
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="Enter verification code"
            style={{
              borderRadius: 16,
              border: '2px solid rgba(102, 126, 234, 0.3)',
              padding: '1rem',
              fontSize: '1.1rem',
              textAlign: 'center',
              letterSpacing: '2px'
            }}
          />
        </Modal.Body>
        <Modal.Footer style={{
          borderTop: '2px solid rgba(102, 126, 234, 0.2)',
          borderRadius: '0 0 16px 16px'
        }}>
          <Button
            onClick={handleVerificationSubmit}
            style={{
              background: genzGradients.button,
              color: genzColors.black,
              border: '2px solid #222',
              borderRadius: 16,
              padding: '0.8rem 1.5rem',
              fontWeight: 700
            }}
          >
            Verify & Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default BusinessClaimGenZ;
