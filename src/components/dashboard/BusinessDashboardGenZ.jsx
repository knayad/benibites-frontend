import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser, selectIsAuthenticated, selectIsBusiness } from '../../store/slices/authSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';
import BusinessProfileGenZ from './BusinessProfileGenZ';
import BusinessReviewsGenZ from './BusinessReviewsGenZ';
import BusinessBenefitsGenZ from './BusinessBenefitsGenZ';

const BusinessDashboardGenZ = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isBusiness = useSelector(selectIsBusiness);
  const { user } = useSelector((state) => state.auth);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated || !isBusiness) {
    return (
      <div style={{
        minHeight: '100vh',
        background: genzGradients.hero,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: genzFont,
        paddingTop: '64px'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 32,
          padding: '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          textAlign: 'center',
          maxWidth: 500
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚫</div>
          <h2 style={{
            color: '#fff',
            fontWeight: 800,
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>
            Access Denied
          </h2>
          <p style={{
            color: '#fff',
            fontSize: '1.1rem',
            opacity: 0.9,
            marginBottom: '2rem'
          }}>
            This dashboard is only available for business accounts.
          </p>
          <Link to="/business-login" style={{
            background: genzGradients.button,
            color: genzColors.black,
            border: 'none',
            borderRadius: 20,
            padding: '1rem 2rem',
            fontFamily: genzFont,
            fontWeight: 800,
            fontSize: '1.1rem',
            textDecoration: 'none',
            display: 'inline-block'
          }}>
            Sign In as Business
          </Link>
        </div>
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
      {/* Playful stroke accents */}
      <div style={{ position: 'absolute', top: '8%', left: '10%', transform: 'rotate(25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 80, height: 24 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '15%', right: '12%', transform: 'rotate(-20deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 60, height: 18 }} />
      </div>

      <div className="container">
        {/* Welcome Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 32,
          padding: '3rem',
          marginBottom: '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2
        }}>
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
              🏪
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
                Welcome back, {user?.businessName || 'Restaurant Owner'}! 👋
              </h1>
              <p style={{
                color: '#fff',
                fontSize: '1.1rem',
                fontWeight: 500,
                opacity: 0.9
              }}>
                Manage your restaurant profile, benefits, and reviews! 🍕✨
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '1.5rem',
              textAlign: 'center',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
                4.8
              </h3>
              <p style={{ color: '#fff', opacity: 0.8 }}>Average Rating</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '1.5rem',
              textAlign: 'center',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
                24
              </h3>
              <p style={{ color: '#fff', opacity: 0.8 }}>Total Reviews</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '1.5rem',
              textAlign: 'center',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎁</div>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
                8
              </h3>
              <p style={{ color: '#fff', opacity: 0.8 }}>Active Benefits</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 32,
          padding: '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
            paddingBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            {['overview', 'profile', 'benefits', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? genzGradients.button : 'transparent',
                  color: activeTab === tab ? genzColors.black : '#fff',
                  border: 'none',
                  borderRadius: 16,
                  padding: '0.8rem 1.5rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize'
                }}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'profile' && '🏪 Business Profile'}
                {tab === 'benefits' && '🎁 Benefits'}
                {tab === 'reviews' && '⭐ Reviews'}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'overview' && (
              <div>
                <h3 style={{
                  color: genzColors.accent1,
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  Business Overview 📊
                </h3>
                
                {/* Quick Actions */}
                <div style={{ marginBottom: '2rem' }}>
                  <h4 style={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    marginBottom: '1rem'
                  }}>
                    Quick Actions
                  </h4>
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: '1rem'
                  }}>
                    <button style={{
                      background: genzGradients.button,
                      color: genzColors.black,
                      border: 'none',
                      borderRadius: 16,
                      padding: '1rem 1.5rem',
                      fontFamily: genzFont,
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}>
                      ✏️ Edit Profile
                    </button>
                    <button style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 16,
                      padding: '1rem 1.5rem',
                      fontFamily: genzFont,
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}>
                      🎁 Manage Benefits
                    </button>
                    <button style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 16,
                      padding: '1rem 1.5rem',
                      fontFamily: genzFont,
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}>
                      📢 View Reviews
                    </button>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 style={{
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    marginBottom: '1rem'
                  }}>
                    Recent Activity
                  </h4>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 16,
                      padding: '1rem',
                      border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <div style={{ fontSize: '1.5rem' }}>⭐</div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{
                            color: '#fff',
                            fontWeight: 700,
                            marginBottom: '0.3rem'
                          }}>
                            New 5-star review received
                          </h5>
                          <p style={{
                            color: '#fff',
                            opacity: 0.8,
                            fontSize: '0.9rem'
                          }}>
                            "Amazing food and great employee benefits!"
                          </p>
                        </div>
                        <span style={{
                          color: '#fff',
                          opacity: 0.7,
                          fontSize: '0.9rem'
                        }}>
                          2 hours ago
                        </span>
                      </div>
                    </div>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      borderRadius: 16,
                      padding: '1rem',
                      border: '2px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <div style={{ fontSize: '1.5rem' }}>🎁</div>
                        <div style={{ flex: 1 }}>
                          <h5 style={{
                            color: '#fff',
                            fontWeight: 700,
                            marginBottom: '0.3rem'
                          }}>
                            Health insurance benefit added
                          </h5>
                          <p style={{
                            color: '#fff',
                            opacity: 0.8,
                            fontSize: '0.9rem'
                          }}>
                            New benefit now available for employees
                          </p>
                        </div>
                        <span style={{
                          color: '#fff',
                          opacity: 0.7,
                          fontSize: '0.9rem'
                        }}>
                          1 day ago
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && <BusinessProfileGenZ />}
            {activeTab === 'benefits' && <BusinessBenefitsGenZ />}
            {activeTab === 'reviews' && <BusinessReviewsGenZ />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboardGenZ; 