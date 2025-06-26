import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const HomeGenZ = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        query: '',
        location: '',
        benefits: []
    });

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

    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchData.query) params.set('query', searchData.query);
        if (searchData.location) params.set('location', searchData.location);
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

    return (
        <div style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
            minHeight: '100vh',
            width: '100vw',
            position: 'relative',
            overflow: 'hidden',
            paddingBottom: '2rem'
        }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 2 }}>
                <section style={{ paddingTop: '64px', paddingBottom: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', flexWrap: 'wrap', gap: '32px' }}>
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
                    {/* Playful stroke graphics at different angles */}
                    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '8%', top: '18px', zIndex: 2, transform: 'rotate(-12deg)' }} aria-hidden="true"><path d="M10 30 Q 40 5, 60 30 T 110 30" stroke="#4ecdc4" strokeWidth="5" fill="none"/></svg>
                    <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', right: '10%', top: '80px', zIndex: 2, transform: 'rotate(18deg)' }} aria-hidden="true"><path d="M5 25 Q 20 5, 40 25 T 75 25" stroke="#764ba2" strokeWidth="4" fill="none"/></svg>
                    <svg width="100" height="36" viewBox="0 0 100 36" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: '60%', top: '10px', zIndex: 2, transform: 'rotate(-22deg)' }} aria-hidden="true"><path d="M10 30 Q 40 5, 60 30 T 90 30" stroke="#feca57" strokeWidth="5" fill="none"/></svg>
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
                            fontSize: '2.7rem',
                            fontWeight: 900,
                            background: 'linear-gradient(90deg, #ff6b6b, #feca57, #4ecdc4, #764ba2, #45b7d1)',
                            backgroundSize: '200% 200%',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            marginBottom: '28px',
                            fontFamily: 'Poppins, Inter, sans-serif',
                            letterSpacing: '-1px',
                            lineHeight: 1.1,
                            display: 'inline-block',
                            textAlign: 'left',
                            width: '100%'
                        }}>
                            Restaurants That Actually Give a Fork <span role="img" aria-label="fork">🍴</span>
                        </h1>
                        <p style={{
                            fontSize: '1.18rem',
                            color: '#222',
                            fontWeight: 500,
                            lineHeight: 1.6,
                            marginBottom: '18px',
                            marginTop: 0,
                            textAlign: 'left',
                            width: '100%'
                        }}>
                            Find spots where the food is fire <span role="img" aria-label="fire">🔥</span> and the staff are treated like actual people, not NPCs.
                        </p>
                        <p style={{
                            fontWeight: 700,
                            color: '#ff6b6b',
                            fontSize: '1.08rem',
                            marginBottom: '30px',
                            marginTop: 0,
                            textAlign: 'left',
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
                                padding: '15px 44px',
                                fontSize: '1.13rem',
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                boxShadow: '0 6px 16px rgba(102,126,234,0.18)',
                                marginBottom: '0',
                                marginTop: '0',
                                transition: 'background 0.2s'
                            }}
                            onClick={() => document.getElementById('search-section').scrollIntoView({ behavior: 'smooth' })}
                            aria-label="Jump to search"
                        >
                            Start Exploring
                        </Button>
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
                            padding: '28px 18px',
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
                                                border: 'none',
                                                borderRadius: '16px',
                                                minWidth: '100%',
                                                fontSize: '1.13rem',
                                                padding: '16px 0',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                boxShadow: '0 6px 16px rgba(255,107,107,0.18)'
                                            }}
                                            aria-label="Search restaurants"
                                        >
                                            <span role="img" aria-label="search">🔍</span> Search
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </section>

                <section style={{ paddingBottom: '60px', position: 'relative' }}>
                    {/* Fun blob shape background */}
                    <div style={{
                        position: 'absolute',
                        top: '-60px',
                        left: '-80px',
                        width: '320px',
                        height: '220px',
                        zIndex: 0,
                        background: 'radial-gradient(circle at 60% 40%, #feca57 0%, #ff6b6b 80%, transparent 100%)',
                        opacity: 0.25,
                        filter: 'blur(18px)'
                    }} />
                    <Container style={{ position: 'relative', zIndex: 1 }}>
                        <Row className="justify-content-center">
                            <Col lg={10}>
                                <div className="text-center mb-5" style={{ position: 'relative' }}>
                                    {/* Playful squiggle accent */}
                                    <svg width="80" height="30" viewBox="0 0 80 30" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', left: 'calc(50% - 40px)', top: '-30px' }} aria-hidden="true"><path d="M5 25 Q 20 5, 40 25 T 75 25" stroke="#4ecdc4" strokeWidth="4" fill="none"/></svg>
                                    <div style={{
                                        background: 'rgba(255,255,255,0.92)',
                                        borderRadius: '32px 32px 24px 40px',
                                        padding: '36px 18px 30px 18px',
                                        backdropFilter: 'blur(15px)',
                                        border: '2px solid rgba(255,255,255,0.2)',
                                        marginBottom: '30px',
                                        boxShadow: '0 6px 24px rgba(102,126,234,0.10)'
                                    }}>
                                        <h2 style={{
                                            fontSize: '2.6rem',
                                            fontWeight: '900',
                                            background: 'linear-gradient(90deg, #ff6b6b, #feca57, #4ecdc4, #764ba2, #45b7d1)',
                                            backgroundSize: '200% 200%',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            marginBottom: '15px',
                                            display: 'inline-block',
                                            fontFamily: 'Poppins, Inter, sans-serif',
                                            letterSpacing: '-1px',
                                            lineHeight: 1.1
                                        }}>
                                            <span role="img" aria-label="sparkle" style={{ filter: 'none', marginRight: 8 }}>🌟</span>
                                            Perks that ate, for those who serve.
                                        </h2>
                                        <p style={{ 
                                            fontSize: '1.18rem',
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
                                    gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
                                    gap: '28px',
                                    marginBottom: '30px',
                                    position: 'relative'
                                }}>
                                    {[...benefits, { key: 'other', label: 'Other', icon: '✨', description: 'Something else awesome!' }].map((benefit, index) => (
                                        <div
                                            key={benefit.key}
                                            onClick={() => toggleBenefit(benefit.key)}
                                            style={{ 
                                                background: searchData.benefits.includes(benefit.key) 
                                                    ? 'linear-gradient(120deg, #ff6b6b 0%, #feca57 60%, #4ecdc4 100%)' 
                                                    : 'rgba(255,255,255,0.96)',
                                                borderRadius: index % 2 === 0 ? '36px 18px 32px 24px' : '24px 36px 18px 32px',
                                                padding: '32px 18px 28px 18px',
                                                textAlign: 'center',
                                                cursor: 'pointer',
                                                transition: 'all 0.25s cubic-bezier(.68,-0.55,.27,1.55)',
                                                willChange: 'transform',
                                                transform: searchData.benefits.includes(benefit.key)
                                                    ? `scale(1.04) translateY(-6px) rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`
                                                    : undefined,
                                                boxShadow: searchData.benefits.includes(benefit.key)
                                                    ? '0 12px 32px rgba(255,107,107,0.18), 0 2px 12px rgba(102,126,234,0.10)'
                                                    : '0 4px 16px rgba(102,126,234,0.08)',
                                                outline: searchData.benefits.includes(benefit.key) ? '2.5px solid #4ecdc4' : 'none',
                                                position: 'relative',
                                                overflow: 'visible'
                                            }}
                                            aria-pressed={searchData.benefits.includes(benefit.key)}
                                            tabIndex={0}
                                            role="button"
                                            onKeyPress={e => (e.key === 'Enter' || e.key === ' ') && toggleBenefit(benefit.key)}
                                            onMouseEnter={e => {
                                                e.currentTarget.style.transform = `scale(1.03) rotate(${index % 2 === 0 ? '-6deg' : '6deg'})`;
                                            }}
                                            onMouseLeave={e => {
                                                e.currentTarget.style.transform = searchData.benefits.includes(benefit.key)
                                                    ? `scale(1.04) translateY(-6px) rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`
                                                    : 'scale(1) rotate(0deg)';
                                            }}
                                            onMouseDown={e => {
                                                e.currentTarget.style.transform = `scale(0.98) rotate(${index % 2 === 0 ? '-16deg' : '16deg'})`;
                                            }}
                                            onMouseUp={e => {
                                                e.currentTarget.style.transform = searchData.benefits.includes(benefit.key)
                                                    ? `scale(1.04) translateY(-6px) rotate(${index % 2 === 0 ? '-10deg' : '10deg'})`
                                                    : `scale(1.03) rotate(${index % 2 === 0 ? '-6deg' : '6deg'})`;
                                            }}
                                        >
                                            {/* Fun floating shape accent */}
                                            <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: '-18px', left: 'calc(50% - 24px)', zIndex: 0, opacity: 0.18 }} aria-hidden="true"><ellipse cx="24" cy="12" rx="24" ry="12" fill="#feca57"/></svg>
                                            <div style={{ 
                                                fontSize: '2.5rem', 
                                                marginBottom: '15px',
                                                zIndex: 1,
                                                position: 'relative',
                                                filter: searchData.benefits.includes(benefit.key) ? 'drop-shadow(0 2px 8px #764ba2)' : 'none'
                                            }}>
                                                <span role="img" aria-label={benefit.label}>{benefit.icon}</span>
                                            </div>
                                            <h6 style={{ 
                                                marginBottom: '8px', 
                                                color: searchData.benefits.includes(benefit.key) ? '#222' : '#333',
                                                fontWeight: '800',
                                                fontSize: '1.08rem',
                                                fontFamily: 'Poppins, Inter, sans-serif',
                                                letterSpacing: '-0.5px',
                                                zIndex: 1,
                                                position: 'relative'
                                            }}>
                                                {benefit.label}
                                            </h6>
                                            <small style={{ 
                                                color: searchData.benefits.includes(benefit.key) ? '#333' : '#666',
                                                fontWeight: '500',
                                                zIndex: 1,
                                                position: 'relative'
                                            }}>
                                                {benefit.description}
                                            </small>
                                        </div>
                                    ))}
                                </div>
                                {searchData.benefits.length > 0 && (
                                    <div className="text-center mt-4">
                                        <Button 
                                            onClick={handleSearch}
                                            size="lg"
                                            style={{
                                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                                color: 'white',
                                                border: 'none',
                                                borderRadius: '15px',
                                                padding: '15px 40px',
                                                fontSize: '1.1rem',
                                                fontWeight: '700',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px',
                                                boxShadow: '0 10px 20px rgba(102,126,234,0.3)'
                                            }}
                                        >
                                            🚀 Search with {searchData.benefits.length} benefit{searchData.benefits.length !== 1 ? 's' : ''}
                                        </Button>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </div>
    );
};

export default HomeGenZ; 