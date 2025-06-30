import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUserReviews } from '../../store/slices/reviewsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';
import { Badge } from 'react-bootstrap';
import { getCuisineEmoji } from '../../utils/cuisineMap.js';

const MyReviews = () => {
  const dispatch = useDispatch();
  const { userReviews, loading } = useSelector((state) => state.reviews);
  const [filter, setFilter] = useState('all'); // all, recent, top-rated

  useEffect(() => {
    dispatch(fetchUserReviews());
  }, [dispatch]);

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

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: genzGradients.hero,
      fontFamily: genzFont,
      position: 'relative',
      overflow: 'hidden',
      padding: '2rem',
      paddingTop: '2rem'
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
        {/* Header */}
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
              ⭐
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                flexWrap: 'nowrap'
              }}>
                <h1 style={{
                  fontWeight: 900,
                  fontSize: '2.5rem',
                  background: genzGradients.button,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0,
                  whiteSpace: 'nowrap'
                }}>
                  My Reviews
                </h1>
                <div style={{ fontSize: '2.5rem' }}>🌟</div>
              </div>
              <p style={{
                color: genzColors.primary,
                fontSize: '1.1rem',
                fontWeight: 500,
                opacity: 0.8
              }}>
                Your restaurant adventures and honest feedback! ✨
              </p>
            </div>
          </div>

          {/* Stats */}
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
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📝</div>
              <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.8rem' }}>
                {userReviews.length}
              </h3>
              <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: '1rem' }}>Total Reviews</p>
            </div>
            <div style={{
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: 20,
              padding: '1.5rem',
              textAlign: 'center',
              border: `2px solid ${genzColors.accent1}`
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
              <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.8rem' }}>
                {userReviews.length > 0 ? (userReviews.reduce((sum, review) => sum + review.rating, 0) / userReviews.length).toFixed(1) : '0'}
              </h3>
              <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: '1rem' }}>Average Rating</p>
            </div>
            <div style={{
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: 20,
              padding: '1.5rem',
              textAlign: 'center',
              border: `2px solid ${genzColors.accent1}`
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔥</div>
              <h3 style={{ color: genzColors.primary, fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.8rem' }}>
                {userReviews.filter(review => review.rating >= 4).length}
              </h3>
              <p style={{ color: genzColors.primary, opacity: 0.8, fontSize: '1rem' }}>Top Reviews</p>
            </div>
          </div>
        </div>

        {/* Filters and Reviews */}
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: 32,
          padding: '2.5rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Filter Buttons */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}>
            {[
              { key: 'all', label: 'All Reviews', icon: '📝' },
              { key: 'recent', label: 'Recent', icon: '🕒' },
              { key: 'top-rated', label: 'Top Rated', icon: '⭐' }
            ].map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                style={{
                  background: filter === filterOption.key ? genzGradients.button : 'transparent',
                  color: filter === filterOption.key ? genzColors.black : genzColors.primary,
                  border: 'none',
                  borderRadius: 16,
                  padding: '0.8rem 1.5rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                {filterOption.icon} {filterOption.label}
              </button>
            ))}
          </div>

          {/* Reviews List */}
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: genzColors.primary }}>Loading your reviews... 🔄</p>
            </div>
          ) : filteredReviews.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {filteredReviews.map((review) => (
                <div key={review.id} style={{
                  background: 'rgba(102, 126, 234, 0.05)',
                  borderRadius: 16,
                  padding: '1.5rem',
                  border: `2px solid ${genzColors.accent1}`
                }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.5rem'
                  }}>
                    <span style={{ fontSize: '1.5rem' }}>{getCuisineEmoji(review.cuisine)}</span>
                    <h3 style={{
                      color: genzColors.primary,
                      fontWeight: 700,
                      fontSize: '1.2rem',
                      margin: 0
                    }}>
                      {review.restaurantName}
                      {getVerificationBadge(review.verificationStatus)}
                    </h3>
                    <span style={{ color: genzColors.accent1, fontWeight: 600 }}>
                      {getRatingStars(review.rating)}
                    </span>
                  </div>
                  <p style={{
                    color: genzColors.primary,
                    opacity: 0.8,
                    margin: 0,
                    fontSize: '0.95rem'
                  }}>
                    {review.comment}
                  </p>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                    fontSize: '0.9rem',
                    color: genzColors.primary,
                    opacity: 0.7
                  }}>
                    <span>📅 {new Date(review.date).toLocaleDateString()}</span>
                    <span>📍 {review.location || 'Location not specified'}</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: '2rem',
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: 20,
              border: `2px solid ${genzColors.accent1}`
            }}>
              <p style={{ color: genzColors.primary, marginBottom: '1rem' }}>
                {filter === 'all' ? 'No reviews yet!' : `No ${filter} reviews found!`}
              </p>
              {filter === 'all' && (
                <Link to="/" style={{
                  background: genzGradients.button,
                  color: genzColors.black,
                  padding: '0.8rem 1.5rem',
                  borderRadius: 16,
                  textDecoration: 'none',
                  fontWeight: 700,
                  display: 'inline-block'
                }}>
                  Start Reviewing Restaurants →
                </Link>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReviews; 