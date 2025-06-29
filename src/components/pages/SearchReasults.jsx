import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams, Link } from 'react-router-dom';
import { Card, Row, Col, Form, Button, Badge, Spinner, Alert } from 'react-bootstrap';
import { 
    selectSearchResults, 
    selectSearchLoading, 
    selectSearchError,
    searchRestaurants 
} from '../../store/slices/restaurantsSlice';
import { clearSearchResults } from '../../store/slices/restaurantsSlice';

const SearchResults = () => {
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const [filters, setFilters] = useState({
        query: searchParams.get('query') || '',
        location: searchParams.get('location') || '',
        cuisines: searchParams.getAll('cuisines') || [],
        benefits: searchParams.getAll('benefits') || [],
        rating: searchParams.get('rating') || '',
        sortBy: searchParams.get('sortBy') || 'rating'
    });

    const searchResults = useSelector(selectSearchResults);
    const loading = useSelector(selectSearchLoading);
    const error = useSelector(selectSearchError);

    const benefits = [
        { key: 'healthInsurance', label: 'Health Insurance', icon: '🏥' },
        { key: 'dentalInsurance', label: 'Dental Insurance', icon: '🦷' },
        { key: 'visionInsurance', label: 'Vision Insurance', icon: '👓' },
        { key: 'paidTimeOff', label: 'Paid Time Off', icon: '🏖️' },
        { key: 'sickLeave', label: 'Sick Leave', icon: '🤒' },
        { key: 'retirementPlans', label: 'Retirement Plans', icon: '💼' },
        { key: 'livingWage', label: 'Living Wage, No Tipping', icon: '💵' },
        { key: 'flexibleHours', label: 'Flexible Hours', icon: '⏰' },
        { key: 'employeeDiscounts', label: 'Employee Discounts', icon: '💰' },
        { key: 'trainingPrograms', label: 'Training Programs', icon: '📚' },
        { key: 'careerGrowth', label: 'Career Growth', icon: '📈' }
    ];

    const cuisines = [
        'American', 'Italian', 'Mexican', 'Chinese', 'Japanese', 'Thai', 
        'Indian', 'French', 'Mediterranean', 'Greek', 'Spanish', 'Korean',
        'Vietnamese', 'Middle Eastern', 'Caribbean', 'African', 'Fusion'
    ];

    useEffect(() => {
        const searchData = {};
        if (filters.query) searchData.query = filters.query;
        if (filters.location) searchData.location = filters.location;
        if (filters.cuisines.length > 0) searchData.cuisines = filters.cuisines;
        if (filters.benefits.length > 0) searchData.benefits = filters.benefits;
        if (filters.rating) searchData.rating = filters.rating;
        if (filters.sortBy) searchData.sortBy = filters.sortBy;

        if (Object.keys(searchData).length > 0) {
            dispatch(searchRestaurants(searchData));
        }

        return () => {
            dispatch(clearSearchResults());
        };
    }, [dispatch, filters]);

    const handleFilterChange = (key, value) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        
        // Update URL params
        const newSearchParams = new URLSearchParams();
        if (newFilters.query) newSearchParams.set('query', newFilters.query);
        if (newFilters.location) newSearchParams.set('location', newFilters.location);
        if (newFilters.cuisines && newFilters.cuisines.length > 0) {
            newFilters.cuisines.forEach(cuisine => newSearchParams.append('cuisines', cuisine));
        }
        if (newFilters.benefits.length > 0) {
            newFilters.benefits.forEach(benefit => newSearchParams.append('benefits', benefit));
        }
        if (newFilters.rating) newSearchParams.set('rating', newFilters.rating);
        if (newFilters.sortBy) newSearchParams.set('sortBy', newFilters.sortBy);
        
        setSearchParams(newSearchParams);
    };

    const handleCuisineToggle = (cuisine) => {
        const newCuisines = filters.cuisines.includes(cuisine)
            ? filters.cuisines.filter(c => c !== cuisine)
            : [...filters.cuisines, cuisine];
        handleFilterChange('cuisines', newCuisines);
    };

    const handleBenefitToggle = (benefit) => {
        const newBenefits = filters.benefits.includes(benefit)
            ? filters.benefits.filter(b => b !== benefit)
            : [...filters.benefits, benefit];
        handleFilterChange('benefits', newBenefits);
    };

    const clearFilters = () => {
        const newFilters = {
            query: '',
            location: '',
            cuisines: [],
            benefits: [],
            rating: '',
            sortBy: 'rating'
        };
        setFilters(newFilters);
        setSearchParams({});
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} style={{ color: i <= rating ? '#ffc107' : '#6c757d' }}>
                    ★
                </span>
            );
        }
        return stars;
    };

    const getRestaurantBenefits = (restaurant) => {
        if (!restaurant.staffBenefits) return [];
        return Object.entries(restaurant.staffBenefits)
            .filter(([_, value]) => value === true)
            .map(([key, _]) => key);
    };

    if (loading) {
        return (
            <div className="main-content">
                <div className="container mt-4">
                    <div className="loading-spinner">
                        <Spinner animation="border" role="status" variant="warning">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="main-content">
            <div className="container mt-4">
                <div className="row">
                    {/* Filters Sidebar */}
                    <div className="col-lg-3">
                        <div className="filters-section">
                            <h5 className="mb-3">Filters</h5>
                            
                            {/* Search Query */}
                            <div className="filter-group">
                                <Form.Label className="filter-label">Search</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Restaurant name..."
                                    value={filters.query}
                                    onChange={(e) => handleFilterChange('query', e.target.value)}
                                />
                            </div>

                            {/* Location */}
                            <div className="filter-group">
                                <Form.Label className="filter-label">Location</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="City, State..."
                                    value={filters.location}
                                    onChange={(e) => handleFilterChange('location', e.target.value)}
                                />
                            </div>

                            {/* Cuisine (Multi-select checkboxes) */}
                            <div className="filter-group">
                                <Form.Label className="filter-label">Cuisine</Form.Label>
                                <div className="d-flex flex-wrap gap-2">
                                    {cuisines.map(cuisine => (
                                        <Form.Check
                                            key={cuisine}
                                            type="checkbox"
                                            id={`cuisine-${cuisine}`}
                                            label={cuisine}
                                            checked={filters.cuisines.includes(cuisine)}
                                            onChange={() => handleCuisineToggle(cuisine)}
                                        />
                                    ))}
                                </div>
                            </div>

                            {/* Rating Filter */}
                            <div className="filter-group">
                                <Form.Label className="filter-label">Minimum Rating</Form.Label>
                                <Form.Select
                                    value={filters.rating}
                                    onChange={(e) => handleFilterChange('rating', e.target.value)}
                                >
                                    <option value="">Any Rating</option>
                                    <option value="4">4+ Stars</option>
                                    <option value="3">3+ Stars</option>
                                    <option value="2">2+ Stars</option>
                                </Form.Select>
                            </div>

                            {/* Sort By */}
                            <div className="filter-group">
                                <Form.Label className="filter-label">Sort By</Form.Label>
                                <Form.Select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                >
                                    <option value="rating">Highest Rated</option>
                                    <option value="name">Name A-Z</option>
                                    <option value="reviews">Most Reviews</option>
                                </Form.Select>
                            </div>

                            {/* Benefits */}
                            <div className="filter-group">
                                <Form.Label className="filter-label">Benefits</Form.Label>
                                <div className="benefits-grid">
                                    {benefits.map(benefit => (
                                        <div
                                            key={benefit.key}
                                            className={`benefit-item ${filters.benefits.includes(benefit.key) ? 'selected' : ''}`}
                                            onClick={() => handleBenefitToggle(benefit.key)}
                                        >
                                            <div className="benefit-icon">{benefit.icon}</div>
                                            <div style={{ fontSize: '0.8rem' }}>{benefit.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Clear Filters */}
                            <Button 
                                variant="outline-secondary" 
                                onClick={clearFilters}
                                className="w-100"
                            >
                                Clear Filters
                            </Button>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="col-lg-9">
                        <div className="d-flex justify-content-between align-items-center mb-4">
                            <h4>
                                {searchResults.length > 0 
                                    ? `${searchResults.length} restaurants found`
                                    : 'No restaurants found'
                                }
                            </h4>
                        </div>

                        {error && (
                            <Alert variant="danger" className="mb-4">
                                {error}
                            </Alert>
                        )}

                        {searchResults.length === 0 && !loading && !error && (
                            <div className="text-center py-5">
                                <h5>No restaurants match your criteria</h5>
                                <p>Try adjusting your filters or search terms</p>
                            </div>
                        )}

                        <Row>
                            {searchResults.map(restaurant => (
                                <Col key={restaurant._id} lg={4} md={6} className="mb-4">
                                    <Card className="restaurant-card hover-lift">
                                        <div className="restaurant-image">
                                            {restaurant.images && restaurant.images.length > 0 ? (
                                                <img 
                                                    src={restaurant.images[0]} 
                                                    alt={restaurant.name}
                                                    className="w-100 h-100"
                                                    style={{ objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div className="w-100 h-100 d-flex align-items-center justify-content-center" 
                                                     style={{ background: 'var(--primary-color)' }}>
                                                    <span style={{ fontSize: '3rem', opacity: 0.3 }}>🍽️</span>
                                                </div>
                                            )}
                                        </div>
                                        <Card.Body className="restaurant-content">
                                            <Card.Title className="restaurant-title">
                                                {restaurant.name}
                                            </Card.Title>
                                            
                                            {restaurant.cuisine && restaurant.cuisine.length > 0 && (
                                                <div className="restaurant-cuisine">
                                                    {restaurant.cuisine.join(', ')}
                                                </div>
                                            )}
                                            
                                            {restaurant.address && (
                                                <div className="restaurant-location">
                                                    📍 {restaurant.address.city}, {restaurant.address.state}
                                                </div>
                                            )}
                                            
                                            <div className="restaurant-rating">
                                                <div className="stars">
                                                    {renderStars(restaurant.averageBenefitsRating || 0)}
                                                </div>
                                                <span className="rating-text">
                                                    {restaurant.averageBenefitsRating?.toFixed(1) || '0.0'} 
                                                    ({restaurant.totalReviews || 0} reviews)
                                                </span>
                                            </div>
                                            
                                            <div className="restaurant-benefits">
                                                {getRestaurantBenefits(restaurant).slice(0, 3).map(benefit => {
                                                    const benefitInfo = benefits.find(b => b.key === benefit);
                                                    return benefitInfo ? (
                                                        <Badge 
                                                            key={benefit} 
                                                            bg="warning" 
                                                            text="dark"
                                                            className="benefit-tag"
                                                        >
                                                            {benefitInfo.icon} {benefitInfo.label}
                                                        </Badge>
                                                    ) : null;
                                                })}
                                                {getRestaurantBenefits(restaurant).length > 3 && (
                                                    <Badge bg="secondary" className="benefit-tag">
                                                        +{getRestaurantBenefits(restaurant).length - 3} more
                                                    </Badge>
                                                )}
                                            </div>
                                            
                                            <Link 
                                                to={`/restaurant/${restaurant._id}`}
                                                className="btn btn-primary w-100 mt-3"
                                            >
                                                View Details
                                            </Link>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchResults; 