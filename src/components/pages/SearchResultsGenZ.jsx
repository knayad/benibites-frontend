import React, { useState, useEffect, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { searchRestaurants } from '../../store/slices/restaurantsSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

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
  const [filters, setFilters] = useState({
    cuisine: '',
    rating: '',
    benefits: ''
  });

  const query = searchParams.get('q') || '';

  const [showCuisineDropdown, setShowCuisineDropdown] = useState(false);
  const [showBenefitsDropdown, setShowBenefitsDropdown] = useState(false);
  const cuisineDropdownRef = useRef(null);
  const benefitsDropdownRef = useRef(null);
  const distanceDropdownRef = useRef(null);
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  const [location, setLocation] = useState('');
  const [distance, setDistance] = useState(10);

  useEffect(() => {
    if (query) {
      dispatch(searchRestaurants({ query, filters }));
    }
  }, [dispatch, query, filters]);

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

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: genzGradients.hero,
      fontFamily: genzFont,
      padding: '2rem 0',
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

      <div className="container">
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
          padding: '2rem',
          marginBottom: '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 10px 30px rgba(102, 126, 234, 0.1)'
        }}>
          <h3 style={{
            color: genzColors.accent1,
            fontWeight: 900,
            fontSize: '1.5rem',
            marginBottom: '1.5rem',
            textAlign: 'center',
            letterSpacing: '1px',
            textShadow: '0 2px 12px rgba(0,0,0,0.25), 0 1px 0 #fff',
            background: 'rgba(255,255,255,0.10)',
            borderRadius: 12,
            padding: '0.5rem 1.5rem',
            display: 'inline-block',
          }}>
            Filter Your Search <span role="img" aria-label="sparkles">✨</span>
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {/* Cuisine Dropdown */}
            <div style={{ position: 'relative' }} ref={cuisineDropdownRef}>
              <label style={{ display: 'block', color: '#fff', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>
                Cuisine Type
              </label>
              <div
                style={{
                  background: 'rgba(255,255,255,0.12)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 16,
                  padding: '0.8rem 1rem',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  userSelect: 'none',
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
                  zIndex: 10,
                  background: 'rgba(30,30,40,0.98)',
                  border: '2px solid #fff',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                  padding: '1rem',
                  minWidth: 220,
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
                  background: 'rgba(255,255,255,0.12)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 16,
                  padding: '0.8rem 1rem',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  userSelect: 'none',
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
                  zIndex: 10,
                  background: 'rgba(30,30,40,0.98)',
                  border: '2px solid #fff',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                  padding: '1rem',
                  minWidth: 220,
                  color: '#fff',
                }}>
                  {BENEFIT_OPTIONS.map(opt => (
                    <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={selectedBenefits.includes(opt.value)}
                        onChange={() => handleBenefitsChange(opt.value)}
                        style={{ accentColor: genzColors.accent1, marginRight: 6 }}
                      />
                      <span>{opt.label}</span>
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
                  background: 'rgba(255,255,255,0.12)',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderRadius: 16,
                  padding: '0.8rem 1rem',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  userSelect: 'none',
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
                  zIndex: 10,
                  background: 'rgba(30,30,40,0.98)',
                  border: '2px solid #fff',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                  padding: '1rem',
                  minWidth: 180,
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
            fontSize: '1.1rem',
            fontWeight: 600
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
                          fontSize: '0.8rem',
                          fontWeight: 600
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
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResultsGenZ; 