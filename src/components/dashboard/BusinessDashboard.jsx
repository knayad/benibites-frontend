import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { loadUser, selectIsAuthenticated, selectIsBusiness } from '../../store/slices/authSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';
import BusinessProfile from './BusinessProfile';
import BusinessReviews from './BusinessReviews';
import BusinessBenefits from './BusinessBenefits';

const BusinessDashboard = () => {
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
        width: '100vw',
        background: genzGradients.hero,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: genzFont,
        padding: '2rem',
        paddingTop: 'calc(2rem + 64px)',
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
        
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: 32,
          padding: '2.5rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          textAlign: 'center',
          maxWidth: 500,
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🚫</div>
          <h2 style={{
            color: genzColors.primary,
            fontWeight: 800,
            fontSize: '2rem',
            marginBottom: '1rem'
          }}>
            Access Denied
          </h2>
          <p style={{
            color: genzColors.primary,
            fontSize: '1.1rem',
            opacity: 0.8,
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
      width: '100vw',
      background: genzGradients.hero,
      fontFamily: genzFont,
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem',
      paddingTop: 'calc(2rem + 64px)'
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

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Welcome Header */}
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: 32,
          padding: '2.5rem',
          marginBottom: '2rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
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
                background: genzGradients.button,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                Welcome back, {user?.businessName || 'Restaurant Owner'}! 👋
              </h1>
              <p style={{
                color: genzColors.primary,
                fontSize: '1.1rem',
                fontWeight: 500,
                opacity: 0.8
              }}>
                Manage your restaurant profile, benefits, and reviews! 🍕✨
              </p>
              {user?.employeeCount && (
                <p style={{
                  color: genzColors.primary,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  opacity: 0.7,
                  marginTop: '0.5rem'
                }}>
                  <span style={{ color: genzColors.accent1 }}>👥</span> Establishment Size: {user.employeeCount}
                </p>
              )}
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: 20,
              padding: '1.5rem',
              textAlign: 'center',
              border: `2px solid ${genzColors.accent1}`
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
              <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem' }}>
                4.8
              </h3>
              <p style={{ color: genzColors.primary, opacity: 0.8 }}>Average Rating</p>
            </div>
            <div style={{
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: 20,
              padding: '1.5rem',
              textAlign: 'center',
              border: `2px solid ${genzColors.accent1}`
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
              <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem' }}>
                24
              </h3>
              <p style={{ color: genzColors.primary, opacity: 0.8 }}>Total Reviews</p>
            </div>
            <div style={{
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: 20,
              padding: '1.5rem',
              textAlign: 'center',
              border: `2px solid ${genzColors.accent1}`
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎁</div>
              <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem' }}>
                8
              </h3>
              <p style={{ color: genzColors.primary, opacity: 0.8 }}>Active Benefits</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: 32,
          padding: '2.5rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: `2px solid ${genzColors.accent1}`,
            paddingBottom: '1rem',
            flexWrap: 'wrap'
          }}>
            {['overview', 'profile', 'reviews', 'benefits'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? genzGradients.button : 'transparent',
                  color: activeTab === tab ? genzColors.black : genzColors.primary,
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
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          {activeTab === 'overview' && (
            <div>
              <h2 style={{
                color: genzColors.primary,
                fontWeight: 800,
                fontSize: '1.8rem',
                marginBottom: '1.5rem'
              }}>
                Business Overview 📊
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem'
              }}>
                <div style={{
                  background: 'rgba(102, 126, 234, 0.05)',
                  borderRadius: 20,
                  padding: '1.5rem',
                  border: `2px solid ${genzColors.accent1}`
                }}>
                  <h3 style={{
                    color: genzColors.primary,
                    fontWeight: 700,
                    marginBottom: '1rem'
                  }}>
                    Recent Activity
                  </h3>
                  <p style={{
                    color: genzColors.primary,
                    opacity: 0.8,
                    marginBottom: '1rem'
                  }}>
                    You received 3 new reviews this week! 📝
                  </p>
                  <p style={{
                    color: genzColors.primary,
                    opacity: 0.8
                  }}>
                    Your restaurant profile has been viewed 156 times this month 👀
                  </p>
                </div>
                <div style={{
                  background: 'rgba(102, 126, 234, 0.05)',
                  borderRadius: 20,
                  padding: '1.5rem',
                  border: `2px solid ${genzColors.accent1}`
                }}>
                  <h3 style={{
                    color: genzColors.primary,
                    fontWeight: 700,
                    marginBottom: '1rem'
                  }}>
                    Quick Actions
                  </h3>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.8rem'
                  }}>
                    <button
                      onClick={() => setActiveTab('profile')}
                      style={{
                        background: genzGradients.button,
                        color: genzColors.black,
                        border: 'none',
                        borderRadius: 12,
                        padding: '0.8rem 1rem',
                        fontFamily: genzFont,
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      📝 Update Profile
                    </button>
                    <button
                      onClick={() => setActiveTab('benefits')}
                      style={{
                        background: 'rgba(102, 126, 234, 0.1)',
                        color: genzColors.primary,
                        border: `2px solid ${genzColors.accent1}`,
                        borderRadius: 12,
                        padding: '0.8rem 1rem',
                        fontFamily: genzFont,
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      🎁 Manage Benefits
                    </button>
                    <button
                      onClick={() => setActiveTab('reviews')}
                      style={{
                        background: 'rgba(102, 126, 234, 0.1)',
                        color: genzColors.primary,
                        border: `2px solid ${genzColors.accent1}`,
                        borderRadius: 12,
                        padding: '0.8rem 1rem',
                        fontFamily: genzFont,
                        fontWeight: 600,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      ⭐ View Reviews
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && <BusinessProfile />}
          {activeTab === 'reviews' && <BusinessReviews />}
          {activeTab === 'benefits' && <BusinessBenefits />}
        </div>
      </div>
    </div>
  );
};

export default BusinessDashboard; 