import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Button, Nav, Tab, Badge, Spinner, Alert } from 'react-bootstrap';
import { fetchUserReviews } from '../../store/slices/reviewsSlice';
import { fetchRestaurants } from '../../store/slices/restaurantsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';
import { getCuisineEmoji } from '../../utils/cuisineMap.js';

// Add RoleUpgradeOptions component
function RoleUpgradeOptions({ user }) {
  return (
    <div className="role-upgrade-options" style={{ marginTop: '2rem', display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {!user.roles?.includes('business') && (
        <div className="upgrade-card" style={{ background: 'linear-gradient(90deg, #feca57 0%, #ff6b6b 100%)', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 16px rgba(254,202,87,0.12)', flex: 1, minWidth: 260 }}>
          <h3 style={{ fontWeight: 900, fontSize: '1.3rem', color: '#222', marginBottom: 8 }}>Ready to Flex as a Boss?</h3>
          <p style={{ color: '#222', fontWeight: 600, marginBottom: 16 }}>Claim your business and take control of your restaurant's vibe! 🍔✨</p>
          <button onClick={() => window.location.href='/business-claim'} style={{ background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', color: '#222', border: 'none', borderRadius: 16, padding: '0.8rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(67,233,123,0.12)' }}>
            Claim Business 🚀
          </button>
        </div>
      )}
      {!user.roles?.includes('employee') && (
        <div className="upgrade-card" style={{ background: 'linear-gradient(90deg, #a18cd1 0%, #fbc2eb 100%)', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 16px rgba(161,140,209,0.12)', flex: 1, minWidth: 260 }}>
          <h3 style={{ fontWeight: 900, fontSize: '1.3rem', color: '#222', marginBottom: 8 }}>Work Here? Get Perks!</h3>
          <p style={{ color: '#222', fontWeight: 600, marginBottom: 16 }}>Register as an employee and unlock exclusive benefits. 💸🍟</p>
          <button onClick={() => window.location.href='/employee-register'} style={{ background: 'linear-gradient(90deg, #f7971e 0%, #ffd200 100%)', color: '#222', border: 'none', borderRadius: 16, padding: '0.8rem 1.5rem', fontWeight: 800, fontSize: '1rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(247,151,30,0.12)' }}>
            Register as Employee 🌈
          </button>
        </div>
      )}
      {user.roles?.includes('business') && user.roles?.includes('employee') && (
        <div className="complete-profile" style={{ background: 'linear-gradient(90deg, #43e97b 0%, #38f9d7 100%)', borderRadius: 20, padding: '2rem', boxShadow: '0 4px 16px rgba(67,233,123,0.12)', flex: 1, minWidth: 260, textAlign: 'center' }}>
          <h3 style={{ fontWeight: 900, fontSize: '1.3rem', color: '#222', marginBottom: 8 }}>Profile Complete!</h3>
          <p style={{ color: '#222', fontWeight: 600 }}>You’re living the best of both worlds. Thanks for being awesome! 🎉</p>
        </div>
      )}
    </div>
  );
}

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userReviews, loading } = useSelector((state) => state.reviews);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    dispatch(fetchUserReviews());
    dispatch(fetchRestaurants());
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
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
        {/* Welcome Header */}
        <Card style={{
          borderRadius: isMobile ? 24 : 32,
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          background: 'rgba(255,255,255,0.98)',
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
                👤
              </div>
              <div style={{ flex: 1, minWidth: isMobile ? '200px' : 'auto' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flexWrap: 'nowrap'
                }}>
                  <span style={{ fontSize: isMobile ? '1.8rem' : '2.2rem', marginBottom: '0.5rem' }}>👋</span>
                  <h1 style={{
                    fontWeight: 900,
                    fontSize: isMobile ? '1.8rem' : '2.5rem',
                    background: genzGradients.button,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem',
                    marginRight: '0.5rem',
                    whiteSpace: 'nowrap'
                  }}>
                    Welcome back, {user?.name}!
                  </h1>
                </div>
                <p style={{
                  color: genzColors.primary,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  fontWeight: 500,
                  opacity: 0.8
                }}>
                  Ready to discover more amazing restaurant perks? 🍕✨
                </p>
              </div>
            </div>

            {/* Quick Stats */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? 'repeat(auto-fit, minmax(150px, 1fr))' : 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: isMobile ? '1rem' : '1.5rem'
            }}>
              <Card style={{
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: isMobile ? 16 : 20,
                border: `2px solid ${genzColors.accent1}`,
                textAlign: 'center'
              }}>
                <Card.Body style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                  <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
                  <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                    {userReviews.length}
                  </h3>
                  <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Reviews Written</p>
                </Card.Body>
              </Card>
              <Card style={{
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: isMobile ? 16 : 20,
                border: `2px solid ${genzColors.accent1}`,
                textAlign: 'center'
              }}>
                <Card.Body style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                  <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>🍕</div>
                  <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                    {userReviews.length * 2}
                  </h3>
                  <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Restaurants Visited</p>
                </Card.Body>
              </Card>
              <Card style={{
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: isMobile ? 16 : 20,
                border: `2px solid ${genzColors.accent1}`,
                textAlign: 'center'
              }}>
                <Card.Body style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                  <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>🎁</div>
                  <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                    {userReviews.length * 3}
                  </h3>
                  <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Perks Discovered</p>
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
              {['overview', 'reviews', 'favorites', 'settings'].map((tab) => (
                <Nav.Item key={tab}>
                  <Nav.Link
                    active={activeTab === tab}
                    onClick={() => setActiveTab(tab)}
                    style={{
                      background: activeTab === tab ? genzGradients.button : 'transparent',
                      color: activeTab === tab ? genzColors.black : genzColors.primary,
                      border: 'none',
                      borderRadius: isMobile ? 12 : 16,
                      padding: isMobile ? '0.6rem 1rem' : '0.8rem 1.5rem',
                      fontWeight: 700,
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      textTransform: 'capitalize'
                    }}
                  >
                    {tab}
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
                    Recent Activity 📊
                  </h2>
                  {loading ? (
                    <div style={{ textAlign: 'center', padding: isMobile ? '1.5rem' : '2rem' }}>
                      <Spinner animation="border" style={{ color: genzColors.accent1, marginBottom: '1rem' }} />
                      <p style={{ color: genzColors.primary }}>Loading your reviews... 🔄</p>
                    </div>
                  ) : userReviews.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.8rem' : '1rem' }}>
                      {userReviews.slice(0, 3).map((review) => (
                        <Card key={review.id} style={{
                          background: 'rgba(102, 126, 234, 0.05)',
                          borderRadius: isMobile ? 12 : 16,
                          border: `2px solid ${genzColors.accent1}`
                        }}>
                          <Card.Body style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: isMobile ? '0.8rem' : '1rem',
                              marginBottom: '0.5rem',
                              flexWrap: 'wrap'
                            }}>
                              <span style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>{getCuisineEmoji(review.cuisine)}</span>
                              <h3 style={{
                                color: genzColors.primary,
                                fontWeight: 700,
                                fontSize: isMobile ? '1rem' : '1.2rem',
                                margin: 0
                              }}>
                                {review.restaurantName}
                              </h3>
                              <span style={{ color: genzColors.accent1, fontWeight: 600 }}>
                                {getRatingStars(review.rating)}
                              </span>
                            </div>
                            <p style={{
                              color: genzColors.primary,
                              opacity: 0.8,
                              margin: 0,
                              fontSize: isMobile ? '0.9rem' : '0.95rem'
                            }}>
                              {review.comment}
                            </p>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card style={{
                      textAlign: 'center',
                      padding: isMobile ? '1.5rem' : '2rem',
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderRadius: isMobile ? 16 : 20,
                      border: `2px solid ${genzColors.accent1}`
                    }}>
                      <Card.Body>
                        <p style={{ color: genzColors.primary, marginBottom: '1rem' }}>
                          No reviews yet! Start exploring restaurants and share your experiences! 🍕
                        </p>
                        <Button
                          as={Link}
                          to="/"
                          variant="primary"
                          style={{
                            background: genzGradients.button,
                            color: genzColors.black,
                            border: '2px solid #222',
                            padding: isMobile ? '0.6rem 1.2rem' : '0.8rem 1.5rem',
                            borderRadius: isMobile ? 12 : 16,
                            fontWeight: 700,
                            fontSize: isMobile ? '0.9rem' : '1rem'
                          }}
                        >
                          Find Restaurants →
                        </Button>
                      </Card.Body>
                    </Card>
                  )}
                </Tab.Pane>
              )}

              {activeTab === 'reviews' && (
                <Tab.Pane active>
                  <h2 style={{
                    color: genzColors.primary,
                    fontWeight: 800,
                    fontSize: isMobile ? '1.5rem' : '1.8rem',
                    marginBottom: isMobile ? '1rem' : '1.5rem'
                  }}>
                    Your Reviews 📝
                  </h2>
                  {userReviews.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.8rem' : '1rem' }}>
                      {userReviews.map((review) => (
                        <Card key={review.id} style={{
                          background: 'rgba(102, 126, 234, 0.05)',
                          borderRadius: isMobile ? 12 : 16,
                          border: `2px solid ${genzColors.accent1}`
                        }}>
                          <Card.Body style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                            <div style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: isMobile ? '0.8rem' : '1rem',
                              marginBottom: '0.5rem',
                              flexWrap: 'wrap'
                            }}>
                              <span style={{ fontSize: isMobile ? '1.2rem' : '1.5rem' }}>{getCuisineEmoji(review.cuisine)}</span>
                              <h3 style={{
                                color: genzColors.primary,
                                fontWeight: 700,
                                fontSize: isMobile ? '1rem' : '1.2rem',
                                margin: 0
                              }}>
                                {review.restaurantName}
                              </h3>
                              <span style={{ color: genzColors.accent1, fontWeight: 600 }}>
                                {getRatingStars(review.rating)}
                              </span>
                            </div>
                            <p style={{
                              color: genzColors.primary,
                              opacity: 0.8,
                              margin: 0,
                              fontSize: isMobile ? '0.9rem' : '0.95rem'
                            }}>
                              {review.comment}
                            </p>
                          </Card.Body>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card style={{
                      textAlign: 'center',
                      padding: isMobile ? '1.5rem' : '2rem',
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderRadius: isMobile ? 16 : 20,
                      border: `2px solid ${genzColors.accent1}`
                    }}>
                      <Card.Body>
                        <p style={{ color: genzColors.primary }}>
                          No reviews yet! Start exploring and share your experiences! 🍕
                        </p>
                      </Card.Body>
                    </Card>
                  )}
                </Tab.Pane>
              )}

              {activeTab === 'favorites' && (
                <Tab.Pane active>
                  <h2 style={{
                    color: genzColors.primary,
                    fontWeight: 800,
                    fontSize: isMobile ? '1.5rem' : '1.8rem',
                    marginBottom: isMobile ? '1rem' : '1.5rem'
                  }}>
                    Your Favorites ❤️
                  </h2>
                  <Card style={{
                    textAlign: 'center',
                    padding: isMobile ? '1.5rem' : '2rem',
                    background: 'rgba(102, 126, 234, 0.05)',
                    borderRadius: isMobile ? 16 : 20,
                    border: `2px solid ${genzColors.accent1}`
                  }}>
                    <Card.Body>
                      <p style={{ color: genzColors.primary }}>
                        Coming soon! Save your favorite restaurants here! 🚀
                      </p>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              )}

              {activeTab === 'settings' && (
                <Tab.Pane active>
                  <h2 style={{
                    color: genzColors.primary,
                    fontWeight: 800,
                    fontSize: isMobile ? '1.5rem' : '1.8rem',
                    marginBottom: isMobile ? '1rem' : '1.5rem'
                  }}>
                    Settings ⚙️
                  </h2>
                  <Card style={{
                    textAlign: 'center',
                    padding: isMobile ? '1.5rem' : '2rem',
                    background: 'rgba(102, 126, 234, 0.05)',
                    borderRadius: isMobile ? 16 : 20,
                    border: `2px solid ${genzColors.accent1}`
                  }}>
                    <Card.Body>
                      <p style={{ color: genzColors.primary, marginBottom: '1rem' }}>
                        Manage your profile and account settings! 🔧
                      </p>
                      <Button
                        as={Link}
                        to="/profile"
                        variant="primary"
                        style={{
                          background: genzGradients.button,
                          color: genzColors.black,
                          border: '2px solid #222',
                          padding: isMobile ? '0.6rem 1.2rem' : '0.8rem 1.5rem',
                          borderRadius: isMobile ? 12 : 16,
                          fontWeight: 700,
                          fontSize: isMobile ? '0.9rem' : '1rem'
                        }}
                      >
                        Go to Profile Settings →
                      </Button>
                    </Card.Body>
                  </Card>
                </Tab.Pane>
              )}
            </Tab.Content>
          </Card.Body>
        </Card>
        <RoleUpgradeOptions user={user || { roles: [] }} />
      </div>
    </div>
  );
};

export default Dashboard; 