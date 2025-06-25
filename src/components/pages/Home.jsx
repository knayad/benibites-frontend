import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';

const Home = () => {
    const navigate = useNavigate();
    const [searchData, setSearchData] = useState({
        query: '',
        location: '',
        benefits: []
    });

    const benefits = [
        { key: 'healthInsurance', label: 'Health Insurance', icon: '🏥', description: 'Medical coverage' },
        { key: 'dentalInsurance', label: 'Dental Insurance', icon: '🦷', description: 'Dental care' },
        { key: 'visionInsurance', label: 'Vision Insurance', icon: '👓', description: 'Eye care' },
        { key: 'paidTimeOff', label: 'Paid Time Off', icon: '🏖️', description: 'Vacation days' },
        { key: 'sickLeave', label: 'Sick Leave', icon: '🤒', description: 'Health days' },
        { key: 'retirementPlans', label: 'Retirement Plans', icon: '💼', description: '401(k) & pension options' },
        { key: 'livingWage', label: 'Living Wage, No Tipping', icon: '💵', description: 'No tipping—staff earn a living salary' },
        { key: 'flexibleHours', label: 'Flexible Hours', icon: '⏰', description: 'Work-life balance' },
        { key: 'employeeDiscounts', label: 'Employee Discounts', icon: '💰', description: 'Staff perks' },
        { key: 'trainingPrograms', label: 'Training Programs', icon: '📚', description: 'Skill development' },
        { key: 'careerGrowth', label: 'Career Growth', icon: '📈', description: 'Advancement opportunities' }
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
        <div className="main-content" style={{ background: 'linear-gradient(rgba(20,20,20,0.85), rgba(20,20,20,0.85)), url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80) center/cover no-repeat', minHeight: '100vh', width: '100vw' }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
                {/* Hero Section */}
                <section className="hero fade-in-up">
                    <div className="hero-content">
                        <Container>
                            <Row className="justify-content-center text-center">
                                <Col lg={12}>
                                    <h1 className="fade-in-up">
                                        Find Restaurants That Care About Their Employees
                                    </h1>
                                    <p className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                                        Discover restaurants with great food AND great employee benefits. 
                                        Support businesses that treat their staff well.
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </section>

                {/* Search Form Section */}
                <section className="search-section fade-in-up" style={{ marginTop: '2rem', marginBottom: '2rem', display: 'flex', justifyContent: 'center' }}>
                    <div className="search-form fade-in-up" style={{ animationDelay: '0.4s', boxShadow: '0 8px 32px rgba(0,0,0,0.28), 0 2px 12px rgba(255,107,53,0.18)', border: '2px solid var(--accent-color)', background: 'rgba(30,30,30,0.92)', minWidth: '340px', maxWidth: '900px', width: '100%', margin: '0 auto' }}>
                        <Form onSubmit={handleSearch}>
                            <Row className="g-3 align-items-center justify-content-center">
                                <Col md={4} sm={12}>
                                    <Form.Control
                                        type="text"
                                        placeholder="What are you craving?"
                                        value={searchData.query}
                                        onChange={(e) => setSearchData(prev => ({ ...prev, query: e.target.value }))}
                                        className="form-control-lg"
                                        aria-label="Search for food or restaurant"
                                    />
                                </Col>
                                <Col md={4} sm={12}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Location (City, State)"
                                        value={searchData.location}
                                        onChange={(e) => setSearchData(prev => ({ ...prev, location: e.target.value }))}
                                        className="form-control-lg"
                                        aria-label="Location"
                                    />
                                </Col>
                                <Col md={4} sm={12}>
                                    <Button 
                                        type="submit" 
                                        className="btn-primary w-100 fade-in-up"
                                        size="lg"
                                        aria-label="Find Restaurants"
                                        style={{ background: 'var(--gradient-primary)', color: '#222', fontWeight: 700, border: 'none', minWidth: '240px', whiteSpace: 'nowrap', fontSize: '1.25rem', paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                                    >
                                        <span role="img" aria-label="search">🔍</span> Find Restaurants
                                    </Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </section>

                {/* Benefits Selection Section */}
                <section className="search-section">
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={10}>
                                <div className="text-center mb-5">
                                    <h2 className="fade-in-up">Filter by Employee Benefits</h2>
                                    <p className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                                        Select the benefits that matter most to you
                                    </p>
                                </div>
                                
                                <div className="benefits-grid fade-in-up" style={{ animationDelay: '0.4s' }}>
                                    {benefits.map((benefit, index) => (
                                        <div
                                            key={benefit.key}
                                            className={`benefit-item ${searchData.benefits.includes(benefit.key) ? 'selected' : ''}`}
                                            onClick={() => toggleBenefit(benefit.key)}
                                            style={{ animationDelay: `${0.1 * index}s` }}
                                        >
                                            <div className="benefit-icon">{benefit.icon}</div>
                                            <h6 style={{ marginBottom: '4px', color: 'var(--text-primary)' }}>
                                                {benefit.label}
                                            </h6>
                                            <small style={{ color: 'var(--text-secondary)' }}>
                                                {benefit.description}
                                            </small>
                                        </div>
                                    ))}
                                </div>
                                
                                {searchData.benefits.length > 0 && (
                                    <div className="text-center mt-4 fade-in-up">
                                        <Button 
                                            variant="outline-primary" 
                                            onClick={handleSearch}
                                            size="lg"
                                        >
                                            Search with {searchData.benefits.length} benefit{searchData.benefits.length !== 1 ? 's' : ''}
                                        </Button>
                                    </div>
                                )}
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* Features Section */}
                <section style={{ padding: '80px 0', background: 'var(--primary-color)' }}>
                    <Container>
                        <Row className="justify-content-center text-center mb-5">
                            <Col lg={8}>
                                <h2 className="fade-in-up">Why Choose Restaurants with Great Benefits?</h2>
                                <p className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                                    Supporting businesses that care about their employees creates a better community for everyone.
                                </p>
                            </Col>
                        </Row>
                        
                        <Row className="g-4">
                            <Col lg={4} className="fade-in-up">
                                <Card className="h-100 text-center border-0" style={{ background: 'var(--gradient-card)' }}>
                                    <Card.Body className="p-4">
                                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🤝</div>
                                        <Card.Title style={{ color: 'var(--text-primary)' }}>
                                            Support Good Employers
                                        </Card.Title>
                                        <Card.Text style={{ color: 'var(--text-secondary)' }}>
                                            Choose restaurants that invest in their employees' well-being and professional growth.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            <Col lg={4} className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                                <Card className="h-100 text-center border-0" style={{ background: 'var(--gradient-card)' }}>
                                    <Card.Body className="p-4">
                                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌟</div>
                                        <Card.Title style={{ color: 'var(--text-primary)' }}>
                                            Better Service Quality
                                        </Card.Title>
                                        <Card.Text style={{ color: 'var(--text-secondary)' }}>
                                            Happy employees provide better customer service and create memorable dining experiences.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                            
                            <Col lg={4} className="fade-in-up" style={{ animationDelay: '0.4s' }}>
                                <Card className="h-100 text-center border-0" style={{ background: 'var(--gradient-card)' }}>
                                    <Card.Body className="p-4">
                                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
                                        <Card.Title style={{ color: 'var(--text-primary)' }}>
                                            Build Better Communities
                                        </Card.Title>
                                        <Card.Text style={{ color: 'var(--text-secondary)' }}>
                                            Supporting ethical businesses helps create stronger, more sustainable local communities.
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                </section>

                {/* CTA Section */}
                <section style={{ 
                    padding: '80px 0', 
                    background: 'var(--gradient-dark)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'radial-gradient(circle at 30% 70%, rgba(255, 107, 53, 0.1) 0%, transparent 50%)',
                        pointerEvents: 'none'
                    }}></div>
                    
                    <Container>
                        <Row className="justify-content-center text-center">
                            <Col lg={8}>
                                <h2 className="fade-in-up" style={{ marginBottom: '1.5rem' }}>
                                    Ready to Discover Great Restaurants?
                                </h2>
                                <p className="fade-in-up" style={{ animationDelay: '0.2s', marginBottom: '2rem' }}>
                                    Start your search and find restaurants that value their employees as much as their customers.
                                </p>
                                <div className="fade-in-up" style={{ animationDelay: '0.4s' }}>
                                    <Button 
                                        variant="primary" 
                                        size="lg" 
                                        onClick={() => navigate('/search')}
                                        className="me-3"
                                    >
                                        Start Searching
                                    </Button>
                                    <Button 
                                        variant="outline-light"
                                        size="lg"
                                        onClick={() => navigate('/register')}
                                        style={{ border: '2px solid #fff', color: '#fff', background: 'transparent', fontWeight: 700 }}
                                    >
                                        Join Our Community
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </section>
            </div>
        </div>
    );
};

export default Home; 