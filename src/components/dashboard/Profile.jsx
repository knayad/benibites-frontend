import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card, Alert, Row, Col, Badge, Modal } from 'react-bootstrap';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

// Add RoleUpgradeOptions component
function RoleUpgradeOptions({ user }) {
  const hasBusiness = user.roles?.includes('business');
  const hasEmployee = user.roles?.includes('employee');
  if ((hasBusiness && !hasEmployee) || (!hasBusiness && hasEmployee)) {
    return (
      <div className="next-level-message" style={{ background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 16px rgba(67,233,123,0.12)', textAlign: 'center', marginTop: '2rem' }}>
        <h3 style={{ fontWeight: 900, fontSize: '1.3rem', color: '#222', marginBottom: 8 }}>You’ve unlocked your next level! 🎉</h3>
        <p style={{ color: '#222', fontWeight: 600 }}>Explore your new features below.</p>
      </div>
    );
  }
  if (!hasBusiness && !hasEmployee) {
    return (
      <div className="role-upgrade-options" style={{ marginTop: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div className="upgrade-card" style={{ background: 'linear-gradient(90deg, #feca57 0%, #ff6b6b 100%)', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 16px rgba(254,202,87,0.12)', flex: 1, minWidth: 260 }}>
          <h3 style={{ fontWeight: 900, fontSize: '1.3rem', color: '#222', marginBottom: 8 }}>Ready to Flex as a Boss?</h3>
          <p style={{ color: '#222', fontWeight: 600, marginBottom: 16 }}>Claim your business and take control of your restaurant's vibe! 🍔✨</p>
          <button onClick={() => window.location.href='/business-claim'} style={{ background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', color: '#222', border: 'none', borderRadius: 16, padding: '0.8rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(67,233,123,0.12)' }}>
            Claim Business 🚀
          </button>
        </div>
        <div className="upgrade-card" style={{ background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 16px rgba(161,140,209,0.12)', flex: 1, minWidth: 260 }}>
          <h3 style={{ fontWeight: 900, fontSize: '1.3rem', color: '#222', marginBottom: 8 }}>Work Here? Get Perks!</h3>
          <p style={{ color: '#222', fontWeight: 600, marginBottom: 16 }}>Register as an employee and unlock exclusive benefits. 💸🍟</p>
          <button onClick={() => window.location.href='/employee-register'} style={{ background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', color: '#222', border: 'none', borderRadius: 16, padding: '0.8rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(247,151,30,0.12)' }}>
            Register as Employee 🌈
          </button>
        </div>
      </div>
    );
  }
  // If both roles
  return (
    <div className="complete-profile" style={{ background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 16px rgba(67,233,123,0.12)', flex: 1, minWidth: 260, textAlign: 'center', marginTop: '2rem' }}>
      <h3 style={{ fontWeight: 900, fontSize: '1.3rem', color: '#222', marginBottom: 8 }}>Profile Complete!</h3>
      <p style={{ color: '#222', fontWeight: 600 }}>You’re living the best of both worlds. Thanks for being awesome! 🎉</p>
    </div>
  );
}

const Profile = () => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [validated, setValidated] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documentLabel, setDocumentLabel] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    workplaceSize: user?.workplaceSize || ''
  });

  // Mock verification status - in real app, this would come from backend
  const isVerifiedEmployee = user?.verificationStatus === 'verified_employee';
  const isVerifiedBusiness = user?.verificationStatus === 'verified_business';
  const isPendingVerification = user?.verificationStatus === 'pending';
  const isUnverified = !user?.verificationStatus || user?.verificationStatus === 'unverified';

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        workplaceSize: user.workplaceSize || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
    // TODO: Implement profile update with backend
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      workplaceSize: user?.workplaceSize || ''
    });
    setIsEditing(false);
    setValidated(false);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const newFiles = files.map(file => ({
      id: Date.now() + Math.random(),
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      label: '',
      verificationType: '',
      status: 'pending'
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  };

  const handleDocumentLabel = (fileId, label, verificationType) => {
    setUploadedFiles(prev => prev.map(file => 
      file.id === fileId 
        ? { ...file, label, verificationType, status: 'submitted_for_review' }
        : file
    ));
    setShowDocumentModal(false);
    setSelectedDocument(null);
    setDocumentLabel('');
  };

  const getVerificationBadge = () => {
    if (isVerifiedEmployee) {
      return <Badge bg="success" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>✅ Verified Employee</Badge>;
    } else if (isVerifiedBusiness) {
      return <Badge bg="success" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>✅ Verified Business</Badge>;
    } else if (isPendingVerification) {
      return <Badge bg="warning" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>⏳ Verification Pending</Badge>;
    } else {
      return <Badge bg="secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>❌ Unverified</Badge>;
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: genzGradients.hero,
      fontFamily: genzFont,
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '1rem' : '2rem',
      paddingTop: isMobile ? '1rem' : '2rem'
    }}>
      {/* Playful stroke accents */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', transform: 'rotate(25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: isMobile ? 60 : 80, height: isMobile ? 18 : 24 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', transform: 'rotate(-15deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: isMobile ? 40 : 60, height: isMobile ? 12 : 18 }} />
      </div>
      <div style={{ position: 'absolute', top: '60%', left: '5%', transform: 'rotate(-10deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: isMobile ? 30 : 40, height: isMobile ? 9 : 12 }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <Card style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '1.5rem' : '2.5rem',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 2
        }}>
          <Card.Body style={{ padding: 0 }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: isMobile ? '1rem' : '2rem',
              marginBottom: isMobile ? '1.5rem' : '2rem',
              flexWrap: 'wrap'
            }}>
              <div style={{
                width: isMobile ? 80 : 100,
                height: isMobile ? 80 : 100,
                borderRadius: '50%',
                background: genzGradients.button,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: isMobile ? '2.5rem' : '3rem',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
              }}>
                👤
              </div>
              <div style={{ flex: 1, minWidth: isMobile ? '200px' : 'auto' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <h1 style={{
                    fontWeight: 900,
                    fontSize: isMobile ? '1.8rem' : '2.5rem',
                    background: genzGradients.button,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    margin: 0
                  }}>
                    Profile Settings
                  </h1>
                  <div style={{ fontSize: isMobile ? '1.8rem' : '2.5rem' }}>⚙️</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                  <p style={{
                    color: genzColors.primary,
                    fontSize: isMobile ? '1rem' : '1.1rem',
                    fontWeight: 500,
                    opacity: 0.8,
                    margin: 0
                  }}>
                    Keep your info fresh and up-to-date! 🔄
                  </p>
                  {getVerificationBadge()}
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Profile Form */}
        <Card style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '1.5rem' : '2.5rem',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 2
        }}>
          <Card.Body style={{ padding: 0 }}>
            {/* Header with Edit Button */}
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: isMobile ? '1.5rem' : '2rem',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              <h2 style={{
                color: genzColors.primary,
                fontWeight: 800,
                fontSize: isMobile ? '1.5rem' : '1.8rem',
                margin: 0
              }}>
                Personal Information 📝
              </h2>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                style={{
                  background: isEditing ? 'rgba(255, 107, 107, 0.2)' : genzGradients.button,
                  color: isEditing ? genzColors.accent2 : genzColors.black,
                  border: isEditing ? `2px solid ${genzColors.accent2}` : 'none',
                  borderRadius: isMobile ? 12 : 16,
                  padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
              </Button>
            </div>

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

            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      Full Name
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                      style={{
                        padding: '1rem 1.2rem',
                        borderRadius: 20,
                        border: `2px solid ${genzColors.accent1}`,
                        background: isEditing ? 'rgba(255,255,255,0.9)' : 'rgba(240,240,240,0.9)',
                        color: genzColors.black,
                        fontFamily: genzFont,
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    />
                    <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                      Please provide your full name.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      required
                      style={{
                        padding: '1rem 1.2rem',
                        borderRadius: 20,
                        border: `2px solid ${genzColors.accent1}`,
                        background: isEditing ? 'rgba(255,255,255,0.9)' : 'rgba(240,240,240,0.9)',
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
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <Form.Group>
                    <Form.Label style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      Phone Number
                    </Form.Label>
                    <Form.Control
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="📞 Phone number"
                      style={{
                        padding: '1rem 1.2rem',
                        borderRadius: 20,
                        border: `2px solid ${genzColors.accent1}`,
                        background: isEditing ? 'rgba(255,255,255,0.9)' : 'rgba(240,240,240,0.9)',
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
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      Location
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      placeholder="🗺️ City, State"
                      style={{
                        padding: '1rem 1.2rem',
                        borderRadius: 20,
                        border: `2px solid ${genzColors.accent1}`,
                        background: isEditing ? 'rgba(255,255,255,0.9)' : 'rgba(240,240,240,0.9)',
                        color: genzColors.black,
                        fontFamily: genzFont,
                        fontSize: '1rem',
                        outline: 'none',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>

              {/* Workplace Size - Only show for verified employees or businesses */}
              {(isVerifiedEmployee || isVerifiedBusiness || isPendingVerification) && (
                <Form.Group className="mb-4">
                  <Form.Label style={{
                    color: genzColors.primary,
                    fontWeight: 700,
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}>
                    Workplace Size {isVerifiedEmployee && '👨‍💼'} {isVerifiedBusiness && '🏢'}
                  </Form.Label>
                  <Form.Select
                    name="workplaceSize"
                    value={formData.workplaceSize}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={{
                      padding: '1rem 1.2rem',
                      borderRadius: 20,
                      border: `2px solid ${genzColors.accent1}`,
                      background: isEditing ? 'rgba(255,255,255,0.9)' : 'rgba(240,240,240,0.9)',
                      color: genzColors.black,
                      fontFamily: genzFont,
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      cursor: isEditing ? 'pointer' : 'not-allowed'
                    }}
                  >
                    <option value="">👥 Select workplace size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-25">11-25 employees</option>
                    <option value="26-50">26-50 employees</option>
                    <option value="51-100">51-100 employees</option>
                    <option value="101-250">101-250 employees</option>
                    <option value="251-500">251-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </Form.Select>
                </Form.Group>
              )}

              {isEditing && (
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
              )}
            </Form>
          </Card.Body>
        </Card>

        {/* Document Upload Section */}
        <Card style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: isMobile ? 24 : 32,
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 2
        }}>
          <Card.Body style={{ padding: isMobile ? '1.5rem' : '2.5rem' }}>
            <h2 style={{
              color: genzColors.primary,
              fontWeight: 800,
              fontSize: isMobile ? '1.5rem' : '1.8rem',
              marginBottom: isMobile ? '1rem' : '1.5rem'
            }}>
              Documents & Files 📁
            </h2>
            
            <div style={{
              border: `2px dashed ${genzColors.accent1}`,
              borderRadius: isMobile ? 16 : 20,
              padding: isMobile ? '2rem' : '3rem',
              textAlign: 'center',
              background: 'rgba(102, 126, 234, 0.05)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.borderColor = genzColors.accent2;
              e.target.style.background = 'rgba(102, 126, 234, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.borderColor = genzColors.accent1;
              e.target.style.background = 'rgba(102, 126, 234, 0.05)';
            }}
            onClick={() => document.getElementById('file-upload').click()}>
              <div style={{ fontSize: isMobile ? '3rem' : '4rem', marginBottom: '1rem' }}>📤</div>
              <h3 style={{
                color: genzColors.primary,
                fontWeight: 700,
                fontSize: isMobile ? '1.2rem' : '1.4rem',
                marginBottom: '0.5rem'
              }}>
                Upload Documents
              </h3>
              <p style={{
                color: genzColors.primary,
                opacity: 0.8,
                fontSize: isMobile ? '0.9rem' : '1rem',
                marginBottom: '1rem'
              }}>
                Drag & drop files here or click to browse
              </p>
              <p style={{
                color: genzColors.primary,
                opacity: 0.6,
                fontSize: isMobile ? '0.8rem' : '0.9rem'
              }}>
                Supports PDF, DOC, JPG, PNG (Max 10MB)
              </p>
              <input
                id="file-upload"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                style={{ display: 'none' }}
                onChange={handleFileUpload}
              />
            </div>

            {/* Uploaded Files List */}
            <div style={{ marginTop: isMobile ? '1.5rem' : '2rem' }}>
              <h3 style={{
                color: genzColors.primary,
                fontWeight: 700,
                fontSize: isMobile ? '1.1rem' : '1.3rem',
                marginBottom: '1rem'
              }}>
                Uploaded Files 📋
              </h3>
              {uploadedFiles.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {uploadedFiles.map((file) => (
                    <Card key={file.id} style={{
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderRadius: 12,
                      border: `2px solid ${genzColors.accent1}`
                    }}>
                      <Card.Body style={{ padding: '1rem' }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          flexWrap: 'wrap',
                          gap: '0.5rem'
                        }}>
                          <div style={{ flex: 1 }}>
                            <h4 style={{
                              color: genzColors.primary,
                              fontWeight: 600,
                              fontSize: '1rem',
                              margin: 0,
                              marginBottom: '0.3rem'
                            }}>
                              {file.name}
                            </h4>
                            <p style={{
                              color: genzColors.primary,
                              opacity: 0.7,
                              fontSize: '0.9rem',
                              margin: 0
                            }}>
                              {(file.size / 1024 / 1024).toFixed(2)} MB • {file.uploadedAt.toLocaleDateString()}
                            </p>
                            {file.label && (
                              <Badge bg="info" style={{ marginTop: '0.5rem' }}>
                                {file.label} - {file.verificationType}
                              </Badge>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            {!file.label && (
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => {
                                  setSelectedDocument(file);
                                  setShowDocumentModal(true);
                                }}
                                style={{
                                  border: `2px solid ${genzColors.accent1}`,
                                  color: genzColors.accent1,
                                  borderRadius: 12,
                                  padding: '0.5rem 1rem',
                                  fontSize: '0.8rem'
                                }}
                              >
                                🏷️ Label
                              </Button>
                            )}
                            <Badge 
                              bg={file.status === 'submitted_for_review' ? 'warning' : 'secondary'}
                              style={{ fontSize: '0.8rem' }}
                            >
                              {file.status === 'submitted_for_review' ? '⏳ Review Pending' : '📄 Uploaded'}
                            </Badge>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
              ) : (
                <div style={{
                  background: 'rgba(102, 126, 234, 0.05)',
                  borderRadius: isMobile ? 12 : 16,
                  padding: isMobile ? '1rem' : '1.5rem',
                  border: `2px solid ${genzColors.accent1}`,
                  textAlign: 'center'
                }}>
                  <p style={{
                    color: genzColors.primary,
                    opacity: 0.7,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    fontStyle: 'italic',
                    margin: 0
                  }}>
                    No files uploaded yet. Upload your first document above! 📄
                  </p>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>

      {/* Document Labeling Modal */}
      <Modal show={showDocumentModal} onHide={() => setShowDocumentModal(false)} centered>
        <Modal.Header closeButton style={{ borderBottom: `2px solid ${genzColors.accent1}` }}>
          <Modal.Title style={{ color: genzColors.primary, fontWeight: 700 }}>
            🏷️ Label Document
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: genzColors.primary, fontWeight: 600 }}>
                Document Label
              </Form.Label>
              <Form.Control
                type="text"
                value={documentLabel}
                onChange={(e) => setDocumentLabel(e.target.value)}
                placeholder="e.g., Employee ID, Pay Stub, Restaurant Photo"
                style={{
                  borderRadius: 12,
                  border: `2px solid ${genzColors.accent1}`,
                  padding: '0.8rem 1rem'
                }}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label style={{ color: genzColors.primary, fontWeight: 600 }}>
                Verification Type
              </Form.Label>
              <Form.Select
                value={selectedDocument?.verificationType || ''}
                onChange={(e) => {
                  if (selectedDocument) {
                    setSelectedDocument({
                      ...selectedDocument,
                      verificationType: e.target.value
                    });
                  }
                }}
                style={{
                  borderRadius: 12,
                  border: `2px solid ${genzColors.accent1}`,
                  padding: '0.8rem 1rem'
                }}
              >
                <option value="">Select verification type</option>
                <option value="employee_verification">👨‍💼 Employee Verification</option>
                <option value="business_verification">🏢 Business Verification</option>
                <option value="restaurant_photo">📸 Restaurant Photo</option>
                <option value="pay_stub">💰 Pay Stub</option>
                <option value="employee_id">🆔 Employee ID</option>
                <option value="other">📄 Other</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: `2px solid ${genzColors.accent1}` }}>
          <Button
            variant="secondary"
            onClick={() => setShowDocumentModal(false)}
            style={{
              border: `2px solid ${genzColors.accent1}`,
              color: genzColors.accent1,
              borderRadius: 12
            }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              if (selectedDocument && documentLabel) {
                handleDocumentLabel(selectedDocument.id, documentLabel, selectedDocument.verificationType);
              }
            }}
            disabled={!documentLabel || !selectedDocument?.verificationType}
            style={{
              background: genzGradients.button,
              color: genzColors.black,
              border: '2px solid #222',
              borderRadius: 12
            }}
          >
            Submit for Review
          </Button>
        </Modal.Footer>
      </Modal>
      <RoleUpgradeOptions user={user || { roles: [] }} />
    </div>
  );
};

export default Profile; 