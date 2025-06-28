import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRestaurantById } from '../../store/slices/restaurantsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const WriteEmployeeReviewGenZ = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentRestaurant, loading } = useSelector((state) => state.restaurants);
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
    workEnvironment: 5,
    management: 5,
    benefits: 5,
    workLifeBalance: 5,
    payFairness: 5,
    growthOpportunities: 5,
    isAnonymous: false
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantById(id));
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : 
        (name === 'rating' || name.includes('workEnvironment') || name.includes('management') || 
         name.includes('benefits') || name.includes('workLifeBalance') || name.includes('payFairness') || 
         name.includes('growthOpportunities')) ? parseInt(value) : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Implement employee review submission
    console.log('Employee review data:', formData);
    navigate(`/restaurant/${id}`);
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

  const isMobile = window.innerWidth < 768;

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
        fontSize: '1.2rem'
      }}>
        🔄 Loading restaurant details...
      </div>
    );
  }

  if (!currentRestaurant) {
    return (
      <div style={{
        minHeight: '100vh',
        background: genzGradients.hero,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: genzFont,
        color: '#ff6b6b',
        fontSize: '1.2rem',
        textShadow: '0 0 4px rgba(255,255,255,0.4), 0 0 8px rgba(255,255,255,0.2)',
        WebkitTextStroke: '0.5px white'
      }}>
        ❌ Restaurant not found
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
              👨‍🍳
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
                Employee Review 👨‍🍳
              </h1>
              <p style={{
                color: '#fff',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 500,
                opacity: 0.9
              }}>
                Share your workplace experience at {currentRestaurant.name}! 💼✨
              </p>
            </div>
          </div>
        </div>

        {/* Review Form */}
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
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1.5rem' : '2rem' }}>
            
            {/* Overall Rating */}
            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '1rem',
                fontSize: isMobile ? '1rem' : '1.1rem'
              }}>
                Overall Workplace Rating ⭐
              </label>
              <div style={{
                display: 'flex',
                gap: '0.5rem',
                justifyContent: 'center',
                flexWrap: 'wrap'
              }}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, rating: star }))}
                    style={{
                      background: 'none',
                      border: 'none',
                      fontSize: isMobile ? '2rem' : '2.5rem',
                      cursor: 'pointer',
                      filter: formData.rating >= star ? 'drop-shadow(0 2px 8px #feca57)' : 'grayscale(0.5)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    {formData.rating >= star ? '⭐' : '☆'}
                  </button>
                ))}
              </div>
            </div>

            {/* Review Title */}
            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: isMobile ? '1rem' : '1.1rem'
              }}>
                Review Title 📝
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: isMobile ? '0.8rem 1rem' : '1rem 1.2rem',
                  borderRadius: 16,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Summarize your workplace experience..."
              />
            </div>

            {/* Review Comment */}
            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: isMobile ? '1rem' : '1.1rem'
              }}>
                Your Experience 💭
              </label>
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                required
                rows={isMobile ? 4 : 6}
                style={{
                  width: '100%',
                  padding: isMobile ? '0.8rem 1rem' : '1rem 1.2rem',
                  borderRadius: 16,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease',
                  resize: 'vertical'
                }}
                placeholder="Share your workplace experience, what you loved, what could be improved..."
              />
            </div>

            {/* Detailed Ratings */}
            <div>
              <h3 style={{
                color: genzColors.accent1,
                fontWeight: 700,
                marginBottom: '1rem',
                fontSize: isMobile ? '1.1rem' : '1.2rem'
              }}>
                Rate Different Aspects 📊
              </h3>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
                gap: isMobile ? '1rem' : '1.5rem'
              }}>
                {[
                  { name: 'workEnvironment', label: '🏢 Work Environment', emoji: '🏢' },
                  { name: 'management', label: '👔 Management', emoji: '👔' },
                  { name: 'benefits', label: '🎁 Benefits', emoji: '🎁' },
                  { name: 'workLifeBalance', label: '⚖️ Work-Life Balance', emoji: '⚖️' },
                  { name: 'payFairness', label: '💰 Pay Fairness', emoji: '💰' },
                  { name: 'growthOpportunities', label: '📈 Growth Opportunities', emoji: '📈' }
                ].map((aspect) => (
                  <div key={aspect.name}>
                    <label style={{
                      display: 'block',
                      color: '#fff',
                      fontWeight: 600,
                      marginBottom: '0.5rem',
                      fontSize: isMobile ? '0.9rem' : '1rem'
                    }}>
                      {aspect.label}
                    </label>
                    <div style={{
                      display: 'flex',
                      gap: '0.3rem',
                      justifyContent: 'center'
                    }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, [aspect.name]: star }))}
                          style={{
                            background: 'none',
                            border: 'none',
                            fontSize: isMobile ? '1.2rem' : '1.5rem',
                            cursor: 'pointer',
                            filter: formData[aspect.name] >= star ? 'drop-shadow(0 1px 4px #feca57)' : 'grayscale(0.5)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          {formData[aspect.name] >= star ? '⭐' : '☆'}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Anonymous Option */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              justifyContent: 'center'
            }}>
              <input
                type="checkbox"
                name="isAnonymous"
                checked={formData.isAnonymous}
                onChange={handleChange}
                style={{
                  width: '1.2rem',
                  height: '1.2rem',
                  accentColor: genzColors.accent1
                }}
              />
              <label style={{
                color: '#fff',
                fontWeight: 600,
                fontSize: isMobile ? '0.9rem' : '1rem',
                cursor: 'pointer'
              }}>
                🕵️ Submit anonymously
              </label>
            </div>

            {/* Submit Buttons */}
            <div style={{
              display: 'flex',
              gap: '1rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              marginTop: isMobile ? '1rem' : '1.5rem'
            }}>
              <button
                type="submit"
                style={{
                  background: genzGradients.button,
                  color: genzColors.black,
                  border: 'none',
                  borderRadius: 16,
                  padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                📤 Submit Review
              </button>
              <button
                type="button"
                onClick={() => navigate(`/restaurant/${id}`)}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 16,
                  padding: isMobile ? '1rem 2rem' : '1.2rem 2.5rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
              >
                ❌ Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default WriteEmployeeReviewGenZ; 