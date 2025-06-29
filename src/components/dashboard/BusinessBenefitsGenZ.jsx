import React, { useState } from 'react';
import { genzColors, genzGradients, genzFont } from '../../genzTheme.jsx';
import { getAllBenefits, addCustomBenefit, getBenefitInfo } from '../../utils/benefitsMap.js';

const BusinessBenefitsGenZ = () => {
  const [activeBenefits, setActiveBenefits] = useState([
    'health_insurance',
    'paid_time_off',
    'employee_discount',
    'meal_allowance'
  ]);

  const [showAddBenefit, setShowAddBenefit] = useState(false);
  const [newBenefit, setNewBenefit] = useState('');
  const [newBenefitEmoji, setNewBenefitEmoji] = useState('✨');
  const [newBenefitDescription, setNewBenefitDescription] = useState('');

  const allBenefits = getAllBenefits();

  const toggleBenefit = (benefitKey) => {
    setActiveBenefits(prev => 
      prev.includes(benefitKey) 
        ? prev.filter(b => b !== benefitKey)
        : [...prev, benefitKey]
    );
  };

  const handleAddCustomBenefit = () => {
    if (newBenefit.trim()) {
      const benefitKey = addCustomBenefit(newBenefit, newBenefitEmoji, newBenefitDescription || 'Custom benefit');
      setActiveBenefits(prev => [...prev, benefitKey]);
      setNewBenefit('');
      setNewBenefitEmoji('✨');
      setNewBenefitDescription('');
      setShowAddBenefit(false);
    }
  };

  const getBenefitIcon = (benefitKey) => {
    const info = getBenefitInfo(benefitKey);
    return info.icon;
  };

  const getBenefitLabel = (benefitKey) => {
    const info = getBenefitInfo(benefitKey);
    return info.label;
  };

  const getBenefitDescription = (benefitKey) => {
    const info = getBenefitInfo(benefitKey);
    return info.description;
  };

  const commonEmojis = ['✨', '🎁', '💎', '🌟', '💫', '🎯', '🏆', '💪', '🎉', '🔥', '💯', '⭐', '🎊', '💖', '🎪', '🎨'];

  return (
    <div>
      <h3 style={{
        color: genzColors.accent1,
        fontWeight: 800,
        fontSize: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        Employee Benefits & Perks 🎁
      </h3>

      {/* Benefits Stats */}
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
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎁</div>
          <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
            {activeBenefits.length}
          </h4>
          <p style={{ color: '#fff', opacity: 0.8 }}>Active Benefits</p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          padding: '1.5rem',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👥</div>
          <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
            {allBenefits.length}
          </h4>
          <p style={{ color: '#fff', opacity: 0.8 }}>Available Benefits</p>
        </div>
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: 20,
          padding: '1.5rem',
          textAlign: 'center',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>⭐</div>
          <h4 style={{ color: '#fff', fontWeight: 700, marginBottom: '0.5rem' }}>
            4.8
          </h4>
          <p style={{ color: '#fff', opacity: 0.8 }}>Employee Satisfaction</p>
        </div>
      </div>

      {/* Add Custom Benefit */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        padding: '1.5rem',
        marginBottom: '2rem',
        border: '2px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <h4 style={{
            color: '#fff',
            fontWeight: 700,
            fontSize: '1.2rem'
          }}>
            Add Custom Benefit
          </h4>
          <button
            onClick={() => setShowAddBenefit(!showAddBenefit)}
            style={{
              background: genzGradients.button,
              color: genzColors.black,
              border: 'none',
              borderRadius: 16,
              padding: '0.8rem 1.5rem',
              fontFamily: genzFont,
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
          >
            {showAddBenefit ? 'Cancel' : '➕ Add Custom Benefit'}
          </button>
        </div>
        
        {showAddBenefit && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              gap: '1rem',
              alignItems: 'end'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#fff',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  Custom Benefit Name
                </label>
                <input
                  type="text"
                  value={newBenefit}
                  onChange={(e) => setNewBenefit(e.target.value)}
                  placeholder="e.g., Pet Insurance, Wellness Program"
                  style={{
                    width: '100%',
                    padding: '1rem 1.2rem',
                    borderRadius: 16,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontFamily: genzFont,
                    fontSize: '1rem',
                    outline: 'none'
                  }}
                />
              </div>
              <div>
                <label style={{
                  display: 'block',
                  color: '#fff',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  fontSize: '1rem'
                }}>
                  Emoji
                </label>
                <select
                  value={newBenefitEmoji}
                  onChange={(e) => setNewBenefitEmoji(e.target.value)}
                  style={{
                    padding: '1rem 1.2rem',
                    borderRadius: 16,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontFamily: genzFont,
                    fontSize: '1rem',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                >
                  {commonEmojis.map(emoji => (
                    <option key={emoji} value={emoji} style={{ background: '#333', color: '#fff' }}>
                      {emoji}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                Description (Optional)
              </label>
              <input
                type="text"
                value={newBenefitDescription}
                onChange={(e) => setNewBenefitDescription(e.target.value)}
                placeholder="Brief description of the benefit"
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 16,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
            
            <button
              onClick={handleAddCustomBenefit}
              disabled={!newBenefit.trim()}
              style={{
                background: genzGradients.button,
                color: genzColors.black,
                border: 'none',
                borderRadius: 16,
                padding: '1rem 1.5rem',
                fontFamily: genzFont,
                fontWeight: 700,
                fontSize: '1rem',
                cursor: newBenefit.trim() ? 'pointer' : 'not-allowed',
                opacity: newBenefit.trim() ? 1 : 0.6,
                alignSelf: 'flex-end'
              }}
            >
              Add Benefit
            </button>
          </div>
        )}
      </div>

      {/* Benefits Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: '1.5rem'
      }}>
        {allBenefits.map((benefit) => {
          const isActive = activeBenefits.includes(benefit.key);
          return (
            <div
              key={benefit.key}
              onClick={() => toggleBenefit(benefit.key)}
              style={{
                background: isActive 
                  ? 'rgba(254, 202, 87, 0.2)' 
                  : 'rgba(255, 255, 255, 0.1)',
                border: isActive 
                  ? '2px solid rgba(254, 202, 87, 0.5)' 
                  : '2px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 20,
                padding: '1.5rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {isActive && (
                <div style={{
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  background: genzColors.accent1,
                  color: genzColors.black,
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.8rem',
                  fontWeight: 700
                }}>
                  ✓
                </div>
              )}
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                marginBottom: '1rem'
              }}>
                <div style={{
                  fontSize: '2rem',
                  filter: isActive ? 'drop-shadow(0 2px 8px rgba(254,202,87,0.3))' : 'none'
                }}>
                  {benefit.icon}
                </div>
                <div>
                  <h4 style={{
                    color: isActive ? genzColors.accent1 : '#fff',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    margin: 0
                  }}>
                    {benefit.label}
                  </h4>
                  <p style={{
                    color: '#fff',
                    opacity: 0.8,
                    fontSize: '0.9rem',
                    margin: 0
                  }}>
                    {benefit.description}
                  </p>
                </div>
              </div>

              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  color: isActive ? genzColors.accent1 : '#fff',
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  {isActive ? 'Active' : 'Inactive'}
                </span>
                <div style={{
                  width: '40px',
                  height: '20px',
                  background: isActive ? genzColors.accent1 : 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '10px',
                  position: 'relative',
                  transition: 'all 0.3s ease'
                }}>
                  <div style={{
                    width: '16px',
                    height: '16px',
                    background: '#fff',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    left: isActive ? '22px' : '2px',
                    transition: 'all 0.3s ease'
                  }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Active Benefits Summary */}
      {activeBenefits.length > 0 && (
        <div style={{
          background: 'rgba(254, 202, 87, 0.1)',
          borderRadius: 20,
          padding: '1.5rem',
          marginTop: '2rem',
          border: '2px solid rgba(254, 202, 87, 0.3)'
        }}>
          <h4 style={{
            color: genzColors.accent1,
            fontWeight: 700,
            fontSize: '1.2rem',
            marginBottom: '1rem'
          }}>
            Your Active Benefits ({activeBenefits.length})
          </h4>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            {activeBenefits.map(benefitKey => (
              <span
                key={benefitKey}
                style={{
                  background: 'rgba(254, 202, 87, 0.2)',
                  color: genzColors.accent1,
                  padding: '0.5rem 1rem',
                  borderRadius: 12,
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <span>{getBenefitIcon(benefitKey)}</span>
                {getBenefitLabel(benefitKey)}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessBenefitsGenZ; 