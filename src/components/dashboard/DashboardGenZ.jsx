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

  useEffect(() => {
    dispatch(fetchUserReviews());
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

      <div className="container" style={{ padding: window.innerWidth < 768 ? '1rem' : '2rem' }}>
        {/* Welcome Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: window.innerWidth < 768 ? 24 : 32,
          padding: window.innerWidth < 768 ? '2rem' : '3rem',
          marginBottom: window.innerWidth < 768 ? '2rem' : '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: window.innerWidth < 768 ? '1rem' : '2rem',
            marginBottom: window.innerWidth < 768 ? '1.5rem' : '2rem',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            textAlign: window.innerWidth < 768 ? 'center' : 'left'
          }}>
            <div style={{
              width: window.innerWidth < 768 ? 80 : 100,
              height: window.innerWidth < 768 ? 80 : 100,
              borderRadius: '50%',
              background: genzGradients.button,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: window.innerWidth < 768 ? '2.5rem' : '3rem',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}>
              👤
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                flexWrap: 'wrap',
                justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start'
              }}>
                <span style={{ 
                  fontSize: window.innerWidth < 768 ? '1.8rem' : '2.2rem',
                  marginBottom: '0.5rem'
                }}>👋</span>
                <h1 style={{
                  fontWeight: 900,
                  fontSize: window.innerWidth < 768 ? '2rem' : '2.5rem',
                  letterSpacing: '-2px',
                  background: genzGradients.button,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '0.5rem',
                  marginRight: '0.5rem'
                }}>
                  Welcome back, {user?.name}!
                </h1>
              </div>
              <p style={{
                color: '#fff',
                fontSize: window.innerWidth < 768 ? '1rem' : '1.1rem',
                fontWeight: 500,
                opacity: 0.9
              }}>
                Ready to discover more amazing restaurant perks? 🍕✨
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 768 ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: window.innerWidth < 768 ? '1rem' : '1.5rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: window.innerWidth < 768 ? '1rem' : '1.5rem',
              textAlign: 'center',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: window.innerWidth < 768 ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: window.innerWidth < 768 ? '1.5rem' : '1.8rem' }}>
                {userReviews.length}
              </h3>
              <p style={{ color: '#fff', opacity: 0.8, fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem' }}>Reviews Written</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: window.innerWidth < 768 ? '1rem' : '1.5rem',
              textAlign: 'center',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: window.innerWidth < 768 ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>🍕</div>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: window.innerWidth < 768 ? '1.5rem' : '1.8rem' }}>
                {userReviews.length * 2}
              </h3>
              <p style={{ color: '#fff', opacity: 0.8, fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem' }}>Restaurants Visited</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: window.innerWidth < 768 ? '1rem' : '1.5rem',
              textAlign: 'center',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: window.innerWidth < 768 ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>🎁</div>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: window.innerWidth < 768 ? '1.5rem' : '1.8rem' }}>
                {userReviews.length * 3}
              </h3>
              <p style={{ color: '#fff', opacity: 0.8, fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem' }}>Perks Discovered</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: window.innerWidth < 768 ? 24 : 32,
          padding: window.innerWidth < 768 ? '2rem' : '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: window.innerWidth < 768 ? '0.5rem' : '1rem',
            marginBottom: '2rem',
            borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
            paddingBottom: '1rem',
            flexWrap: 'wrap',
            justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start'
          }}>
            {['overview', 'reviews', 'favorites', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  background: activeTab === tab ? genzGradients.button : 'transparent',
                  color: activeTab === tab ? genzColors.black : '#fff',
                  border: 'none',
                  borderRadius: 16,
                  padding: window.innerWidth < 768 ? '0.6rem 1rem' : '0.8rem 1.5rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: window.innerWidth < 768 ? '0.9rem' : '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textTransform: 'capitalize',
                  whiteSpace: 'nowrap'
                }}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'reviews' && '⭐ My Reviews'}
                {tab === 'favorites' && '❤️ Favorites'}
                {tab === 'settings' && '⚙️ Settings'}
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
                  Your Activity Overview 📊
                </h3>
                
                {/* Recent Activity */}
                <div style={{ marginBottom: '2rem' }}>
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
                    {userReviews.slice(0, 3).map((review, index) => (
                      <div
                        key={index}
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: 16,
                          padding: '1rem',
                          border: '2px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem'
                        }}>
                          <div style={{ fontSize: '1.5rem' }}>
                            {getCuisineEmoji(review.restaurant?.cuisine)}
                          </div>
                          <div style={{ flex: 1 }}>
                            <h5 style={{
                              color: '#fff',
                              fontWeight: 700,
                              marginBottom: '0.3rem'
                            }}>
                              {review.restaurant?.name}
                            </h5>
                            <div style={{ color: '#fff', opacity: 0.8 }}>
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
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
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
                    <Link to="/search" style={{
                      background: genzGradients.button,
                      color: genzColors.black,
                      border: 'none',
                      borderRadius: 16,
                      padding: '1rem 1.5rem',
                      fontFamily: genzFont,
                      fontWeight: 700,
                      fontSize: '1rem',
                      textDecoration: 'none',
                      textAlign: 'center',
                      display: 'block'
                    }}>
                      🔍 Find Restaurants
                    </Link>
                    <Link to="/my-reviews" style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 16,
                      padding: '1rem 1.5rem',
                      fontFamily: genzFont,
                      fontWeight: 700,
                      fontSize: '1rem',
                      textDecoration: 'none',
                      textAlign: 'center',
                      display: 'block'
                    }}>
                      ✍️ My Reviews
                    </Link>
                    <Link to="/profile" style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 16,
                      padding: '1rem 1.5rem',
                      fontFamily: genzFont,
                      fontWeight: 700,
                      fontSize: '1rem',
                      textDecoration: 'none',
                      textAlign: 'center',
                      display: 'block'
                    }}>
                      👤 Edit Profile
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 style={{
                  color: genzColors.accent1,
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  My Reviews ⭐
                </h3>
                {loading ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#fff',
                    fontSize: '1.1rem'
                  }}>
                    🔄 Loading your reviews...
                  </div>
                ) : userReviews.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: '#fff',
                    fontSize: '1.1rem'
                  }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
                    <p>You haven't written any reviews yet!</p>
                    <Link to="/search" style={{
                      background: genzGradients.button,
                      color: genzColors.black,
                      border: 'none',
                      borderRadius: 16,
                      padding: '1rem 2rem',
                      fontFamily: genzFont,
                      fontWeight: 700,
                      fontSize: '1rem',
                      textDecoration: 'none',
                      display: 'inline-block',
                      marginTop: '1rem'
                    }}>
                      Find restaurants to review! 🔍
                    </Link>
                  </div>
                ) : (
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem'
                  }}>
                    {userReviews.map((review, index) => (
                      <div
                        key={index}
                        style={{
                          background: 'rgba(255, 255, 255, 0.1)',
                          borderRadius: 20,
                          padding: '1.5rem',
                          border: '2px solid rgba(255, 255, 255, 0.2)'
                        }}
                      >
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          marginBottom: '1rem'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '1rem'
                          }}>
                            <div style={{ fontSize: '2rem' }}>
                              {getCuisineEmoji(review.restaurant?.cuisine)}
                            </div>
                            <div>
                              <h4 style={{
                                color: '#fff',
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                marginBottom: '0.3rem'
                              }}>
                                {review.restaurant?.name}
                              </h4>
                              <div style={{ color: '#fff', fontWeight: 600 }}>
                                {getRatingStars(review.rating)}
                              </div>
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                <h3 style={{
                  color: genzColors.accent1,
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  My Favorites ❤️
                </h3>
                <div style={{
                  textAlign: 'center',
                  padding: '3rem',
                  color: '#fff',
                  fontSize: '1.1rem'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>❤️</div>
                  <p>Favorite restaurants feature coming soon!</p>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div>
                <h3 style={{
                  color: genzColors.accent1,
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  Account Settings ⚙️
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '1.5rem'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 20,
                    padding: '1.5rem',
                    border: '2px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <h4 style={{
                      color: '#fff',
                      fontWeight: 700,
                      marginBottom: '1rem'
                    }}>
                      Profile Information
                    </h4>
                    <p style={{
                      color: '#fff',
                      opacity: 0.8,
                      marginBottom: '1rem'
                    }}>
                      Name: {user?.name}
                    </p>
                    <p style={{
                      color: '#fff',
                      opacity: 0.8,
                      marginBottom: '1rem'
                    }}>
                      Email: {user?.email}
                    </p>
                    <Link to="/profile" style={{
                      background: genzGradients.button,
                      color: genzColors.black,
                      border: 'none',
                      borderRadius: 16,
                      padding: '0.8rem 1.5rem',
                      fontFamily: genzFont,
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      textDecoration: 'none',
                      display: 'inline-block'
                    }}>
                      Edit Profile
                    </Link>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 20,
                    padding: '1.5rem',
                    border: '2px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <h4 style={{
                      color: '#fff',
                      fontWeight: 700,
                      marginBottom: '1rem'
                    }}>
                      Preferences
                    </h4>
                    <p style={{
                      color: '#fff',
                      opacity: 0.8,
                      marginBottom: '1rem'
                    }}>
                      Notification settings and preferences coming soon!
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardGenZ; 