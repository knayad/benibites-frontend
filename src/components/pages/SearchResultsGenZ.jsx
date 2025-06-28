import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchRestaurants } from '../../store/slices/restaurantsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';
import burgerSize from '../../assets/burgerSize.jpg';

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

  // Responsive padding for mobile
  const isMobile = window.innerWidth < 768;

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: genzGradients.hero,
      fontFamily: genzFont,
      padding: isMobile ? 'calc(1rem + 64px) 0 0.5rem 0' : 'calc(2rem + 64px) 0 2rem 0',
      position: 'relative',
      overflow: 'hidden',
      margin: 0,
      maxWidth: 'none',
    }}>
      {/* Playful stroke accents */}
      <div style={{ position: 'absolute', top: '10%', left: '5%', transform: 'rotate(20deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 80, height: 24 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '8%', transform: 'rotate(-15deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 60, height: 18 }} />
      </div>

      <div className="container" style={{ paddingTop: isMobile ? 0 : undefined }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <h1 style={{
              fontWeight: 900,
              fontSize: '3rem',
              letterSpacing: '-2px',
              background: genzGradients.button,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '1rem',
              display: 'inline-block',
            }}>
              Search Results
            </h1>
            <span style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔍</span>
          </div>
          <p style={{
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 500,
            opacity: 0.9
          }}>
            Found {searchResults.length} restaurants for "{query}" 🍕
          </p>
        </div>

        {/* Filters */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: 24,
          padding: isMobile ? '1rem' : '2rem',
          marginBottom: isMobile ? '1.5rem' : '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.1)'
        }}>
          <div style={{ marginBottom: isMobile ? '1rem' : '1.5rem', width: '100%' }}>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="What are you craving?"
              style={{
                width: '100%',
                padding: isMobile ? '0.8rem 1rem' : '1.1rem 1.2rem',
                borderRadius: 18,
                border: '2px solid #e0e0e0',
                fontSize: isMobile ? '0.98rem' : '1.08rem',
                background: 'rgba(255,255,255,0.93)',
                color: '#222',
                boxShadow: '0 2px 8px rgba(102,126,234,0.06)'
              }}
              aria-label="Search for food or restaurant"
            />
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: isMobile ? '1rem' : '1.5rem',
          }}>
            {/* Cuisine Dropdown */}
            <div style={{ position: 'relative' }} ref={cuisineDropdownRef}>
              <label style={{ display: 'block', color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>
                Cuisine Type
              </label>
              <div
                style={{
                  borderRadius: 16,
                  border: '2px solid #fff',
                  fontSize: '1.08rem',
                  padding: '16px 20px',
                  background: 'rgba(30,30,40,0.98)',
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(102,126,234,0.06)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  minHeight: 60,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
                onClick={() => setShowCuisineDropdown((v) => !v)}
              >
                {selectedCuisines.length === 0 ? 'All cuisines' :
                  CUISINE_OPTIONS.filter(opt => selectedCuisines.includes(opt.value)).map(opt => `${opt.label} ${opt.emoji}`).join(', ')
                }
              </div>
              {showCuisineDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '110%',
                  left: 0,
                  zIndex: 1000,
                  background: 'rgba(30,30,40,0.98)',
                  border: '2px solid #fff',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                  padding: '1rem',
                  minWidth: 220,
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  color: '#fff',
                }}>
                  {CUISINE_OPTIONS.map(opt => (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedCuisines.includes(opt.value)}
                        onChange={() => handleCuisineChange(opt.value)}
                        style={{ accentColor: genzColors.accent1, marginRight: 6 }}
                      />
                      <span>{opt.label} {opt.emoji}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {/* Benefits Dropdown */}
            <div style={{ position: 'relative' }} ref={benefitsDropdownRef}>
              <label style={{ display: 'block', color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>
                Benefits
              </label>
              <div
                style={{
                  borderRadius: 16,
                  border: '2px solid #fff',
                  fontSize: '1.08rem',
                  padding: '16px 20px',
                  background: 'rgba(30,30,40,0.98)',
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(102,126,234,0.06)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  minHeight: 60,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
                onClick={() => setShowBenefitsDropdown((v) => !v)}
              >
                {selectedBenefits.length === 0 ? 'Any benefits' :
                  BENEFIT_OPTIONS.filter(opt => selectedBenefits.includes(opt.value)).map(opt => opt.label).join(', ')
                }
              </div>
              {showBenefitsDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '110%',
                  left: 0,
                  zIndex: 1000,
                  background: 'rgba(30,30,40,0.98)',
                  border: '2px solid #fff',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                  padding: '1rem',
                  minWidth: isMobile ? 220 : 282,
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  color: '#fff',
                }}>
                  {BENEFIT_OPTIONS.map(opt => (
                    <label key={opt.value} style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: 8, 
                      marginBottom: 8, 
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      <input
                        type="checkbox"
                        checked={selectedBenefits.includes(opt.value)}
                        onChange={() => handleBenefitsChange(opt.value)}
                        style={{ accentColor: genzColors.accent1, marginRight: 6, flexShrink: 0 }}
                      />
                      <span style={{ 
                        overflow: 'hidden', 
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            {/* Location Input */}
            <div>
              <label style={{ display: 'block', color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>
                Location (City, State or Zip)
              </label>
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                placeholder="e.g. New York, NY or 90210"
                style={{
                  width: '100%',
                  padding: '0.8rem 1rem',
                  borderRadius: 16,
                  border: '2px solid rgba(255,255,255,0.3)',
                  background: 'rgba(255,255,255,0.12)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '0.95rem',
                  outline: 'none',
                }}
              />
            </div>
            {/* Distance Dropdown */}
            <div style={{ position: 'relative' }} ref={distanceDropdownRef}>
              <label style={{ display: 'block', color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>
                Distance
              </label>
              <div
                style={{
                  borderRadius: 16,
                  border: '2px solid #fff',
                  fontSize: '1.08rem',
                  padding: '16px 20px',
                  background: 'rgba(30,30,40,0.98)',
                  color: '#fff',
                  boxShadow: '0 2px 8px rgba(102,126,234,0.06)',
                  cursor: 'pointer',
                  userSelect: 'none',
                  minHeight: 60,
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                }}
                onClick={() => setShowDistanceDropdown((v) => !v)}
              >
                {DISTANCE_OPTIONS.find(opt => opt.value === distance)?.label || 'Select distance'}
              </div>
              {showDistanceDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '110%',
                  left: 0,
                  zIndex: 1000,
                  background: 'rgba(30,30,40,0.98)',
                  border: '2px solid #fff',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                  padding: '1rem',
                  minWidth: 180,
                  maxHeight: '60vh',
                  overflowY: 'auto',
                  color: '#fff',
                }}>
                  {DISTANCE_OPTIONS.map(opt => (
                    <label key={opt.value} style={{ display: 'block', marginBottom: 8, cursor: 'pointer' }}>
                      <input
                        type="radio"
                        checked={distance === opt.value}
                        onChange={() => { setDistance(opt.value); setShowDistanceDropdown(false); }}
                        style={{ accentColor: genzColors.accent1, marginRight: 6 }}
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results */}
        {searchLoading ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 600
          }}>
            🔄 Searching for amazing restaurants...
          </div>
        ) : searchError ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#ff6b6b',
            fontSize: '1.3rem',
            fontWeight: 600,
            textShadow: '0 0 4px rgba(255,255,255,0.4), 0 0 8px rgba(255,255,255,0.2)',
            WebkitTextStroke: '0.5px white'
          }}>
            ❌ {searchError}
          </div>
        ) : searchResults.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '3rem',
            color: '#fff',
            fontSize: '1.2rem',
            fontWeight: 600
          }}>
            🍕 No restaurants found. Try adjusting your search!
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '2rem'
          }}>
            {searchResults.map((restaurant) => (
              <Link
                key={restaurant.id}
                to={`/restaurant/${restaurant.id}`}
                style={{
                  textDecoration: 'none',
                  display: 'block'
                }}
              >
                <div style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: 24,
                  padding: '2rem',
                  border: '2px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 10px 30px rgba(102, 126, 234, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {/* Restaurant Header */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <div style={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      background: genzGradients.button,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem'
                    }}>
                      {getCuisineEmoji(restaurant.cuisine)}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '1.3rem',
                        marginBottom: '0.3rem'
                      }}>
                        {restaurant.name}
                      </h3>
                      <p style={{
                        color: genzColors.accent1,
                        fontWeight: 600,
                        fontSize: '0.9rem',
                        textTransform: 'capitalize'
                      }}>
                        {restaurant.cuisine} • {restaurant.location}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{ color: '#fff', fontWeight: 600 }}>
                      {getRatingStars(restaurant.rating)}
                    </span>
                    <span style={{
                      color: '#fff',
                      fontWeight: 600,
                      fontSize: '0.9rem'
                    }}>
                      ({restaurant.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Benefits Preview */}
                  <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.5rem',
                    marginBottom: '1rem'
                  }}>
                    {restaurant.benefits?.slice(0, 3).map((benefit, index) => (
                      <span
                        key={index}
                        style={{
                          background: 'rgba(254, 202, 87, 0.2)',
                          color: genzColors.accent1,
                          padding: '0.3rem 0.8rem',
                          borderRadius: 12,
                          fontSize: isMobile ? '0.8rem' : '0.92rem',
                          fontWeight: 600,
                          whiteSpace: isMobile ? 'normal' : 'nowrap',
                          overflow: isMobile ? 'visible' : 'hidden',
                          textOverflow: isMobile ? 'clip' : 'ellipsis',
                          maxWidth: isMobile ? '100%' : 160,
                          display: 'inline-block',
                          verticalAlign: 'middle',
                        }}
                      >
                        {benefit}
                      </span>
                    ))}
                    {restaurant.benefits?.length > 3 && (
                      <span style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                        color: '#fff',
                        padding: '0.3rem 0.8rem',
                        borderRadius: 12,
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}>
                        +{restaurant.benefits.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p style={{
                    color: '#fff',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                    opacity: 0.9,
                    marginBottom: '1rem'
                  }}>
                    {restaurant.description?.substring(0, 120)}...
                  </p>

                  {/* View Details Button */}
                  <div style={{
                    textAlign: 'center',
                    marginTop: '1rem'
                  }}>
                    <span style={{
                      background: genzGradients.button,
                      color: genzColors.black,
                      padding: '0.8rem 1.5rem',
                      borderRadius: 16,
                      fontWeight: 700,
                      fontSize: '0.9rem',
                      display: 'inline-block'
                    }}>
                      View Details →
                    </span>
                  </div>

                  {restaurant.isHiring && (
                    <div style={{
                      position: 'absolute',
                      top: 12,
                      right: 12,
                      background: 'linear-gradient(90deg, #feca57 0%, #ff6b6b 100%)',
                      color: '#222',
                      fontWeight: 900,
                      fontSize: '1.05rem',
                      borderRadius: 16,
                      padding: '0.5rem 1.2rem',
                      boxShadow: '0 2px 12px rgba(255,107,107,0.18)',
                      zIndex: 10,
                      animation: 'pulse 1.2s infinite alternate',
                      letterSpacing: '1px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8
                    }}>
                      <span role="img" aria-label="megaphone">📢</span> Now Hiring!
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Hamburger easter egg - embedded below search results */}
        <div style={{
          textAlign: 'center',
          marginTop: '3rem',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          cursor: 'pointer',
          userSelect: 'none',
          position: 'relative',
          zIndex: 1
        }}
          onClick={() => setShowBurgerMeme(v => !v)}
          title={showBurgerMeme ? 'Hide burger meme' : 'Show burger meme'}
        >
          <span style={{
            fontSize: isMobile ? '3.2rem' : '4.2rem',
            filter: showBurgerMeme ? 'drop-shadow(0 2px 12px #feca57)' : 'drop-shadow(0 2px 8px #764ba2)',
            transition: 'filter 0.2s',
            animation: showBurgerMeme ? 'bounceBurger 0.7s' : 'none',
          }} role="img" aria-label="burger">🍔</span>
          {showBurgerMeme && (
            <img
              src={burgerSize}
              alt="Burgers should be wider not taller"
              title="Burgers should be wider not taller"
              style={{
                marginTop: 16,
                maxWidth: isMobile ? 180 : 260,
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
  );
};

export default SearchResultsGenZ; 