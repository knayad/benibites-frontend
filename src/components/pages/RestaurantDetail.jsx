import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Card, Button, Nav, Tab, Badge, Spinner, Alert } from 'react-bootstrap';
import { fetchRestaurantById } from '../../store/slices/restaurantsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';
import { getCuisineEmoji } from '../../utils/cuisineMap.js';

const RestaurantDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentRestaurant, loading, error } = useSelector((state) => state.restaurants);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);
  const [activeTab, setActiveTab] = useState('overview');
  const [isHiring, setIsHiring] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (currentRestaurant && typeof currentRestaurant.isHiring === 'boolean') {
      setIsHiring(currentRestaurant.isHiring);
    }
  }, [currentRestaurant]);

  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  const getVerificationBadge = (verificationStatus) => {
    if (verificationStatus === 'verified_employee') {
      return <Badge bg="success" style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>✅ Verified Employee</Badge>;
    } else if (verificationStatus === 'verified_business') {
      return <Badge bg="success" style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>✅ Verified Business</Badge>;
    } else if (verificationStatus === 'pending') {
      return <Badge bg="warning" style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>⏳ Verification Pending</Badge>;
    }
    return null;
  };

  const getBusinessClaimBadge = () => {
    if (currentRestaurant?.isClaimed) {
      return <Badge bg="info" style={{ fontSize: '0.9rem', marginLeft: '0.5rem' }}>🏢 Business Claimed</Badge>;
    } else {
      return <Badge bg="secondary" style={{ fontSize: '0.9rem', marginLeft: '0.5rem' }}>🏢 Unclaimed Business</Badge>;
    }
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
        fontSize: '1.2rem',
        fontWeight: 600
      }}>
        <Spinner animation="border" style={{ color: genzColors.accent1, marginRight: '1rem' }} />
        Loading restaurant details...
      </div>
    );
  }

  if (error || !currentRestaurant) {
    return (
      <div style={{
        minHeight: '100vh',
        background: genzGradients.hero,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: genzFont
      }}>
        <Alert variant="danger" style={{
          borderRadius: 16,
          border: '2px solid #ff6b6b',
          background: 'rgba(255,107,107,0.1)',
          color: '#d63031',
          fontSize: '1.3rem',
          fontWeight: 600
        }}>
          ❌ Restaurant not found or error loading details
        </Alert>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: genzGradients.hero,
      fontFamily: genzFont,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Playful stroke accents */}
      <div style={{ position: 'absolute', top: '15%', right: '10%', transform: 'rotate(-20deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 80, height: 24 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '25%', left: '8%', transform: 'rotate(25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 60, height: 18 }} />
      </div>

      <div className="container" style={{ padding: 'calc(2rem + 64px) 0 2rem 0' }}>
        {/* Restaurant Header */}
        <Card style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 32,
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          marginBottom: '3rem',
          position: 'relative',
          zIndex: 2
        }}>
          <Card.Body style={{ padding: '3rem' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              marginBottom: '2rem'
            }}>
              <div style={{
                width: 120,
                height: 120,
                borderRadius: '50%',
                background: genzGradients.button,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '4rem',
                boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
              }}>
                {getCuisineEmoji(currentRestaurant.cuisine)}
              </div>
              <div style={{ flex: 1 }}>
                <h1 style={{
                  fontWeight: 900,
                  fontSize: '3rem',
                  letterSpacing: '-2px',
                  background: genzGradients.button,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem'
                }}>
                  {currentRestaurant.name}
                </h1>
                <p style={{
                  color: genzColors.accent1,
                  fontWeight: 700,
                  fontSize: '1.2rem',
                  textTransform: 'capitalize',
                  marginBottom: '1rem'
                }}>
                  {currentRestaurant.cuisine} • {currentRestaurant.location}
                </p>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem'
                }}>
                  <span style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem' }}>
                    {getRatingStars(currentRestaurant.rating)}
                  </span>
                  <span style={{
                    color: '#fff',
                    fontWeight: 600,
                    fontSize: '1rem'
                  }}>
                    ({currentRestaurant.reviewCount} reviews)
                  </span>
                  {getBusinessClaimBadge()}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              flexWrap: 'wrap'
            }}>
              <Button
                variant="primary"
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
                📞 Contact Restaurant
              </Button>
              {!currentRestaurant.isClaimed && (
                <Button
                  as={Link}
                  to={`/business-claim/${currentRestaurant.id}`}
                  variant="warning"
                  style={{
                    background: 'linear-gradient(90deg, #feca57 0%, #ff6b6b 100%)',
                    color: '#222',
                    border: '2px solid #222',
                    borderRadius: 20,
                    padding: '1rem 2rem',
                    fontWeight: 800,
                    fontSize: '1rem'
                  }}
                >
                  🏢 Claim This Business
                </Button>
              )}
              {isAuthenticated && (
                <div style={{
                  display: 'flex',
                  gap: '0.5rem',
                  flexWrap: 'wrap'
                }}>
                  <Button
                    as={Link}
                    to={`/write-review/${currentRestaurant.id}`}
                    variant="outline-light"
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 20,
                      padding: '1rem 2rem',
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  >
                    ✍️ Write Review
                  </Button>
                  <Button
                    as={Link}
                    to={`/write-employee-review/${currentRestaurant.id}`}
                    variant="outline-warning"
                    style={{
                      background: 'rgba(254, 202, 87, 0.2)',
                      color: genzColors.accent1,
                      border: `2px solid ${genzColors.accent1}`,
                      borderRadius: 20,
                      padding: '1rem 2rem',
                      fontWeight: 700,
                      fontSize: '1rem'
                    }}
                  >
                    👨‍🍳 Employee Review
                  </Button>
                </div>
              )}
              <Button
                as={Link}
                to="/search"
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
                🔍 Back to Search
              </Button>
            </div>

            {isHiring && (
              <Badge
                bg="warning"
                style={{
                  position: 'absolute',
                  top: 18,
                  right: 18,
                  background: 'linear-gradient(90deg, #feca57 0%, #ff6b6b 100%)',
                  color: '#222',
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  borderRadius: 18,
                  padding: '0.7rem 1.5rem',
                  boxShadow: '0 2px 12px rgba(255,107,107,0.18)',
                  zIndex: 10,
                  animation: 'pulse 1.2s infinite alternate',
                  letterSpacing: '1px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10
                }}
              >
                <span role="img" aria-label="megaphone">📢</span> Now Hiring!
              </Badge>
            )}
          </Card.Body>
        </Card>

        {/* Tabs */}
        <Card style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          <Card.Body style={{ padding: '2rem' }}>
            {/* Tab Navigation */}
            <Nav variant="tabs" style={{
              borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
              marginBottom: '2rem'
            }}>
              {['overview', 'benefits', 'reviews', 'location'].map((tab) => (
                <Nav.Item key={tab}>
                  <Nav.Link
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? genzGradients.button : 'transparent',
                      color: activeTab === tab ? genzColors.black : '#fff',
                      border: 'none',
                      borderRadius: 16,
                      padding: '0.8rem 1.5rem',
                      fontWeight: 700,
                      fontSize: '1rem',
                      textTransform: 'capitalize'
                    }}
                  >
                    {tab === 'overview' && '📋 Overview'}
                    {tab === 'benefits' && '🎁 Benefits'}
                    {tab === 'reviews' && '⭐ Reviews'}
                    {tab === 'location' && '📍 Location'}
                  </Nav.Link>
                </Nav.Item>
              ))}
            </Nav>

            {/* Tab Content */}
            <Tab.Content>
              {activeTab === 'overview' && (
                <Tab.Pane active>
                  <h3 style={{
                    color: genzColors.accent1,
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    About {currentRestaurant.name}
                  </h3>
                  <p style={{
                    color: '#fff',
                    fontSize: '1.1rem',
                    lineHeight: 1.6,
                    opacity: 0.9,
                    marginBottom: '2rem'
                  }}>
                    {currentRestaurant.description}
                  </p>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    <Card style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 16,
                      textAlign: 'center'
                    }}>
                      <Card.Body style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🕒</div>
                        <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>Hours</h4>
                        <p style={{ color: '#fff', opacity: 0.8 }}>Mon-Sun: 11AM-10PM</p>
                      </Card.Body>
                    </Card>
                    <Card style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 16,
                      textAlign: 'center'
                    }}>
                      <Card.Body style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📞</div>
                        <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>Phone</h4>
                        <p style={{ color: '#fff', opacity: 0.8 }}>(555) 123-4567</p>
                      </Card.Body>
                    </Card>
                    <Card style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 16,
                      textAlign: 'center'
                    }}>
                      <Card.Body style={{ padding: '1.5rem' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌐</div>
                        <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>Website</h4>
                        <p style={{ color: '#fff', opacity: 0.8 }}>www.restaurant.com</p>
                      </Card.Body>
                    </Card>
                  </div>
                </Tab.Pane>
              )}

              {activeTab === 'benefits' && (
                <Tab.Pane active>
                  <h3 style={{
                    color: genzColors.accent1,
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    Employee Benefits & Perks 🎁
                  </h3>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                    gap: '1.5rem'
                  }}>
                    {currentRestaurant.benefits?.map((benefit, index) => (
                      <Card
                        key={index}
                        style={{
                          background: 'rgba(254, 202, 87, 0.1)',
                          border: '2px solid rgba(254, 202, 87, 0.3)',
                          borderRadius: 20,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <Card.Body style={{ padding: '1.5rem' }}>
                          <h4 style={{
                            color: genzColors.accent1,
                            fontWeight: 700,
                            fontSize: '1.1rem',
                            marginBottom: '0.5rem'
                          }}>
                            {benefit}
                          </h4>
                          <p style={{
                            color: '#fff',
                            opacity: 0.8,
                            fontSize: '0.95rem'
                          }}>
                            Amazing perk for restaurant workers!
                          </p>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Tab.Pane>
              )}

              {activeTab === 'reviews' && (
                <Tab.Pane active>
                  <h3 style={{
                    color: genzColors.accent1,
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    Customer Reviews ⭐
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                  }}>
                    {currentRestaurant.reviews?.map((review, index) => (
                      <Card
                        key={index}
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: 20,
                          border: '2px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <Card.Body style={{ padding: '1.5rem' }}>
                          <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '1rem'
                          }}>
                            <div>
                              <h4 style={{
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '1.1rem'
                              }}>
                                {review.userName}
                                {getVerificationBadge(review.verificationStatus)}
                              </h4>
                              <div style={{ color: '#fff', fontWeight: 600 }}>
                                {getRatingStars(review.rating)}
                              </div>
                            </div>
                            <span style={{
                              color: '#fff',
                              opacity: 0.7,
                              fontSize: '0.9rem'
                            }}>
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p style={{
                            color: '#fff',
                            opacity: 0.9,
                            lineHeight: 1.5
                          }}>
                            {review.comment}
                          </p>
                        </Card.Body>
                      </Card>
                    ))}
                  </div>
                </Tab.Pane>
              )}

              {activeTab === 'location' && (
                <Tab.Pane active>
                  <h3 style={{
                    color: genzColors.accent1,
                    fontWeight: 800,
                    fontSize: '1.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    Location & Directions 📍
                  </h3>
                  <Card style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 20,
                    marginBottom: '2rem'
                  }}>
                    <Card.Body style={{ padding: '2rem' }}>
                      <h4 style={{
                        color: '#fff',
                        fontWeight: 700,
                        fontSize: '1.2rem',
                        marginBottom: '1rem'
                      }}>
                        Address
                      </h4>
                      <p style={{
                        color: '#fff',
                        fontSize: '1.1rem',
                        opacity: 0.9,
                        marginBottom: '1.5rem'
                      }}>
                        {currentRestaurant.address}
                      </p>
                      <Button
                        variant="primary"
                        style={{
                          background: genzGradients.button,
                          color: genzColors.black,
                          border: '2px solid #222',
                          borderRadius: 16,
                          padding: '0.8rem 1.5rem',
                          fontWeight: 700,
                          fontSize: '1rem'
                        }}
                      >
                        🗺️ Get Directions
                      </Button>
                    </Card.Body>
                  </Card>
                  <Card style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 20,
                    textAlign: 'center'
                  }}>
                    <Card.Body style={{ padding: '2rem' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
                      <p style={{
                        color: '#fff',
                        opacity: 0.8,
                        fontSize: '1rem'
                      }}>
                        Interactive map coming soon!
                      </p>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              )}
            </Tab.Content>
          </Card.Body>
        </Card>
        {user && !user.roles?.includes('business') && (
          <div style={{ margin: '2rem 0', background: 'linear-gradient(90deg, #feca57 0%, #ff6b6b 100%)', borderRadius: 20, padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(254,202,87,0.12)' }}>
            <h4 style={{ fontWeight: 900, color: '#222', marginBottom: 8 }}>Own this place?</h4>
            <p style={{ color: '#222', fontWeight: 600, marginBottom: 16 }}>Claim this business and show the world your flavor! 🍔✨</p>
            <button onClick={() => window.location.href=`/business-claim/${currentRestaurant?.id || ''}`} style={{ background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', color: '#222', border: 'none', borderRadius: 16, padding: '0.8rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(67,233,123,0.12)' }}>
              Claim This Business 🚀
            </button>
          </div>
        )}
        {user && !user.roles?.includes('employee') && currentRestaurant?.isHiring && (
          <div style={{ margin: '2rem 0', background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)', borderRadius: 20, padding: '1.5rem', textAlign: 'center', boxShadow: '0 2px 8px rgba(161,140,209,0.12)' }}>
            <h4 style={{ fontWeight: 900, color: '#222', marginBottom: 8 }}>Work here?</h4>
            <p style={{ color: '#222', fontWeight: 600, marginBottom: 16 }}>Register as an employee and unlock exclusive workplace perks! 💸🍟</p>
            <button onClick={() => window.location.href=`/employee-register/${currentRestaurant?.id || ''}`} style={{ background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', color: '#222', border: 'none', borderRadius: 16, padding: '0.8rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(247,151,30,0.12)' }}>
              Register as Employee 🌈
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetail; 