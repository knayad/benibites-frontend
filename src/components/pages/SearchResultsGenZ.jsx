import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchRestaurants } from '../../store/slices/restaurantsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';
import { getSearchEmoji } from '../../utils/emojiMap.js';
import burgerSize from '../../assets/burgerSize.jpg';
import { createPortal } from 'react-dom';

const CUISINE_OPTIONS = [
  { value: 'american', label: 'American', emoji: '🍔' },
  { value: 'italian', label: 'Italian', emoji: '🍝' },
  { value: 'mexican', label: 'Mexican', emoji: '🌮' },
  { value: 'chinese', label: 'Chinese', emoji: '🥢' },
  { value: 'japanese', label: 'Japanese', emoji: '🍣' },
  { value: 'thai', label: 'Thai', emoji: '🍜' },
  { value: 'indian', label: 'Indian', emoji: '🍛' },
  { value: 'french', label: 'French', emoji: '🥖' },
  { value: 'mediterranean', label: 'Mediterranean', emoji: '🥙' },
  { value: 'greek', label: 'Greek', emoji: '🥗' },
  { value: 'spanish', label: 'Spanish', emoji: '🥘' },
  { value: 'korean', label: 'Korean', emoji: '🍲' },
  { value: 'vietnamese', label: 'Vietnamese', emoji: '🍜' },
  { value: 'middle_eastern', label: 'Middle Eastern', emoji: '🍢' },
  { value: 'caribbean', label: 'Caribbean', emoji: '🍤' },
  { value: 'african', label: 'African', emoji: '🍲' },
  { value: 'fusion', label: 'Fusion', emoji: '🍽️' },
];

const BENEFIT_OPTIONS = [
  { value: 'health_insurance', label: 'Health Insurance 🏥' },
  { value: 'dental_insurance', label: 'Dental Insurance 🦷' },
  { value: 'vision_insurance', label: 'Vision Insurance 👁️' },
  { value: 'life_insurance', label: 'Life Insurance 🛡️' },
  { value: 'retirement_plan', label: 'Retirement Plan 💰' },
  { value: 'living_wage_no_tipping', label: 'Living Wage (No Tipping) 💵' },
  { value: 'paid_time_off', label: 'Paid Time Off 🏖️' },
  { value: 'sick_leave', label: 'Sick Leave 🤒' },
  { value: 'parental_leave', label: 'Parental Leave 👶' },
  { value: 'flexible_schedule', label: 'Flexible Schedule ⏰' },
  { value: 'employee_discount', label: 'Employee Discount 🎫' },
  { value: 'meal_allowance', label: 'Meal Allowance 🍽️' },
  { value: 'transportation_benefit', label: 'Transportation Benefit 🚗' },
  { value: 'education_assistance', label: 'Education Assistance 📚' },
  { value: 'gym_membership', label: 'Gym Membership 💪' },
  { value: 'other', label: 'Other awesome perks 🅿️' },
];

const DISTANCE_OPTIONS = [
  { value: 5, label: '5 miles' },
  { value: 10, label: '10 miles' },
  { value: 25, label: '25 miles' },
  { value: 50, label: '50 miles' },
  { value: 100, label: '100 miles' },
];

const SearchResultsGenZ = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { searchResults, searchLoading, searchError } = useSelector((state) => state.restaurants);

  const initialQuery = searchParams.get('q') || '';
  const cuisinesParam = searchParams.get('cuisines') || '';
  const benefitsParam = searchParams.get('benefits') || '';

  const [query, setQuery] = useState(initialQuery);
  const [showCuisineDropdown, setShowCuisineDropdown] = useState(false);
  const [showBenefitsDropdown, setShowBenefitsDropdown] = useState(false);
  const [showDistanceDropdown, setShowDistanceDropdown] = useState(false);
  const cuisineDropdownRef = useRef(null);
  const benefitsDropdownRef = useRef(null);
  const distanceDropdownRef = useRef(null);
  const [selectedCuisines, setSelectedCuisines] = useState(cuisinesParam ? cuisinesParam.split(',') : []);
  const [selectedBenefits, setSelectedBenefits] = useState(benefitsParam ? benefitsParam.split(',') : []);
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState(10);
  const [showBurgerMeme, setShowBurgerMeme] = useState(false);

  useEffect(() => {
    const searchParams = {
      query,
      filters: {
        cuisine: selectedCuisines.join(','),
        benefits: selectedBenefits.join(',')
      }
    };
    dispatch(searchRestaurants(searchParams));
  }, [dispatch, query, selectedCuisines, selectedBenefits]);

  // Handle outside click for dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (cuisineDropdownRef.current && !cuisineDropdownRef.current.contains(event.target)) {
        setShowCuisineDropdown(false);
      }
      if (benefitsDropdownRef.current && !benefitsDropdownRef.current.contains(event.target)) {
        setShowBenefitsDropdown(false);
      }
      if (distanceDropdownRef.current && !distanceDropdownRef.current.contains(event.target)) {
        setShowDistanceDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const getCuisineEmoji = (cuisine) => {
    const emojiMap = {
      american: '🍔',
      italian: '🍝',
      mexican: '🌮',
      chinese: '🥢',
      japanese: '🍣',
      thai: '🍜',
      indian: '🍛',
      french: '🥖',
      mediterranean: '🥙',
      greek: '🥗',
      spanish: '🥘',
      korean: '🍲',
      vietnamese: '🍜',
      middle_eastern: '🍢',
      caribbean: '🍤',
      african: '🍲',
      fusion: '🍽️'
    };
    return emojiMap[cuisine] || '🍽️';
  };

  const getRatingStars = (rating) => {
    return '⭐'.repeat(Math.round(rating)) + '☆'.repeat(5 - Math.round(rating));
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

      {/* Hamburger Image */}
      <div style={{
        position: 'absolute',
        top: '10%',
        right: '5%',
        zIndex: 1,
        opacity: 0.1,
        transform: 'rotate(15deg)'
      }}>
        <img 
          src={burgerSize} 
          alt="Decorative burger" 
          style={{ 
            width: '200px', 
            height: 'auto',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
          }} 
        />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 100, overflow: 'visible' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: 32,
          padding: '2.5rem',
          marginBottom: '2rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          textAlign: 'center',
          position: 'relative',
          zIndex: 2
        }}>
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
            Found {searchResults.length} restaurants for "{query}" {getSearchEmoji(query)}
          </p>
        </div>

        {/* Filters */}
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
          <h2 style={{
            color: genzColors.primary,
            fontWeight: 800,
            fontSize: '1.8rem',
            marginBottom: '1.5rem'
          }}>
            Refine Your Search 🔍
          </h2>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem'
          }}>
            {/* Search Query */}
            <div>
              <label style={{
                display: 'block',
                color: genzColors.primary,
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                Search
              </label>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="What are you craving?"
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 16,
                  border: `2px solid ${genzColors.accent1}`,
                  background: 'rgba(255,255,255,0.9)',
                  color: genzColors.black,
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>

            {/* Cuisine Filter */}
            <div ref={cuisineDropdownRef} style={{ position: 'relative', zIndex: 20 }}>
              <label style={{
                display: 'block',
                color: genzColors.primary,
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                Cuisine Type
              </label>
              <div
                onClick={() => setShowCuisineDropdown(!showCuisineDropdown)}
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 16,
                  border: `2px solid ${genzColors.accent1}`,
                  background: 'rgba(255,255,255,0.9)',
                  color: genzColors.black,
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {selectedCuisines.length === 0 ? 'All cuisines' :
                  selectedCuisines.map(cuisine => 
                    CUISINE_OPTIONS.find(opt => opt.value === cuisine)?.label
                  ).join(', ')
                }
              </div>
              {showCuisineDropdown && createPortal(
                <div style={{
                  position: 'absolute',
                  top: cuisineDropdownRef.current ? cuisineDropdownRef.current.getBoundingClientRect().bottom + window.scrollY : 0,
                  left: cuisineDropdownRef.current ? cuisineDropdownRef.current.getBoundingClientRect().left + window.scrollX : 0,
                  width: cuisineDropdownRef.current ? cuisineDropdownRef.current.offsetWidth : 220,
                  background: 'rgba(255,255,255,0.98)',
                  border: `2px solid ${genzColors.accent1}`,
                  borderRadius: 16,
                  boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                  padding: '1rem',
                  zIndex: 9999,
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}>
                  {CUISINE_OPTIONS.map(opt => (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', color: genzColors.black }}>
                      <input
                        type="checkbox"
                        checked={selectedCuisines.includes(opt.value)}
                        onChange={() => handleCuisineChange(opt.value)}
                        style={{ accentColor: genzColors.accent1, marginRight: 6 }}
                      />
                      <span>{opt.label} {opt.emoji}</span>
                    </label>
                  ))}
                </div>, document.body
              )}
            </div>

            {/* Benefits Filter */}
            <div ref={benefitsDropdownRef} style={{ position: 'relative', zIndex: 20 }}>
              <label style={{
                display: 'block',
                color: genzColors.primary,
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                Benefits
              </label>
              <div
                onClick={() => setShowBenefitsDropdown(!showBenefitsDropdown)}
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 16,
                  border: `2px solid ${genzColors.accent1}`,
                  background: 'rgba(255,255,255,0.9)',
                  color: genzColors.black,
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  cursor: 'pointer',
                  minHeight: '60px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {selectedBenefits.length === 0 ? 'All benefits' :
                  selectedBenefits.length > 2 ? `${selectedBenefits.length} benefits selected` :
                  selectedBenefits.map(benefit => 
                    BENEFIT_OPTIONS.find(opt => opt.value === benefit)?.label
                  ).join(', ')
                }
              </div>
              {showBenefitsDropdown && createPortal(
                <div style={{
                  position: 'absolute',
                  top: benefitsDropdownRef.current ? benefitsDropdownRef.current.getBoundingClientRect().bottom + window.scrollY : 0,
                  left: benefitsDropdownRef.current ? benefitsDropdownRef.current.getBoundingClientRect().left + window.scrollX : 0,
                  width: benefitsDropdownRef.current ? benefitsDropdownRef.current.offsetWidth : 220,
                  background: 'rgba(255,255,255,0.98)',
                  border: `2px solid ${genzColors.accent1}`,
                  borderRadius: 16,
                  boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                  padding: '1rem',
                  zIndex: 9999,
                  maxHeight: '200px',
                  overflowY: 'auto',
                }}>
                  {BENEFIT_OPTIONS.map(opt => (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer', color: genzColors.black }}>
                      <input
                        type="checkbox"
                        checked={selectedBenefits.includes(opt.value)}
                        onChange={() => handleBenefitsChange(opt.value)}
                        style={{ accentColor: genzColors.accent1, marginRight: 6 }}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>, document.body
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: 32,
          padding: '2.5rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 50,
          overflow: 'visible',
        }}>
          {searchLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: genzColors.primary }}>Searching for restaurants... 🔄</p>
            </div>
          ) : searchError ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p style={{ color: genzColors.accent2 }}>Error: {searchError}</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {searchResults.map((restaurant) => (
                <div key={restaurant.id} style={{
                  background: 'rgba(102, 126, 234, 0.05)',
                  borderRadius: 20,
                  padding: '1.5rem',
                  border: `2px solid ${genzColors.accent1}`,
                  transition: 'all 0.3s ease'
                }}>
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
                          <span key={index} style={{
                            background: genzGradients.button,
                            color: genzColors.black,
                            padding: '0.3rem 0.8rem',
                            borderRadius: 12,
                            fontSize: '0.85rem',
                            fontWeight: 600
                          }}>
                            {benefit}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  <div style={{
                    display: 'flex',
                    gap: '1rem',
                    flexWrap: 'wrap'
                  }}>
                    <Link to={`/restaurant/${restaurant.id}`} style={{
                      background: genzGradients.button,
                      color: genzColors.black,
                      padding: '0.8rem 1.5rem',
                      borderRadius: 16,
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.95rem'
                    }}>
                      View Details →
                    </Link>
                    <Link to={`/write-review/${restaurant.id}`} style={{
                      background: 'rgba(102, 126, 234, 0.1)',
                      color: genzColors.primary,
                      padding: '0.8rem 1.5rem',
                      borderRadius: 16,
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.95rem',
                      border: `2px solid ${genzColors.accent1}`
                    }}>
                      Write Review ✍️
                    </Link>
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
                No restaurants found matching your criteria! 😔
              </p>
              <Link to="/" style={{
                background: genzGradients.button,
                color: genzColors.black,
                padding: '0.8rem 1.5rem',
                borderRadius: 16,
                textDecoration: 'none',
                fontWeight: 700,
                display: 'inline-block'
              }}>
                Try Different Search →
              </Link>
            </div>
          )}
        </div>
        {/* Large Hamburger Icon and Meme at the bottom */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '3rem',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            userSelect: 'none',
            position: 'relative',
            zIndex: 1,
            minHeight: window.innerWidth < 600 ? 220 : 300 // Reserve space for meme
          }}
          onClick={() => setShowBurgerMeme(v => !v)}
          title={showBurgerMeme ? 'Hide burger meme' : 'Show burger meme'}
        >
          <span style={{
            fontSize: window.innerWidth < 600 ? '3.2rem' : '4.2rem',
            filter: showBurgerMeme ? 'drop-shadow(0 2px 12px #feca57)' : 'drop-shadow(0 2px 8px #764ba2)',
            transition: 'filter 0.2s',
            animation: showBurgerMeme ? 'bounceBurger 0.7s' : 'none',
          }} role="img" aria-label="burger">🍔</span>
          <div style={{ minHeight: 0, width: '100%' }}>
            {showBurgerMeme && (
              <img
                src={burgerSize}
                alt="big burgers should be wider not taller meme"
                title="big burgers should be wider not taller meme"
                style={{
                  marginTop: 16,
                  maxWidth: window.innerWidth < 600 ? 180 : 260,
                  width: '100%',
                  borderRadius: 18,
                  boxShadow: '0 8px 32px rgba(254,202,87,0.18)',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  filter: 'saturate(1.2) drop-shadow(0 2px 8px #feca57)',
                  animation: 'popBurger 0.5s',
                }}
              />
            )}
          </div>
        </div>
        <style>{`
          @keyframes popBurger {
            0% { transform: scale(0.7) translateY(40px); opacity: 0; }
            60% { transform: scale(1.1) translateY(-10px); opacity: 1; }
            100% { transform: scale(1) translateY(0); opacity: 1; }
          }
          @keyframes bounceBurger {
            0% { transform: scale(1) translateY(0); }
            30% { transform: scale(1.2) translateY(-10px); }
            60% { transform: scale(0.95) translateY(4px); }
            100% { transform: scale(1) translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default SearchResultsGenZ; 