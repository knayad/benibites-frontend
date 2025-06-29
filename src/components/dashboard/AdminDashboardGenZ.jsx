import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Nav, Tab, Badge, Spinner, Alert, Table, Modal, Form } from 'react-bootstrap';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const AdminDashboardGenZ = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [selectedVerification, setSelectedVerification] = useState(null);
  const [verificationDecision, setVerificationDecision] = useState('');
  const [verificationNotes, setVerificationNotes] = useState('');

  // Mock data - in real app, this would come from backend
  const [pendingVerifications, setPendingVerifications] = useState([
    {
      id: 1,
      userId: 'user123',
      userName: 'John Doe',
      userEmail: 'john@example.com',
      verificationType: 'employee_verification',
      documentLabel: 'Employee ID Card',
      documentUrl: '/uploads/employee_id_123.pdf',
      submittedAt: new Date('2024-01-15'),
      status: 'pending'
    },
    {
      id: 2,
      userId: 'user456',
      userName: 'Jane Smith',
      userEmail: 'jane@restaurant.com',
      verificationType: 'business_verification',
      documentLabel: 'Business License',
      documentUrl: '/uploads/business_license_456.pdf',
      submittedAt: new Date('2024-01-14'),
      status: 'pending'
    }
  ]);

  const [analytics] = useState({
    totalUsers: 1250,
    verifiedEmployees: 342,
    verifiedBusinesses: 89,
    pendingVerifications: 23,
    totalReviews: 5678,
    activeRestaurants: 234
  });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleVerificationReview = (verificationId, decision, notes) => {
    setPendingVerifications(prev => 
      prev.map(v => 
        v.id === verificationId 
          ? { ...v, status: decision, reviewedAt: new Date(), notes }
          : v
      )
    );
    setShowVerificationModal(false);
    setSelectedVerification(null);
    setVerificationDecision('');
    setVerificationNotes('');
  };

  const getVerificationTypeIcon = (type) => {
    const icons = {
      employee_verification: '👨‍💼',
      business_verification: '🏢',
      restaurant_photo: '📸',
      pay_stub: '💰',
      employee_id: '🆔',
      other: '📄'
    };
    return icons[type] || '📄';
  };

  const getStatusBadge = (status) => {
    const badges = {
      pending: <Badge bg="warning">⏳ Pending</Badge>,
      approved: <Badge bg="success">✅ Approved</Badge>,
      rejected: <Badge bg="danger">❌ Rejected</Badge>
    };
    return badges[status] || <Badge bg="secondary">Unknown</Badge>;
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

      <div style={{ maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <Card style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: isMobile ? 24 : 32,
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          position: 'relative',
          zIndex: 2
        }}>
          <Card.Body style={{ padding: isMobile ? '1.5rem' : '2.5rem' }}>
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
                👑
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
                    Admin Dashboard
                  </h1>
                  <Badge bg="danger" style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
                    🔐 Admin Only
                  </Badge>
                </div>
                <p style={{
                  color: genzColors.primary,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  fontWeight: 500,
                  opacity: 0.8,
                  margin: 0
                }}>
                  Manage users, verifications, and platform analytics! 📊
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: isMobile ? '1rem' : '1.5rem'
            }}>
              <Card style={{
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: isMobile ? 16 : 20,
                border: `2px solid ${genzColors.accent1}`,
                textAlign: 'center'
              }}>
                <Card.Body style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                  <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>👥</div>
                  <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                    {analytics.totalUsers}
                  </h3>
                  <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Total Users</p>
                </Card.Body>
              </Card>
              <Card style={{
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: isMobile ? 16 : 20,
                border: `2px solid ${genzColors.accent1}`,
                textAlign: 'center'
              }}>
                <Card.Body style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                  <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>⏳</div>
                  <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                    {analytics.pendingVerifications}
                  </h3>
                  <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Pending Reviews</p>
                </Card.Body>
              </Card>
              <Card style={{
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: isMobile ? 16 : 20,
                border: `2px solid ${genzColors.accent1}`,
                textAlign: 'center'
              }}>
                <Card.Body style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                  <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>🏢</div>
                  <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                    {analytics.activeRestaurants}
                  </h3>
                  <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Active Restaurants</p>
                </Card.Body>
              </Card>
              <Card style={{
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: isMobile ? 16 : 20,
                border: `2px solid ${genzColors.accent1}`,
                textAlign: 'center'
              }}>
                <Card.Body style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                  <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
                  <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                    {analytics.totalReviews}
                  </h3>
                  <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Total Reviews</p>
                </Card.Body>
              </Card>
            </div>
          </Card.Body>
        </Card>

        {/* Main Content */}
        <Card style={{
          borderRadius: isMobile ? 24 : 32,
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          background: 'rgba(255,255,255,0.98)',
          position: 'relative',
          zIndex: 2
        }}>
          <Card.Body style={{ padding: isMobile ? '1.5rem' : '2.5rem' }}>
            {/* Tab Navigation */}
            <Nav variant="tabs" style={{
              borderBottom: `2px solid ${genzColors.accent1}`,
              marginBottom: isMobile ? '1.5rem' : '2rem'
            }}>
              {['overview', 'verifications', 'users', 'analytics'].map((tab) => (
                <Nav.Item key={tab}>
                  <Nav.Link
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? genzGradients.button : 'transparent',
                      color: activeTab === tab ? genzColors.black : genzColors.primary,
                      border: 'none',
                      borderRadius: 16,
                      padding: '0.8rem 1.5rem',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textTransform: 'capitalize'
                    }}
                  >
                    {tab === 'overview' && '📊 Overview'}
                    {tab === 'verifications' && '✅ Verifications'}
                    {tab === 'users' && '👥 Users'}
                    {tab === 'analytics' && '📈 Analytics'}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            {/* Tab Content */}
            <Tab.Content>
              {activeTab === 'overview' && (
                <Tab.Pane active>
                  <h2 style={{
                    color: genzColors.primary,
                    fontWeight: 800,
                    fontSize: isMobile ? '1.5rem' : '1.8rem',
                    marginBottom: isMobile ? '1rem' : '1.5rem'
                  }}>
                    Platform Overview 📊
                  </h2>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    <Card style={{
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderRadius: 16,
                      border: `2px solid ${genzColors.accent1}`
                    }}>
                      <Card.Body>
                        <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '1rem' }}>
                          Recent Activity 🔥
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: genzColors.primary }}>New user registrations</span>
                            <Badge bg="success">+12 today</Badge>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: genzColors.primary }}>Pending verifications</span>
                            <Badge bg="warning">{analytics.pendingVerifications}</Badge>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: genzColors.primary }}>New reviews</span>
                            <Badge bg="info">+45 today</Badge>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                    <Card style={{
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderRadius: 16,
                      border: `2px solid ${genzColors.accent1}`
                    }}>
                      <Card.Body>
                        <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '1rem' }}>
                          Quick Actions ⚡
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => setActiveTab('verifications')}
                            style={{
                              background: genzGradients.button,
                              color: genzColors.black,
                              border: '2px solid #222',
                              borderRadius: 12
                            }}
                          >
                            Review Pending Verifications
                          </Button>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            style={{
                              border: `2px solid ${genzColors.accent1}`,
                              color: genzColors.accent1,
                              borderRadius: 12
                            }}
                          >
                            View User Reports
                          </Button>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            style={{
                              border: `2px solid ${genzColors.accent1}`,
                              color: genzColors.accent1,
                              borderRadius: 12
                            }}
                          >
                            Export Analytics
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                </Tab.Pane>
              )}

              {activeTab === 'verifications' && (
                <Tab.Pane active>
                  <h2 style={{
                    color: genzColors.primary,
                    fontWeight: 800,
                    fontSize: isMobile ? '1.5rem' : '1.8rem',
                    marginBottom: isMobile ? '1rem' : '1.5rem'
                  }}>
                    Verification Reviews ✅
                  </h2>
                  {pendingVerifications.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      {pendingVerifications.map((verification) => (
                        <Card key={verification.id} style={{
                          background: 'rgba(102, 126, 234, 0.05)',
                          borderRadius: 16,
                          border: `2px solid ${genzColors.accent1}`
                        }}>
                          <Card.Body>
                            <div style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                              flexWrap: 'wrap',
                              gap: '1rem'
                            }}>
                              <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                                  <span style={{ fontSize: '1.5rem' }}>
                                    {getVerificationTypeIcon(verification.verificationType)}
                                  </span>
                                  <h4 style={{
                                    color: genzColors.primary,
                                    fontWeight: 700,
                                    fontSize: '1.1rem',
                                    margin: 0
                                  }}>
                                    {verification.userName}
                                  </h4>
                                  {getStatusBadge(verification.status)}
                                </div>
                                <p style={{
                                  color: genzColors.primary,
                                  opacity: 0.8,
                                  margin: 0,
                                  marginBottom: '0.5rem'
                                }}>
                                  {verification.userEmail} • {verification.documentLabel}
                                </p>
                                <p style={{
                                  color: genzColors.primary,
                                  opacity: 0.6,
                                  fontSize: '0.9rem',
                                  margin: 0
                                }}>
                                  Submitted: {verification.submittedAt.toLocaleDateString()}
                                </p>
                              </div>
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <Button
                                  size="sm"
                                  variant="outline-primary"
                                  onClick={() => {
                                    setSelectedVerification(verification);
                                    setShowVerificationModal(true);
                                  }}
                                  style={{
                                    border: `2px solid ${genzColors.accent1}`,
                                    color: genzColors.accent1,
                                    borderRadius: 12
                                  }}
                                >
                                  Review
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline-secondary"
                                  style={{
                                    border: `2px solid ${genzColors.accent1}`,
                                    color: genzColors.accent1,
                                    borderRadius: 12
                                  }}
                                >
                                  View Doc
                                </Button>
                              </div>
                            </div>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card style={{
                      textAlign: 'center',
                      padding: '2rem',
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderRadius: 16,
                      border: `2px solid ${genzColors.accent1}`
                    }}>
                      <Card.Body>
                        <p style={{ color: genzColors.primary }}>
                          No pending verifications! All caught up! 🎉
                        </p>
                      </Card.Body>
                    </Card>
                  )}
                </Tab.Pane>
              )}

              {activeTab === 'users' && (
                <Tab.Pane active>
                  <h2 style={{
                    color: genzColors.primary,
                    fontWeight: 800,
                    fontSize: isMobile ? '1.5rem' : '1.8rem',
                    marginBottom: isMobile ? '1rem' : '1.5rem'
                  }}>
                    User Management 👥
                  </h2>
                  <Card style={{
                    background: 'rgba(102, 126, 234, 0.05)',
                    borderRadius: 16,
                    border: `2px solid ${genzColors.accent1}`
                  }}>
                    <Card.Body>
                      <p style={{ color: genzColors.primary, textAlign: 'center' }}>
                        User management features coming soon! 🚀
                      </p>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              )}

              {activeTab === 'analytics' && (
                <Tab.Pane active>
                  <h2 style={{
                    color: genzColors.primary,
                    fontWeight: 800,
                    fontSize: isMobile ? '1.5rem' : '1.8rem',
                    marginBottom: isMobile ? '1rem' : '1.5rem'
                  }}>
                    Analytics & Reports 📈
                  </h2>
                  <Card style={{
                    background: 'rgba(102, 126, 234, 0.05)',
                    borderRadius: 16,
                    border: `2px solid ${genzColors.accent1}`
                  }}>
                    <Card.Body>
                      <p style={{ color: genzColors.primary, textAlign: 'center' }}>
                        Advanced analytics dashboard coming soon! 📊
                      </p>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              )}
            </Tab.Content>
          </Card.Body>
        </Card>
      </div>

      {/* Verification Review Modal */}
      <Modal show={showVerificationModal} onHide={() => setShowVerificationModal(false)} size="lg" centered>
        <Modal.Header closeButton style={{ borderBottom: `2px solid ${genzColors.accent1}` }}>
          <Modal.Title style={{ color: genzColors.primary, fontWeight: 700 }}>
            🔍 Review Verification
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedVerification && (
            <div>
              <div style={{ marginBottom: '1.5rem' }}>
                <h4 style={{ color: genzColors.primary, marginBottom: '0.5rem' }}>
                  {selectedVerification.userName}
                </h4>
                <p style={{ color: genzColors.primary, opacity: 0.8, margin: 0 }}>
                  {selectedVerification.userEmail} • {selectedVerification.documentLabel}
                </p>
              </div>
              
              <div style={{
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: 12,
                padding: '1rem',
                marginBottom: '1.5rem',
                border: `2px solid ${genzColors.accent1}`
              }}>
                <h5 style={{ color: genzColors.primary, marginBottom: '0.5rem' }}>Document Preview</h5>
                <p style={{ color: genzColors.primary, opacity: 0.8, margin: 0 }}>
                  {selectedVerification.documentUrl}
                </p>
              </div>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: genzColors.primary, fontWeight: 600 }}>
                    Decision
                  </Form.Label>
                  <Form.Select
                    value={verificationDecision}
                    onChange={(e) => setVerificationDecision(e.target.value)}
                    style={{
                      borderRadius: 12,
                      border: `2px solid ${genzColors.accent1}`,
                      padding: '0.8rem 1rem'
                    }}
                  >
                    <option value="">Select decision</option>
                    <option value="approved">✅ Approve</option>
                    <option value="rejected">❌ Reject</option>
                    <option value="request_more_info">📝 Request More Info</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label style={{ color: genzColors.primary, fontWeight: 600 }}>
                    Notes (Optional)
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={verificationNotes}
                    onChange={(e) => setVerificationNotes(e.target.value)}
                    placeholder="Add any notes about your decision..."
                    style={{
                      borderRadius: 12,
                      border: `2px solid ${genzColors.accent1}`,
                      padding: '0.8rem 1rem'
                    }}
                  />
                </Form.Group>
              </Form>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer style={{ borderTop: `2px solid ${genzColors.accent1}` }}>
          <Button
            variant="secondary"
            onClick={() => setShowVerificationModal(false)}
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
              if (selectedVerification && verificationDecision) {
                handleVerificationReview(selectedVerification.id, verificationDecision, verificationNotes);
              }
            }}
            disabled={!verificationDecision}
            style={{
              background: genzGradients.button,
              color: genzColors.black,
              border: '2px solid #222',
              borderRadius: 12
            }}
          >
            Submit Decision
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default AdminDashboardGenZ; 