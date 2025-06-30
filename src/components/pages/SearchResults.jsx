import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Form, FormControl, Button, Card, Alert, Dropdown, Badge, Spinner } from 'react-bootstrap';
import { searchRestaurants } from '../../store/slices/restaurantsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';
import { getSearchEmoji } from '../../utils/emojiMap.js';
import { getCuisineEmoji, getAllCuisines } from '../../utils/cuisineMap.js';
import { getAllBenefits } from '../../utils/benefitsMap.js';
import BurgerMeme from '../layout/BurgerMeme.jsx';

const CUISINE_OPTIONS = getAllCuisines();
const BENEFIT_OPTIONS = getAllBenefits();

const DISTANCE_OPTIONS = [
  { value: 5, label: '5 miles' },
  { value: 10, label: '10 miles' },
  { value: 25, label: '25 miles' },
  { value: 50, label: '50 miles' },
  { value: 100, label: '100 miles' },
];

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults, searchLoading, searchError } = useSelector((state) => state.restaurants);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const initialQuery = searchParams.get('q') || '';
  const cuisinesParam = searchParams.get('cuisines') || '';
  const benefitsParam = searchParams.get('benefits') || '';
  const locationParam = searchParams.get('location') || '';

  const [query, setQuery] = useState(initialQuery);
  const [selectedCuisines, setSelectedCuisines] = useState(cuisinesParam ? cuisinesParam.split(',') : []);
  const [selectedBenefits, setSelectedBenefits] = useState(benefitsParam ? benefitsParam.split(',') : []);
  const [location, setLocation] = useState(locationParam);
  const [distance, setDistance] = useState(10);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const searchParams = {
      query,
      location,
      filters: {
        cuisine: selectedCuisines.join(','),
        benefits: selectedBenefits.join(',')
      }
    };
    dispatch(searchRestaurants(searchParams));
  }, [dispatch, query, location, selectedCuisines, selectedBenefits]);

  const handleCuisineChange = (value) => {
    setSelectedCuisines((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const handleBenefitsChange = (value) => {
    setSelectedBenefits((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
  };

  const getBusinessClaimBadge = (isClaimed) => {
    if (isClaimed) {
      return <Badge bg="info" style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>🏢 Claimed</Badge>;
    } else {
      return <Badge bg="secondary" style={{ fontSize: '0.8rem', marginLeft: '0.5rem' }}>🏢 Unclaimed</Badge>;
    }
  };

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

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 100, overflow: 'visible' }}>
        {/* Header */}
        <Card style={{
          borderRadius: 32,
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          marginBottom: '2rem',
          background: 'rgba(255,255,255,0.98)'
        }}>
          <Card.Body style={{ padding: '2.5rem', textAlign: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <h1 style={{
                fontWeight: 900,
                fontSize: '2.5rem',
                background: genzGradients.button,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: 0
              }}>
                Search Results
              </h1>
              <span style={{ fontSize: '2.5rem' }}>🔍</span>
            </div>
            <p style={{
              color: genzColors.primary,
              fontSize: '1.2rem',
              fontWeight: 500,
              opacity: 0.8,
              margin: 0
            }}>
              Found {searchResults.length} restaurants for "{query}" {location && `in ${location}`} {getSearchEmoji(query)}
            </p>
          </Card.Body>
        </Card>

        {/* Filters */}
        <Card style={{
          borderRadius: 32,
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          marginBottom: '2rem',
          background: 'rgba(255,255,255,0.98)'
        }}>
          <Card.Body style={{ padding: isMobile ? '1.5rem' : '2.5rem' }}>
            <h2 style={{
              color: genzColors.primary,
              fontWeight: 800,
              fontSize: '1.8rem',
              marginBottom: '1.5rem'
            }}>
              Refine Your Search 🔍
            </h2>
            
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(5, 1fr)',
                gap: isMobile ? '1rem' : '1.5rem',
                alignItems: 'end',
              }}
            >
              {/* Search Query */}
              <Form.Group>
                <Form.Label style={{
                  color: genzColors.primary,
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>
                  Search
                </Form.Label>
                <FormControl
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="What are you craving?"
                  style={{
                    borderRadius: 16,
                    border: `2px solid ${genzColors.accent1}`,
                    padding: '1rem 1.2rem',
                    fontSize: '1rem',
                    background: 'rgba(255,255,255,0.9)',
                    color: genzColors.black,
                    fontFamily: genzFont
                  }}
                />
              </Form.Group>

              {/* Cuisine Filter */}
              <Form.Group>
                <Form.Label style={{
                  color: genzColors.primary,
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>
                  Cuisine Type
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-primary"
                    style={{
                      width: '100%',
                      borderRadius: 16,
                      border: `2px solid ${genzColors.accent1}`,
                      padding: '1rem 1.2rem',
                      fontSize: '1rem',
                      background: 'rgba(255,255,255,0.9)',
                      color: genzColors.black,
                      fontFamily: genzFont,
                      textAlign: 'left'
                    }}
                  >
                    {selectedCuisines.length === 0 ? 'All cuisines' :
                      selectedCuisines.length > 2 ? `${selectedCuisines.length} cuisines selected` :
                      selectedCuisines.map(cuisine => 
                        CUISINE_OPTIONS.find(opt => opt.value === cuisine)?.label
                      ).join(', ')
                    }
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{
                    borderRadius: 16,
                    border: `2px solid ${genzColors.accent1}`,
                    boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    background: 'rgba(255,255,255,0.98)'
                  }}>
                    {CUISINE_OPTIONS.map(opt => (
                      <Dropdown.Item
                        key={opt.value}
                        onClick={() => handleCuisineChange(opt.value)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '0.5rem 1rem',
                          color: genzColors.black,
                          background: 'transparent',
                          border: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                        }}
                      >
                        <Form.Check
                          type="checkbox"
                          checked={selectedCuisines.includes(opt.value)}
                          onChange={() => {}}
                          style={{ marginRight: 8 }}
                        />
                        <span>{opt.label} {opt.emoji}</span>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              {/* Benefits Filter */}
              <Form.Group>
                <Form.Label style={{
                  color: genzColors.primary,
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>
                  Benefits
                </Form.Label>
                <Dropdown>
                  <Dropdown.Toggle
                    variant="outline-primary"
                    style={{
                      width: '100%',
                      borderRadius: 16,
                      border: `2px solid ${genzColors.accent1}`,
                      padding: '1rem 1.2rem',
                      fontSize: '1rem',
                      background: 'rgba(255,255,255,0.9)',
                      color: genzColors.black,
                      fontFamily: genzFont,
                      textAlign: 'left'
                    }}
                  >
                    {selectedBenefits.length === 0 ? 'All benefits' :
                      selectedBenefits.length > 2 ? `${selectedBenefits.length} benefits selected` :
                      selectedBenefits.map(benefit => 
                        BENEFIT_OPTIONS.find(opt => opt.key === benefit)?.label
                      ).join(', ')
                    }
                  </Dropdown.Toggle>
                  <Dropdown.Menu style={{
                    borderRadius: 16,
                    border: `2px solid ${genzColors.accent1}`,
                    boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                    maxHeight: '200px',
                    overflowY: 'auto',
                    background: 'rgba(255,255,255,0.98)'
                  }}>
                    {BENEFIT_OPTIONS.map(opt => (
                      <Dropdown.Item
                        key={opt.key}
                        onClick={() => handleBenefitsChange(opt.key)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '0.5rem 1rem',
                          color: genzColors.black,
                          background: 'transparent',
                          border: 'none'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = 'rgba(102, 126, 234, 0.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'transparent';
                        }}
                      >
                        <Form.Check
                          type="checkbox"
                          checked={selectedBenefits.includes(opt.key)}
                          onChange={() => {}}
                          style={{ marginRight: 8 }}
                        />
                        <span>{opt.label} {opt.icon}</span>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>

              {/* Location */}
              <Form.Group>
                <Form.Label style={{
                  color: genzColors.primary,
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>
                  Location
                </Form.Label>
                <FormControl
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, State"
                  style={{
                    borderRadius: 16,
                    border: `2px solid ${genzColors.accent1}`,
                    padding: '1rem 1.2rem',
                    fontSize: '1rem',
                    background: 'rgba(255,255,255,0.9)',
                    color: genzColors.black,
                    fontFamily: genzFont
                  }}
                />
              </Form.Group>

              {/* Distance Filter */}
              <Form.Group>
                <Form.Label style={{
                  color: genzColors.primary,
                  fontWeight: 700,
                  marginBottom: '0.5rem'
                }}>
                  Distance
                </Form.Label>
                <Form.Select
                  value={distance}
                  onChange={e => setDistance(Number(e.target.value))}
                  style={{
                    borderRadius: 16,
                    border: `2px solid ${genzColors.accent1}`,
                    padding: '1rem 1.2rem',
                    fontSize: '1rem',
                    background: 'rgba(255,255,255,0.9)',
                    color: genzColors.black,
                    fontFamily: genzFont
                  }}
                >
                  {DISTANCE_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
          </Card.Body>
        </Card>

        {/* Results */}
        <Card style={{
          borderRadius: 32,
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          background: 'rgba(255,255,255,0.98)'
        }}>
          <Card.Body style={{ padding: '2.5rem' }}>
            {searchLoading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                <Spinner animation="border" style={{ color: genzColors.accent1, marginBottom: '1rem' }} />
                <p style={{ color: genzColors.primary }}>Searching for restaurants... 🔄</p>
              </div>
            ) : searchError ? (
              <Alert variant="danger" style={{
                borderRadius: 16,
                border: '2px solid #ff6b6b',
                background: 'rgba(255,107,107,0.1)',
                color: '#d63031'
              }}>
                Error: {searchError}
              </Alert>
            ) : searchResults.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                {searchResults.map((restaurant) => (
                  <Card key={restaurant.id} style={{
                    background: 'rgba(102, 126, 234, 0.05)',
                    borderRadius: 20,
                    border: `2px solid ${genzColors.accent1}`,
                    transition: 'all 0.3s ease'
                  }}>
                    <Card.Body style={{ padding: '1.5rem' }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem',
                        flexWrap: 'wrap'
                      }}>
                        <span style={{ fontSize: '2rem' }}>{getCuisineEmoji(restaurant.cuisine)}</span>
                        <div style={{ flex: 1 }}>
                          <h3 style={{
                            color: genzColors.primary,
                            fontWeight: 700,
                            fontSize: '1.3rem',
                            margin: 0,
                            marginBottom: '0.3rem'
                          }}>
                            {restaurant.name}
                            {getBusinessClaimBadge(restaurant.isClaimed)}
                          </h3>
                          <p style={{
                            color: genzColors.primary,
                            opacity: 0.7,
                            margin: 0,
                            fontSize: '0.95rem'
                          }}>
                            📍 {restaurant.location}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ color: genzColors.accent1, fontWeight: 600, marginBottom: '0.3rem' }}>
                            {getRatingStars(restaurant.rating)}
                          </div>
                          <div style={{ color: genzColors.primary, opacity: 0.7, fontSize: '0.9rem' }}>
                            {restaurant.rating}/5
                          </div>
                        </div>
                      </div>
                      
                      <p style={{
                        color: genzColors.primary,
                        opacity: 0.8,
                        margin: 0,
                        marginBottom: '1rem',
                        fontSize: '0.95rem'
                      }}>
                        {restaurant.description}
                      </p>

                      {restaurant.benefits && restaurant.benefits.length > 0 && (
                        <div style={{ marginBottom: '1rem' }}>
                          <h4 style={{
                            color: genzColors.primary,
                            fontWeight: 600,
                            marginBottom: '0.5rem',
                            fontSize: '1rem'
                          }}>
                            Benefits Offered:
                          </h4>
                          <div style={{
                            display: 'flex',
                            flexWrap: 'wrap',
                            gap: '0.5rem'
                          }}>
                            {restaurant.benefits.map((benefit, index) => (
                              <Badge
                                key={index}
                                bg="primary"
                                style={{
                                  background: genzGradients.button,
                                  color: genzColors.black,
                                  padding: '0.3rem 0.8rem',
                                  borderRadius: 12,
                                  fontSize: '0.85rem',
                                  fontWeight: 600
                                }}
                              >
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      <div style={{
                        display: 'flex',
                        gap: '1rem',
                        flexWrap: 'wrap'
                      }}>
                        <Button
                          as={Link}
                          to={`/restaurant/${restaurant.id}`}
                          variant="primary"
                          style={{
                            background: genzGradients.button,
                            color: genzColors.black,
                            border: '2px solid #222',
                            borderRadius: 16,
                            padding: '0.8rem 1.5rem',
                            fontWeight: 700,
                            fontSize: '0.95rem'
                          }}
                        >
                          View Details →
                        </Button>
                        <Button
                          as={Link}
                          to={`/write-review/${restaurant.id}`}
                          variant="outline-primary"
                          style={{
                            background: 'rgba(102, 126, 234, 0.1)',
                            color: genzColors.primary,
                            border: `2px solid ${genzColors.accent1}`,
                            borderRadius: 16,
                            padding: '0.8rem 1.5rem',
                            fontWeight: 700,
                            fontSize: '0.95rem'
                          }}
                        >
                          Write Review ✍️
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
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
                  No restaurants found matching your criteria! 😔
                </p>
                <Button
                  as={Link}
                  to="/"
                  variant="primary"
                  style={{
                    background: genzGradients.button,
                    color: genzColors.black,
                    border: '2px solid #222',
                    borderRadius: 16,
                    padding: '0.8rem 1.5rem',
                    fontWeight: 700
                  }}
                >
                  Try Different Search →
                </Button>
              </div>
            )}
          </Card.Body>
        </Card>
        
        {/* Burger Meme Component */}
        <BurgerMeme isMobile={window.innerWidth < 600} />
      </div>
    </div>
  );
};

export default SearchResults; 