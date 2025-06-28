import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurantById } from '../../store/slices/restaurantsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const RestaurantDetailGenZ = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentRestaurant, loading, error } = useSelector((state) => state.restaurants);
  const { isAuthenticated } = useSelector((state) => state.auth);
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

  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
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
        🔄 Loading restaurant details...
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
        fontFamily: genzFont,
        color: '#ff6b6b',
        fontSize: '1.3rem',
        fontWeight: 600,
        textShadow: '0 0 4px rgba(255,255,255,0.4), 0 0 8px rgba(255,255,255,0.2)',
        WebkitTextStroke: '0.5px white'
      }}>
        ❌ Restaurant not found or error loading details
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
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <button style={{
              background: genzGradients.button,
              color: genzColors.black,
              border: 'none',
              borderRadius: 20,
              padding: '1rem 2rem',
              fontFamily: genzFont,
              fontWeight: 800,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}>
              📞 Contact Restaurant
            </button>
            {isAuthenticated && (
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                flexWrap: 'wrap'
              }}>
                <Link to={`/write-review/${currentRestaurant.id}`} style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 20,
                  padding: '1rem 2rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}>
                  ✍️ Write Review
                </Link>
                <Link to={`/write-employee-review/${currentRestaurant.id}`} style={{
                  background: 'rgba(254, 202, 87, 0.2)',
                  color: genzColors.accent1,
                  border: `2px solid ${genzColors.accent1}`,
                  borderRadius: 20,
                  padding: '1rem 2rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}>
                  👨‍🍳 Employee Review
                </Link>
              </div>
            )}
            <Link to="/search" style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#fff',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              borderRadius: 20,
              padding: '1rem 2rem',
              fontFamily: genzFont,
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              textDecoration: 'none',
              display: 'inline-block'
            }}>
              🔍 Back to Search
            </Link>
          </div>

          {isHiring && (
            <div style={{
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
            }}>
              <span role="img" aria-label="megaphone">📢</span> Now Hiring!
            </div>
          )}
        </div>

        {/* Tabs */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          padding: '2rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.1)',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Tab Navigation */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            borderBottom: '2px solid rgba(255, 255, 255, 0.2)',
            paddingBottom: '1rem'
          }}>
            {['overview', 'benefits', 'reviews', 'location'].map((tab) => (
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
                {tab === 'overview' && '📋 Overview'}
                {tab === 'benefits' && '🎁 Benefits'}
                {tab === 'reviews' && '⭐ Reviews'}
                {tab === 'location' && '📍 Location'}
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
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 16,
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🕒</div>
                    <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>Hours</h4>
                    <p style={{ color: '#fff', opacity: 0.8 }}>Mon-Sun: 11AM-10PM</p>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 16,
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📞</div>
                    <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>Phone</h4>
                    <p style={{ color: '#fff', opacity: 0.8 }}>(555) 123-4567</p>
                  </div>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: 16,
                    padding: '1.5rem',
                    textAlign: 'center'
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🌐</div>
                    <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>Website</h4>
                    <p style={{ color: '#fff', opacity: 0.8 }}>www.restaurant.com</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'benefits' && (
              <div>
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
                    <div
                      key={index}
                      style={{
                        background: 'rgba(254, 202, 87, 0.1)',
                        border: '2px solid rgba(254, 202, 87, 0.3)',
                        borderRadius: 20,
                        padding: '1.5rem',
                        transition: 'all 0.3s ease'
                      }}
                    >
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
                    </div>
                  ))}
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
                  Customer Reviews ⭐
                </h3>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem'
                }}>
                  {currentRestaurant.reviews?.map((review, index) => (
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
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'location' && (
              <div>
                <h3 style={{
                  color: genzColors.accent1,
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  marginBottom: '1.5rem'
                }}>
                  Location & Directions 📍
                </h3>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 20,
                  padding: '2rem',
                  marginBottom: '2rem'
                }}>
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
                  <button style={{
                    background: genzGradients.button,
                    color: genzColors.black,
                    border: 'none',
                    borderRadius: 16,
                    padding: '0.8rem 1.5rem',
                    fontFamily: genzFont,
                    fontWeight: 700,
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}>
                    🗺️ Get Directions
                  </button>
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 20,
                  padding: '2rem',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🗺️</div>
                  <p style={{
                    color: '#fff',
                    opacity: 0.8,
                    fontSize: '1rem'
                  }}>
                    Interactive map coming soon!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetailGenZ; 