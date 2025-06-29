import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserReviews } from '../../store/slices/reviewsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const DashboardGenZ = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { userReviews, loading } = useSelector((state) => state.reviews);
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    dispatch(fetchUserReviews());
    
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [dispatch]);

  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  const getCuisineEmoji = (cuisine) => {
    const emojiMap = {
      italian: '🍝',
      mexican: '🌮',
      chinese: '🥢',
      japanese: '🍣',
      indian: '🍛',
      american: '🍔',
      mediterranean: '🥙',
      thai: '🍜',
      other: '🍽️'
    };
    return emojiMap[cuisine] || '🍽️';
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
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '1.5rem' : '2.5rem',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 2
        }}>
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
            <div style={{
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: isMobile ? 16 : 20,
              padding: isMobile ? '1rem' : '1.5rem',
              textAlign: 'center',
              border: `2px solid ${genzColors.accent1}`
            }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
              <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                {userReviews.length}
              </h3>
              <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Reviews Written</p>
            </div>
            <div style={{
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: isMobile ? 16 : 20,
              padding: isMobile ? '1rem' : '1.5rem',
              textAlign: 'center',
              border: `2px solid ${genzColors.accent1}`
            }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>🍕</div>
              <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                {userReviews.length * 2}
              </h3>
              <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Restaurants Visited</p>
            </div>
            <div style={{
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: isMobile ? 16 : 20,
              padding: isMobile ? '1rem' : '1.5rem',
              textAlign: 'center',
              border: `2px solid ${genzColors.accent1}`
            }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>🎁</div>
              <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                {userReviews.length * 3}
              </h3>
              <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Perks Discovered</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '1.5rem' : '2.5rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: isMobile ? '0.5rem' : '1rem',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            borderBottom: `2px solid ${genzColors.accent1}`,
            paddingBottom: isMobile ? '0.8rem' : '1rem',
            flexWrap: 'wrap'
          }}>
            {['overview', 'reviews', 'favorites', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? genzGradients.button : 'transparent',
                  color: activeTab === tab ? genzColors.black : genzColors.primary,
                  border: 'none',
                  borderRadius: isMobile ? 12 : 16,
                  padding: isMobile ? '0.6rem 1rem' : '0.8rem 1.5rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: isMobile ? '0.9rem' : '1rem',
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
                fontSize: isMobile ? '1.5rem' : '1.8rem',
                marginBottom: isMobile ? '1rem' : '1.5rem'
              }}>
                Recent Activity 📊
              </h2>
              {loading ? (
                <div style={{ textAlign: 'center', padding: isMobile ? '1.5rem' : '2rem' }}>
                  <p style={{ color: genzColors.primary }}>Loading your reviews... 🔄</p>
                </div>
              ) : userReviews.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.8rem' : '1rem' }}>
                  {userReviews.slice(0, 3).map((review) => (
                    <div key={review.id} style={{
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderRadius: isMobile ? 12 : 16,
                      padding: isMobile ? '1rem' : '1.5rem',
                      border: `2px solid ${genzColors.accent1}`
                    }}>
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
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: isMobile ? '1.5rem' : '2rem',
                  background: 'rgba(102, 126, 234, 0.05)',
                  borderRadius: isMobile ? 16 : 20,
                  border: `2px solid ${genzColors.accent1}`
                }}>
                  <p style={{ color: genzColors.primary, marginBottom: '1rem' }}>
                    No reviews yet! Start exploring restaurants and share your experiences! 🍕
                  </p>
                  <Link to="/" style={{
                    background: genzGradients.button,
                    color: genzColors.black,
                    padding: isMobile ? '0.6rem 1.2rem' : '0.8rem 1.5rem',
                    borderRadius: isMobile ? 12 : 16,
                    textDecoration: 'none',
                    fontWeight: 700,
                    display: 'inline-block',
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}>
                    Find Restaurants →
                  </Link>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
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
                    <div key={review.id} style={{
                      background: 'rgba(102, 126, 234, 0.05)',
                      borderRadius: isMobile ? 12 : 16,
                      padding: isMobile ? '1rem' : '1.5rem',
                      border: `2px solid ${genzColors.accent1}`
                    }}>
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
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{
                  textAlign: 'center',
                  padding: isMobile ? '1.5rem' : '2rem',
                  background: 'rgba(102, 126, 234, 0.05)',
                  borderRadius: isMobile ? 16 : 20,
                  border: `2px solid ${genzColors.accent1}`
                }}>
                  <p style={{ color: genzColors.primary }}>
                    No reviews yet! Start exploring and share your experiences! 🍕
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'favorites' && (
            <div>
              <h2 style={{
                color: genzColors.primary,
                fontWeight: 800,
                fontSize: isMobile ? '1.5rem' : '1.8rem',
                marginBottom: isMobile ? '1rem' : '1.5rem'
              }}>
                Your Favorites ❤️
              </h2>
              <div style={{
                textAlign: 'center',
                padding: isMobile ? '1.5rem' : '2rem',
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: isMobile ? 16 : 20,
                border: `2px solid ${genzColors.accent1}`
              }}>
                <p style={{ color: genzColors.primary }}>
                  Coming soon! Save your favorite restaurants here! 🚀
                </p>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
              <h2 style={{
                color: genzColors.primary,
                fontWeight: 800,
                fontSize: isMobile ? '1.5rem' : '1.8rem',
                marginBottom: isMobile ? '1rem' : '1.5rem'
              }}>
                Settings ⚙️
              </h2>
              <div style={{
                textAlign: 'center',
                padding: isMobile ? '1.5rem' : '2rem',
                background: 'rgba(102, 126, 234, 0.05)',
                borderRadius: isMobile ? 16 : 20,
                border: `2px solid ${genzColors.accent1}`
              }}>
                <p style={{ color: genzColors.primary, marginBottom: '1rem' }}>
                  Manage your profile and account settings! 🔧
                </p>
                <Link to="/profile" style={{
                  background: genzGradients.button,
                  color: genzColors.black,
                  padding: isMobile ? '0.6rem 1.2rem' : '0.8rem 1.5rem',
                  borderRadius: isMobile ? 12 : 16,
                  textDecoration: 'none',
                  fontWeight: 700,
                  display: 'inline-block',
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  Go to Profile Settings →
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardGenZ; 