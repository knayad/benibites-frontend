import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { genzCardStyle } from '../../genzTheme.jsx';

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

// Hero Section Component
const HeroSection = ({ searchData, setSearchData, selectedCuisines, setSelectedCuisines, showCuisineDropdown, setShowCuisineDropdown, cuisineDropdownRef, handleSearch, isMobile }) => {
  const handleCuisineChange = (value) => {
    setSelectedCuisines((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };

  return (
    <section style={{ paddingTop: 'calc(64px + 64px)', paddingBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', flexWrap: 'wrap', gap: '32px' }}>
      {/* Light colored shape accent for hero */}
      <div style={{
        position: 'absolute',
        top: '-60px',
        left: '-120px',
        width: '340px',
        height: '260px',
        zIndex: 0,
        background: 'radial-gradient(circle at 60% 40%, #feca57 0%, #ff6b6b 80%, transparent 100%)',
        opacity: 0.18,
        filter: 'blur(24px)'
      }} />
      {/* Playful stroke graphics */}
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '10%', top: '36px', zIndex: 2, transform: 'rotate(-12deg)' }} aria-hidden="true"><path d="M10 30 Q 40 5, 60 30 T 110 30" stroke="#4ecdc4" strokeWidth="5" fill="none"/></svg>
      <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '12%', top: '86px', zIndex: 2, transform: 'rotate(15deg)' }} aria-hidden="true"><path d="M5 25 Q 20 5, 40 25 T 75 25" stroke="#764ba2" strokeWidth="4" fill="none"/></svg>
      <svg width="100" height="36" viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '60%', top: '36px', zIndex: 2, transform: 'rotate(-22deg)' }} aria-hidden="true"><path d="M10 30 Q 40 5, 60 30 T 90 30" stroke="#feca57" strokeWidth="5" fill="none"/></svg>
      
      {/* Hero text on the left */}
      <div style={{
        flex: 1.2,
        minWidth: 320,
        maxWidth: 540,
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        marginRight: '2vw',
        marginTop: '0'
      }}>
        <h1 style={{
          fontSize: isMobile ? '2.1rem' : '2.7rem',
          fontWeight: 900,
          background: 'linear-gradient(90deg, #ff6b6b, #feca57, #4ecdc4, #764ba2, #45b7d1)',
          backgroundSize: '200% 200%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: isMobile ? '18px' : '28px',
          fontFamily: 'Poppins, Inter, sans-serif',
          letterSpacing: '-1px',
          lineHeight: 1.1,
          display: 'inline-block',
          textAlign: isMobile ? 'center' : 'left',
          width: '100%',
          maxWidth: isMobile ? '340px' : '540px',
          whiteSpace: 'normal',
          wordBreak: 'break-word',
          overflowWrap: 'break-word',
          marginLeft: isMobile ? 'auto' : 0,
          marginRight: isMobile ? 'auto' : 0,
        }}>
          Restaurants That Actually<br/>Give a Fork <span role="img" aria-label="fork">🍴</span>
        </h1>
        <div style={{
          width: '100%',
          paddingLeft: isMobile ? 12 : 0,
          paddingRight: isMobile ? 12 : 0,
        }}>
        <p style={{
          fontSize: isMobile ? '1rem' : '1.18rem',
          color: '#fff',
          fontWeight: 500,
          lineHeight: 1.6,
          marginBottom: isMobile ? '12px' : '18px',
          marginTop: 0,
          textAlign: isMobile ? 'center' : 'left',
          width: '100%'
        }}>
          Find spots where the food is fire and the staff are treated like actual people, not NPCs.
        </p>
        <p style={{
          fontWeight: 700,
          color: '#ff6b6b',
          fontSize: isMobile ? '0.98rem' : '1.08rem',
          marginBottom: isMobile ? '18px' : '30px',
          marginTop: 0,
          textAlign: isMobile ? 'center' : 'left',
          width: '100%'
        }}>
          Support businesses that serve up respect, not just meals! <span role="img" aria-label="chef">🧑‍🍳</span>
        </p>
        <Button
          size="lg"
          style={{
            background: 'linear-gradient(120deg, #ff6b6b 0%, #feca57 60%, #4ecdc4 100%)',
            color: '#222',
            border: 'none',
            borderRadius: '18px',
            padding: isMobile ? '12px 18px' : '15px 44px',
            fontSize: isMobile ? '1.05rem' : '1.13rem',
            fontWeight: '800',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            boxShadow: '0 6px 16px rgba(102,126,234,0.18)',
            marginBottom: isMobile ? '18px' : '0',
            marginTop: isMobile ? '8px' : '0',
            transition: 'background 0.2s',
            width: isMobile ? '100%' : 'auto',
            display: isMobile ? 'block' : 'inline-block'
          }}
          onClick={() => document.getElementById('benefits-section').scrollIntoView({ behavior: 'smooth' })}
          aria-label="Jump to benefits"
        >
          Start Exploring
        </Button>
        </div>
      </div>
      
      {/* Search bar on the right */}
      <div style={{
        flex: 1,
        minWidth: 320,
        maxWidth: 420,
        zIndex: 1
      }}>
        <div style={{
          boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
          border: '2.5px solid #764ba2',
          background: 'rgba(255,255,255,0.99)',
          backdropFilter: 'blur(16px)',
          borderRadius: '32px 24px 40px 32px',
          minWidth: '320px',
          width: '100%',
          margin: '0 auto',
          padding: isMobile ? '18px 8px' : '28px 18px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap',
          position: 'relative',
          zIndex: 1
        }}>
          <Form onSubmit={handleSearch} style={{ width: '100%' }}>
            <Row className="g-3 align-items-center justify-content-center" style={{ width: '100%' }}>
              <Col xs={12} md={6} style={{ marginBottom: '10px' }}>
                <Form.Control
                  type="text"
                  placeholder="What are you craving?"
                  value={searchData.query}
                  onChange={(e) => setSearchData(prev => ({ ...prev, query: e.target.value }))}
                  className="form-control-lg"
                  aria-label="Search for food or restaurant"
                  style={{
                    borderRadius: '16px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1.08rem',
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.93)',
                    color: '#222',
                    boxShadow: '0 2px 8px rgba(102,126,234,0.06)'
                  }}
                />
              </Col>
              <Col xs={12} md={6} style={{ marginBottom: '10px' }}>
                <div style={{ position: 'relative' }} ref={cuisineDropdownRef}>
                  <div
                    style={{
                      borderRadius: '16px',
                      border: '2px solid #e0e0e0',
                      fontSize: '1.08rem',
                      padding: '16px 20px',
                      background: 'rgba(255,255,255,0.93)',
                      color: '#222',
                      boxShadow: '0 2px 8px rgba(102,126,234,0.06)',
                      cursor: 'pointer',
                      userSelect: 'none',
                      minHeight: '60px',
                      display: 'flex',
                      alignItems: 'center'
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
                      background: 'rgba(255,255,255,0.98)',
                      border: '2px solid #e0e0e0',
                      borderRadius: 16,
                      boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
                      padding: '1rem',
                      minWidth: 220,
                      color: '#222',
                      maxHeight: '200px',
                      overflowY: 'auto'
                    }}>
                      {CUISINE_OPTIONS.map(opt => (
                        <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={selectedCuisines.includes(opt.value)}
                            onChange={() => handleCuisineChange(opt.value)}
                            style={{ accentColor: '#764ba2', marginRight: 6 }}
                          />
                          <span>{opt.label} {opt.emoji}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              </Col>
              <Col xs={12} style={{ marginBottom: '10px' }}>
                <Form.Control
                  type="text"
                  placeholder="Location (City, State)"
                  value={searchData.location}
                  onChange={(e) => setSearchData(prev => ({ ...prev, location: e.target.value }))}
                  className="form-control-lg"
                  aria-label="Location"
                  style={{
                    borderRadius: '16px',
                    border: '2px solid #e0e0e0',
                    fontSize: '1.08rem',
                    padding: '16px 20px',
                    background: 'rgba(255,255,255,0.93)',
                    color: '#222',
                    boxShadow: '0 2px 8px rgba(102,126,234,0.06)'
                  }}
                />
              </Col>
              <Col xs={12} className="d-grid" style={{ marginBottom: '10px' }}>
                <Button
                  type="submit"
                  size="lg"
                  style={{
                    background: 'linear-gradient(120deg, #ff6b6b 0%, #feca57 60%, #4ecdc4 100%)',
                    color: '#222',
                    fontWeight: 800,
                    border: '2px solid #222',
                    borderRadius: '16px',
                    minWidth: isMobile ? '100%' : 320,
                    fontSize: isMobile ? '1.08rem' : '1.13rem',
                    padding: isMobile ? '16px 0' : '16px 0',
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    boxShadow: '0 6px 16px rgba(255,107,107,0.18)'
                  }}
                  aria-label={`Search with ${searchData.benefits.length} benefits`}
                >
                  <span role="img" aria-label="search">🔍</span> Search with {searchData.benefits.length} benefit{searchData.benefits.length > 1 ? 's' : ''}
                </Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    </section>
  );
};

// Benefits Section Component
const BenefitsSection = ({ searchData, toggleBenefit, isMobile }) => {
  const benefits = [
    { key: 'health_insurance', label: 'Health Insurance', icon: '🏥', description: 'Medical coverage' },
    { key: 'dental_insurance', label: 'Dental Insurance', icon: '🦷', description: 'Dental care' },
    { key: 'vision_insurance', label: 'Vision Insurance', icon: '👁️', description: 'Eye care' },
    { key: 'life_insurance', label: 'Life Insurance', icon: '🛡️', description: 'Life coverage' },
    { key: 'retirement_plan', label: 'Retirement Plan', icon: '💰', description: '401(k) & pension options' },
    { key: 'living_wage_no_tipping', label: 'Living Wage (No Tipping)', icon: '💵', description: 'No tipping—staff earn a living salary' },
    { key: 'paid_time_off', label: 'Paid Time Off', icon: '🏖️', description: 'Vacation days' },
    { key: 'sick_leave', label: 'Sick Leave', icon: '🤒', description: 'Health days' },
    { key: 'parental_leave', label: 'Parental Leave', icon: '👶', description: 'Family time' },
    { key: 'flexible_schedule', label: 'Flexible Schedule', icon: '⏰', description: 'Work-life balance' },
    { key: 'employee_discount', label: 'Employee Discount', icon: '🎫', description: 'Staff perks' },
    { key: 'meal_allowance', label: 'Meal Allowance', icon: '🍽️', description: 'Food benefits' },
    { key: 'transportation_benefit', label: 'Transportation Benefit', icon: '🚗', description: 'Commute assistance' },
    { key: 'education_assistance', label: 'Education Assistance', icon: '📚', description: 'Skill development' },
    { key: 'gym_membership', label: 'Gym Membership', icon: '💪', description: 'Fitness benefits' }
  ];

  // Custom benefit order as specified
  const orderedBenefitKeys = [
    'health_insurance', 'living_wage_no_tipping', 'retirement_plan', 'paid_time_off',
    'education_assistance', 'sick_leave', 'flexible_schedule', 'life_insurance',
    'parental_leave', 'dental_insurance', 'vision_insurance', 'meal_allowance',
    'employee_discount', 'transportation_benefit', 'gym_membership', 'other'
  ];
  const allBenefits = [
    ...benefits,
    { key: 'other', label: 'Other', icon: '✨', description: 'Something else awesome!' }
  ];
  const orderedBenefits = orderedBenefitKeys.map(key => allBenefits.find(b => b.key === key)).filter(Boolean);

  return (
    <section id="benefits-section" style={{ paddingBottom: isMobile ? '20px' : '60px', position: 'relative' }}>
      {/* Fun blob shape background */}
      <div style={{
        position: 'absolute',
        top: isMobile ? '-18px' : '-60px',
        left: isMobile ? '-18px' : '-80px',
        width: isMobile ? '120px' : '320px',
        height: isMobile ? '80px' : '220px',
        zIndex: 0,
        background: 'radial-gradient(circle at 60% 40%, #feca57 0%, #ff6b6b 80%, transparent 100%)',
        opacity: 0.13,
        filter: 'blur(18px)'
      }} />
      {/* Playful strokes around benefit cards section */}
      <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '8%', top: isMobile ? '13px' : '43px', zIndex: 0, transform: 'rotate(-10deg)' }} aria-hidden="true"><path d="M5 25 Q 20 5, 40 25 T 75 25" stroke="#4ecdc4" strokeWidth="4" fill="none"/></svg>
      <svg width="100" height="36" viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '10%', top: isMobile ? '63px' : '123px', zIndex: 0, transform: 'rotate(18deg)' }} aria-hidden="true"><path d="M10 30 Q 40 5, 60 30 T 90 30" stroke="#feca57" strokeWidth="5" fill="none"/></svg>
      <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '50%', top: isMobile ? '93px' : '183px', zIndex: 0, transform: 'rotate(-25deg)' }} aria-hidden="true"><path d="M10 30 Q 40 5, 60 30 T 110 30" stroke="#764ba2" strokeWidth="5" fill="none"/></svg>
      <svg width="90" height="32" viewBox="0 0 90 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '30%', top: isMobile ? '63px' : '113px', zIndex: 1, transform: 'rotate(8deg)' }} aria-hidden="true"><path d="M5 25 Q 20 5, 45 25 T 85 25" stroke="#4ecdc4" strokeWidth="4" fill="none"/></svg>
      <svg width="110" height="38" viewBox="0 0 110 38" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '25%', top: isMobile ? '103px' : '163px', zIndex: 1, transform: 'rotate(-14deg)' }} aria-hidden="true"><path d="M10 30 Q 40 5, 60 30 T 100 30" stroke="#764ba2" strokeWidth="5" fill="none"/></svg>
      <svg width="70" height="28" viewBox="0 0 70 28" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: isMobile ? '2%' : '0%', top: isMobile ? '180px' : '260px', zIndex: 1, transform: 'rotate(-18deg)' }} aria-hidden="true"><path d="M5 20 Q 20 5, 35 20 T 65 20" stroke="#feca57" strokeWidth="4" fill="none"/></svg>
      <svg width="90" height="32" viewBox="0 0 90 32" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: isMobile ? '2%' : '0%', top: isMobile ? '220px' : '320px', zIndex: 1, transform: 'rotate(12deg)' }} aria-hidden="true"><path d="M5 25 Q 20 5, 45 25 T 85 25" stroke="#4ecdc4" strokeWidth="4" fill="none"/></svg>
      <svg width="60" height="24" viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: isMobile ? '40%' : '35%', bottom: isMobile ? '-10px' : '-30px', zIndex: 1, transform: 'rotate(-8deg)' }} aria-hidden="true"><path d="M5 18 Q 15 5, 30 18 T 55 18" stroke="#764ba2" strokeWidth="3.5" fill="none"/></svg>
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <Row className="justify-content-center">
          <Col lg={10}>
            <div className="text-center mb-5" style={{ position: 'relative' }}>
              {/* Playful squiggle accent */}
              <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: isMobile ? '10%' : 'calc(50% - 40px)', top: isMobile ? '-10px' : '-30px', opacity: 0.7 }} aria-hidden="true"><path d="M5 25 Q 20 5, 40 25 T 75 25" stroke="#4ecdc4" strokeWidth="4" fill="none"/></svg>
              <div style={{
                background: 'rgba(255,255,255,0.92)',
                borderRadius: '32px 32px 24px 40px',
                padding: isMobile ? '10px 4px 10px 4px' : '36px 18px 30px 18px',
                backdropFilter: 'blur(15px)',
                border: '2px solid rgba(255,255,255,0.2)',
                marginBottom: isMobile ? '10px' : '30px',
                boxShadow: '0 6px 24px rgba(102,126,234,0.10)'
              }}>
                <h2 style={{
                  fontSize: isMobile ? '1.1rem' : '2.6rem',
                  fontWeight: '900',
                  background: 'linear-gradient(90deg, #ff6b6b, #feca57, #4ecdc4, #764ba2, #45b7d1)',
                  backgroundSize: '200% 200%',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginBottom: '10px',
                  display: 'inline-block',
                  fontFamily: 'Poppins, Inter, sans-serif',
                  letterSpacing: '-1px',
                  lineHeight: 1.1
                }}>
                  <span role="img" aria-label="sparkle" style={{ filter: 'none', marginRight: 8 }}>🌟</span>
                  Perks that ate, for those who serve.
                </h2>
                <p style={{ 
                  fontSize: isMobile ? '0.92rem' : '1.18rem',
                  color: '#444',
                  fontWeight: '500',
                  marginBottom: '0',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  Pick the perks that vibe with your lifestyle and work goals.
                </p>
              </div>
            </div>
            {/* Playful, asymmetric cards grid */}
            <div style={{ 
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(auto-fit, minmax(210px, 1fr))',
              gap: isMobile ? '14px' : '28px',
              marginBottom: isMobile ? '18px' : '30px',
              position: 'relative'
            }}>
              {orderedBenefits.map((benefit, index) => {
                const isSelected = searchData.benefits.includes(benefit.key);
                return (
                  <div
                    key={benefit.key}
                    onClick={() => toggleBenefit(benefit.key)}
                    style={{
                      background: isSelected ? 'linear-gradient(120deg, #ffecd2 0%, #fcb69f 100%)' : 'rgba(255,255,255,0.96)',
                      borderRadius: '28px',
                      boxShadow: isSelected ? '0 12px 32px rgba(255,107,107,0.18), 0 2px 12px rgba(102,126,234,0.10)' : '0 2px 12px rgba(102,126,234,0.10)',
                      border: isSelected ? '2.5px solid #222' : '2px solid #e0e0e0',
                      width: isMobile ? 140 : 200,
                      height: isMobile ? 140 : 200,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.25s cubic-bezier(.68,-0.55,.27,1.55)',
                      willChange: 'transform',
                      transform: isSelected ? `scale(1.04) rotate(${index % 2 === 0 ? '-8deg' : '8deg'})` : 'scale(1) rotate(0deg)',
                      outline: isSelected ? '2.5px solid #222' : 'none',
                      margin: '0 auto',
                      userSelect: 'none',
                    }}
                    aria-pressed={isSelected}
                    tabIndex={0}
                    role="button"
                    onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && toggleBenefit(benefit.key)}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = isSelected ? `scale(1.07) rotate(${index % 2 === 0 ? '-12deg' : '12deg'})` : `scale(1.03) rotate(${index % 2 === 0 ? '-6deg' : '6deg'})`;
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = isSelected ? `scale(1.04) rotate(${index % 2 === 0 ? '-8deg' : '8deg'})` : 'scale(1) rotate(0deg)';
                    }}
                    onMouseDown={e => {
                      e.currentTarget.style.transform = isSelected ? `scale(0.98) rotate(${index % 2 === 0 ? '-16deg' : '16deg'})` : `scale(0.98) rotate(${index % 2 === 0 ? '-8deg' : '8deg'})`;
                    }}
                    onMouseUp={e => {
                      e.currentTarget.style.transform = isSelected ? `scale(1.04) rotate(${index % 2 === 0 ? '-8deg' : '8deg'})` : 'scale(1) rotate(0deg)';
                    }}
                  >
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                      <span style={{ fontSize: isMobile ? '2.2rem' : '2.7rem', marginBottom: '8px', lineHeight: 1 }}>{benefit.icon}</span>
                      <span style={{ fontSize: isMobile ? '.9rem' : '1.13rem', fontWeight: 800, color: '#222', marginBottom: 2 }}>{benefit.label}</span>
                      <span style={{ fontSize: isMobile ? '.8rem' : '0.98rem', color: '#444', fontWeight: 500 }}>{benefit.description}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

// Floating Search Button Component
const FloatingSearchButton = ({ searchData, showFloatingButton, handleSearch, isMobile }) => {
  if (!searchData.benefits.length || !showFloatingButton) return null;
  
  return (
    <div style={{
      position: 'fixed',
      left: 0,
      right: 0,
      bottom: isMobile ? 0 : 24,
      zIndex: 100,
      display: 'flex',
      justifyContent: 'center',
      padding: isMobile ? '12px 10px' : '0',
      background: isMobile ? 'rgba(255,255,255,0.98)' : 'none',
      boxShadow: isMobile ? '0 -2px 16px rgba(102,126,234,0.10)' : 'none',
    }}>
      <Button
        size="lg"
        style={{
          background: 'linear-gradient(120deg, #ff6b6b 0%, #feca57 60%, #4ecdc4 100%)',
          color: '#222',
          fontWeight: 800,
          border: '2px solid #222',
          borderRadius: '16px',
          minWidth: isMobile ? '100%' : 320,
          fontSize: isMobile ? '1.08rem' : '1.13rem',
          padding: isMobile ? '16px 0' : '16px 0',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          boxShadow: '0 6px 16px rgba(255,107,107,0.18)'
        }}
        onClick={handleSearch}
        aria-label={`Search with ${searchData.benefits.length} benefits`}
      >
        <span role="img" aria-label="search">🔍</span> Search with {searchData.benefits.length} benefit{searchData.benefits.length > 1 ? 's' : ''}
      </Button>
    </div>
  );
};

const HomeGenZ = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        query: '',
        location: '',
        benefits: []
    });
    const [showCuisineDropdown, setShowCuisineDropdown] = useState(false);
    const [selectedCuisines, setSelectedCuisines] = useState([]);
    const cuisineDropdownRef = useRef(null);
    const [showFloatingButton, setShowFloatingButton] = useState(true);
    const footerRef = useRef(null);

    // Responsive check (use effect for SSR safety)
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Handle outside click for cuisine dropdown
    useEffect(() => {
        function handleClickOutside(event) {
            if (cuisineDropdownRef.current && !cuisineDropdownRef.current.contains(event.target)) {
                setShowCuisineDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchData.query) params.set('q', searchData.query);
        if (searchData.location) params.set('location', searchData.location);
        if (selectedCuisines.length > 0) {
            selectedCuisines.forEach(cuisine => params.append('cuisines', cuisine));
        }
        if (searchData.benefits.length > 0) {
            searchData.benefits.forEach(benefit => params.append('benefits', benefit));
        }
        navigate(`/search?${params.toString()}`);
    };

    const toggleBenefit = (benefit) => {
        setSearchData(prev => ({
            ...prev,
            benefits: prev.benefits.includes(benefit)
                ? prev.benefits.filter(b => b !== benefit)
                : [...prev.benefits, benefit]
        }));
    };

    useEffect(() => {
        const handleScroll = () => {
            const perksSection = document.getElementById('benefits-section');
            const footer = footerRef.current;
            let show = true;
            if (perksSection) {
                const rect = perksSection.getBoundingClientRect();
                show = rect.top < window.innerHeight * 0.2;
            }
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                // Hide if the floating button would overlap the footer
                if (footerRect.top < window.innerHeight - 80) {
                    show = false;
                }
            }
            setShowFloatingButton(show);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
            minHeight: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: isMobile ? 'auto' : 'visible',
            paddingBottom: '2rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
                <HeroSection 
                    searchData={searchData}
                    setSearchData={setSearchData}
                    selectedCuisines={selectedCuisines}
                    setSelectedCuisines={setSelectedCuisines}
                    showCuisineDropdown={showCuisineDropdown}
                    setShowCuisineDropdown={setShowCuisineDropdown}
                    cuisineDropdownRef={cuisineDropdownRef}
                    handleSearch={handleSearch}
                    isMobile={isMobile}
                />
                <BenefitsSection 
                    searchData={searchData}
                    toggleBenefit={toggleBenefit}
                    isMobile={isMobile}
                />
            </div>
            <FloatingSearchButton 
                searchData={searchData}
                showFloatingButton={showFloatingButton}
                handleSearch={handleSearch}
                isMobile={isMobile}
            />
            <div ref={footerRef} id="footer-genz-observer" />
        </div>
    );
};

export default HomeGenZ;