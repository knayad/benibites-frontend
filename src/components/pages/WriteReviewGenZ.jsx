import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Button, Card, Alert, Row, Col } from 'react-bootstrap';
import { fetchRestaurantById } from '../../store/slices/restaurantsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const WriteReviewGenZ = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentRestaurant, loading } = useSelector((state) => state.restaurants);
  const { user } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    rating: 5,
    title: '',
    comment: '',
    foodQuality: 5,
    serviceQuality: 5,
    atmosphere: 5,
    valueForMoney: 5
  });
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchRestaurantById(id));
    }
  }, [dispatch, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' || name.includes('Quality') || name.includes('atmosphere') || name.includes('valueForMoney') 
        ? parseInt(value) 
        : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    
    if (form.checkValidity() === false) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setValidated(true);
    // TODO: Implement review submission with backend
    console.log('Review data:', formData);
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
        <Card style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: isMobile ? 24 : 32,
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2,
          marginBottom: isMobile ? '2rem' : '3rem'
        }}>
          <Card.Body style={{ padding: isMobile ? '2rem' : '3rem' }}>
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
                {getCuisineEmoji(currentRestaurant.cuisine)}
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
                  Write a Review ✍️
                </h1>
                <p style={{
                  color: '#fff',
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  fontWeight: 500,
                  opacity: 0.9
                }}>
                  Share your experience at {currentRestaurant.name}! 🍕✨
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Review Form */}
        <Card style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: isMobile ? 24 : 32,
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2
        }}>
          <Card.Body style={{ padding: isMobile ? '2rem' : '3rem' }}>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              
              {/* Overall Rating */}
              <Form.Group className="mb-4">
                <Form.Label style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: isMobile ? '1rem' : '1.1rem',
                  marginBottom: '1rem'
                }}>
                  Overall Rating ⭐
                </Form.Label>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  flexWrap: 'wrap'
                }}>
                  <Form.Range
                    name="rating"
                    value={formData.rating}
                    onChange={handleChange}
                    min="1"
                    max="5"
                    step="1"
                    style={{
                      flex: 1,
                      minWidth: '200px'
                    }}
                  />
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    borderRadius: 12,
                    padding: '0.5rem 1rem',
                    color: '#fff',
                    fontWeight: 700,
                    fontSize: '1.2rem',
                    minWidth: '60px',
                    textAlign: 'center'
                  }}>
                    {formData.rating}/5
                  </div>
                </div>
              </Form.Group>

              {/* Review Title */}
              <Form.Group className="mb-4">
                <Form.Label style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: isMobile ? '1rem' : '1.1rem'
                }}>
                  Review Title 📝
                </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  placeholder="Give your review a catchy title!"
                  style={{
                    padding: '1rem 1.2rem',
                    borderRadius: 20,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontFamily: genzFont,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                />
                <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                  Please provide a review title.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Review Comment */}
              <Form.Group className="mb-4">
                <Form.Label style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: isMobile ? '1rem' : '1.1rem'
                }}>
                  Your Experience 💭
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                  required
                  placeholder="Share your dining experience, what you loved, what could be better..."
                  style={{
                    padding: '1rem 1.2rem',
                    borderRadius: 20,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontFamily: genzFont,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    resize: 'vertical'
                  }}
                />
                <Form.Control.Feedback type="invalid" style={{ color: genzColors.accent2, fontWeight: 600 }}>
                  Please share your experience.
                </Form.Control.Feedback>
              </Form.Group>

              {/* Detailed Ratings */}
              <div style={{ marginBottom: '2rem' }}>
                <h4 style={{
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  marginBottom: '1.5rem'
                }}>
                  Rate Different Aspects 📊
                </h4>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '1rem'
                      }}>
                        Food Quality 🍽️
                      </Form.Label>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <Form.Range
                          name="foodQuality"
                          value={formData.foodQuality}
                          onChange={handleChange}
                          min="1"
                          max="5"
                          step="1"
                          style={{ flex: 1 }}
                        />
                        <span style={{
                          color: '#fff',
                          fontWeight: 700,
                          minWidth: '30px'
                        }}>
                          {formData.foodQuality}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '1rem'
                      }}>
                        Service Quality 👨‍💼
                      </Form.Label>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <Form.Range
                          name="serviceQuality"
                          value={formData.serviceQuality}
                          onChange={handleChange}
                          min="1"
                          max="5"
                          step="1"
                          style={{ flex: 1 }}
                        />
                        <span style={{
                          color: '#fff',
                          fontWeight: 700,
                          minWidth: '30px'
                        }}>
                          {formData.serviceQuality}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '1rem'
                      }}>
                        Atmosphere 🌟
                      </Form.Label>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <Form.Range
                          name="atmosphere"
                          value={formData.atmosphere}
                          onChange={handleChange}
                          min="1"
                          max="5"
                          step="1"
                          style={{ flex: 1 }}
                        />
                        <span style={{
                          color: '#fff',
                          fontWeight: 700,
                          minWidth: '30px'
                        }}>
                          {formData.atmosphere}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label style={{
                        color: '#fff',
                        fontWeight: 600,
                        fontSize: '1rem'
                      }}>
                        Value for Money 💰
                      </Form.Label>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem'
                      }}>
                        <Form.Range
                          name="valueForMoney"
                          value={formData.valueForMoney}
                          onChange={handleChange}
                          min="1"
                          max="5"
                          step="1"
                          style={{ flex: 1 }}
                        />
                        <span style={{
                          color: '#fff',
                          fontWeight: 700,
                          minWidth: '30px'
                        }}>
                          {formData.valueForMoney}
                        </span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              {/* Submit Button */}
              <div className="d-grid">
                <Button
                  type="submit"
                  style={{
                    background: genzGradients.button,
                    color: genzColors.black,
                    border: 'none',
                    borderRadius: 20,
                    padding: '1rem 2rem',
                    fontFamily: genzFont,
                    fontWeight: 800,
                    fontSize: '1.1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  📝 Submit Review
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default WriteReviewGenZ; 