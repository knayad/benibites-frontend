import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserReviews } from '../../store/slices/reviewsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const MyReviewsGenZ = () => {
  const dispatch = useDispatch();
  const { userReviews, loading } = useSelector((state) => state.reviews);
  const [filter, setFilter] = useState('all'); // all, recent, top-rated

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

  const filteredReviews = userReviews.filter(review => {
    if (filter === 'recent') {
      const reviewDate = new Date(review.date);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return reviewDate > thirtyDaysAgo;
    }
    if (filter === 'top-rated') {
      return review.rating >= 4;
    }
    return true;
  });

  const isMobile = window.innerWidth < 768;

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
      <div style={{ position: 'absolute', top: '10%', left: '8%', transform: 'rotate(25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 80, height: 24 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', transform: 'rotate(-15deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 60, height: 18 }} />
      </div>

      <div className="container" style={{ padding: isMobile ? '1rem' : '2rem' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '2rem' : '3rem',
          marginBottom: isMobile ? '2rem' : '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '1rem' : '2rem',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
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
              ⭐
            </div>
            <div style={{ flex: 1 }}>
              <h1 style={{
                fontWeight: 900,
                fontSize: isMobile ? '2rem' : '2.5rem',
                letterSpacing: '-2px',
                background: genzGradients.button,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '0.5rem'
              }}>
                My Reviews
              </h1>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>🌟</div>
              <p style={{
                color: '#fff',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 500,
                opacity: 0.9
              }}>
                Your restaurant adventures and honest feedback! 📝✨
              </p>
            </div>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: isMobile ? '1rem' : '1.5rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: isMobile ? '1rem' : '1.5rem',
              textAlign: 'center',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>📝</div>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                {userReviews.length}
              </h3>
              <p style={{ color: '#fff', opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Total Reviews</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: isMobile ? '1rem' : '1.5rem',
              textAlign: 'center',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                {userReviews.length > 0 ? (userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length).toFixed(1) : '0'}
              </h3>
              <p style={{ color: '#fff', opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Average Rating</p>
            </div>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: isMobile ? '1rem' : '1.5rem',
              textAlign: 'center',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <div style={{ fontSize: isMobile ? '2rem' : '2.5rem', marginBottom: '0.5rem' }}>🔥</div>
              <h3 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: isMobile ? '1.5rem' : '1.8rem' }}>
                {userReviews.filter(review => review.rating >= 4).length}
              </h3>
              <p style={{ color: '#fff', opacity: 0.8, fontSize: isMobile ? '0.9rem' : '1rem' }}>Top Reviews</p>
            </div>
          </div>
        </div>

        {/* Filters and Reviews */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '2rem' : '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            gap: isMobile ? '0.5rem' : '1rem',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start'
          }}>
            {[
              { key: 'all', label: '📝 All Reviews', emoji: '📝' },
              { key: 'recent', label: '🕒 Recent', emoji: '🕒' },
              { key: 'top-rated', label: '⭐ Top Rated', emoji: '⭐' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                style={{
                  background: filter === filterOption.key ? genzGradients.button : 'transparent',
                  color: filter === filterOption.key ? genzColors.black : '#fff',
                  border: 'none',
                  borderRadius: 16,
                  padding: isMobile ? '0.6rem 1rem' : '0.8rem 1.5rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {filterOption.label}
              </button>
            ))}
          </div>

          {/* Reviews List */}
          {loading ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#fff',
              fontSize: '1.1rem'
            }}>
              🔄 Loading your reviews...
            </div>
          ) : filteredReviews.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '3rem',
              color: '#fff',
              fontSize: '1.1rem'
            }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
              <p>No reviews found for this filter!</p>
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
              gap: isMobile ? '1rem' : '1.5rem'
            }}>
              {filteredReviews.map((review, index) => (
                <div
                  key={index}
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: isMobile ? 16 : 20,
                    padding: isMobile ? '1rem' : '1.5rem',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: '1rem',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '0.5rem' : '0'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem'
                    }}>
                      <div style={{ fontSize: isMobile ? '1.5rem' : '2rem' }}>
                        {getCuisineEmoji(review.restaurant?.cuisine)}
                      </div>
                      <div>
                        <h4 style={{
                          color: '#fff',
                          fontWeight: 700,
                          fontSize: isMobile ? '1.1rem' : '1.2rem',
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
                      fontSize: isMobile ? '0.8rem' : '0.9rem'
                    }}>
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{
                    color: '#fff',
                    opacity: 0.9,
                    lineHeight: 1.5,
                    fontSize: isMobile ? '0.9rem' : '1rem'
                  }}>
                    {review.comment}
                  </p>
                  
                  {/* Action Buttons */}
                  <div style={{
                    display: 'flex',
                    gap: '0.5rem',
                    marginTop: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <button style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 12,
                      padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.2rem',
                      fontFamily: genzFont,
                      fontWeight: 600,
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                      ✏️ Edit
                    </button>
                    <button style={{
                      background: 'rgba(255, 107, 107, 0.2)',
                      color: '#ff6b6b',
                      border: '2px solid #ff6b6b',
                      borderRadius: 12,
                      padding: isMobile ? '0.5rem 1rem' : '0.6rem 1.2rem',
                      fontFamily: genzFont,
                      fontWeight: 600,
                      fontSize: isMobile ? '0.8rem' : '0.9rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReviewsGenZ; 