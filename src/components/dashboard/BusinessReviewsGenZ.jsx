import React, { useState } from 'react';
import { genzColors, genzGradients, genzFont } from '../../genzTheme.jsx';

const BusinessReviewsGenZ = () => {
  // TODO: Fetch business reviews from Redux store
  const reviews = [
    {
      id: 1,
      userName: 'Sarah M.',
      rating: 5,
      title: 'Amazing food and great benefits!',
      comment: 'The food here is incredible and I love that they offer health insurance to their employees. Great place to work!',
      createdAt: '2024-01-15',
      businessResponse: null
    },
    {
      id: 2,
      userName: 'Mike R.',
      rating: 4,
      title: 'Good atmosphere, fair pay',
      comment: 'Nice working environment and the management is supportive. The living wage policy is a huge plus.',
      createdAt: '2024-01-10',
      businessResponse: 'Thank you for your feedback, Mike! We appreciate having you on our team.'
    },
    {
      id: 3,
      userName: 'Jessica L.',
      rating: 5,
      title: 'Best restaurant job I\'ve had',
      comment: 'Flexible schedule, great benefits, and the food is amazing. Highly recommend working here!',
      createdAt: '2024-01-08',
      businessResponse: null
    }
  ];

  const [selectedReview, setSelectedReview] = useState(null);
  const [responseText, setResponseText] = useState('');

  const renderStars = (rating) => {
    return '⭐'.repeat(rating) + '☆'.repeat(5 - rating);
  };

  const handleRespond = (reviewId) => {
    setSelectedReview(reviewId);
    setResponseText('');
  };

  const handleSubmitResponse = (reviewId) => {
    // TODO: Implement business response submission
    console.log('Submitting response for review:', reviewId, responseText);
    setSelectedReview(null);
    setResponseText('');
  };

  const positiveReviews = reviews.filter(r => r.rating >= 4).length;
  const averageRating = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div>
      <h3 style={{
        color: genzColors.accent1,
        fontWeight: 800,
        fontSize: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        Customer Reviews ⭐
      </h3>

      {/* Review Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1.5rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          padding: '1.5rem',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
          <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
            {reviews.length}
          </h4>
          <p style={{ color: '#fff', opacity: 0.8 }}>Total Reviews</p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          padding: '1.5rem',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
          <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
            {averageRating.toFixed(1)}
          </h4>
          <p style={{ color: '#fff', opacity: 0.8 }}>Average Rating</p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          padding: '1.5rem',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👍</div>
          <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
            {positiveReviews}
          </h4>
          <p style={{ color: '#fff', opacity: 0.8 }}>Positive Reviews</p>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '3rem',
          color: '#fff',
          fontSize: '1.1rem'
        }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>⭐</div>
          <p>No reviews yet.</p>
          <p style={{ opacity: 0.8 }}>
            Encourage your employees to leave reviews to help attract new talent!
          </p>
        </div>
      ) : (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem'
        }}>
          {reviews.map(review => (
            <div
              key={review.id}
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
                <div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '0.5rem'
                  }}>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: '1.1rem' }}>
                      {renderStars(review.rating)}
                    </div>
                    <h5 style={{
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      margin: 0
                    }}>
                      {review.title}
                    </h5>
                  </div>
                  <p style={{
                    color: '#fff',
                    opacity: 0.8,
                    fontSize: '0.9rem',
                    margin: 0
                  }}>
                    by {review.userName}
                  </p>
                </div>
                <span style={{
                  color: '#fff',
                  opacity: 0.7,
                  fontSize: '0.9rem'
                }}>
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              
              <p style={{
                color: '#fff',
                opacity: 0.9,
                lineHeight: 1.5,
                marginBottom: '1rem'
              }}>
                {review.comment}
              </p>
              
              {review.businessResponse ? (
                <div style={{
                  background: 'rgba(254, 202, 87, 0.1)',
                  border: '2px solid rgba(254, 202, 87, 0.3)',
                  borderRadius: 16,
                  padding: '1rem',
                  marginTop: '1rem'
                }}>
                  <h6 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem',
                    fontSize: '1rem'
                  }}>
                    Your Response:
                  </h6>
                  <p style={{
                    color: '#fff',
                    opacity: 0.9,
                    margin: 0
                  }}>
                    {review.businessResponse}
                  </p>
                </div>
              ) : (
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: '1rem'
                }}>
                  <button
                    onClick={() => handleRespond(review.id)}
                    style={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      color: '#fff',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: 16,
                      padding: '0.8rem 1.5rem',
                      fontFamily: genzFont,
                      fontWeight: 700,
                      fontSize: '1rem',
                      cursor: 'pointer'
                    }}
                  >
                    💬 Respond to Review
                  </button>
                </div>
              )}

              {selectedReview === review.id && (
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: 16,
                  padding: '1rem',
                  marginTop: '1rem',
                  border: '2px solid rgba(255, 255, 255, 0.2)'
                }}>
                  <h6 style={{
                    color: genzColors.accent1,
                    fontWeight: 700,
                    marginBottom: '0.5rem'
                  }}>
                    Write Your Response:
                  </h6>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Thank your customer for their feedback..."
                    style={{
                      width: '100%',
                      minHeight: '100px',
                      padding: '1rem',
                      borderRadius: 12,
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#fff',
                      fontFamily: genzFont,
                      fontSize: '1rem',
                      outline: 'none',
                      resize: 'vertical'
                    }}
                  />
                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    marginTop: '1rem'
                  }}>
                    <button
                      onClick={() => handleSubmitResponse(review.id)}
                      disabled={!responseText.trim()}
                      style={{
                        background: genzGradients.button,
                        color: genzColors.black,
                        border: 'none',
                        borderRadius: 12,
                        padding: '0.8rem 1.5rem',
                        fontFamily: genzFont,
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: responseText.trim() ? 'pointer' : 'not-allowed',
                        opacity: responseText.trim() ? 1 : 0.6
                      }}
                    >
                      Submit Response
                    </button>
                    <button
                      onClick={() => setSelectedReview(null)}
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        border: '2px solid rgba(255, 255, 255, 0.3)',
                        borderRadius: 12,
                        padding: '0.8rem 1.5rem',
                        fontFamily: genzFont,
                        fontWeight: 700,
                        fontSize: '1rem',
                        cursor: 'pointer'
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BusinessReviewsGenZ; 