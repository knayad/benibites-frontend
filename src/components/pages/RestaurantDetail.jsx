import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Badge, Button, Form, Alert, Spinner } from 'react-bootstrap';
import { 
    fetchRestaurantById, 
    selectCurrentRestaurant, 
    selectRestaurantsLoading, 
    selectRestaurantsError 
} from '../../store/slices/restaurantsSlice';
import { 
    fetchReviews, 
    createReview, 
    selectAllReviews, 
    selectReviewsLoading 
} from '../../store/slices/reviewsSlice';
import { selectIsAuthenticated } from '../../store/slices/authSlice';

const RestaurantDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const currentRestaurant = useSelector(selectCurrentRestaurant);
    const loading = useSelector(selectRestaurantsLoading);
    const error = useSelector(selectRestaurantsError);
    const reviews = useSelector(selectAllReviews);
    const reviewsLoading = useSelector(selectReviewsLoading);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [reviewData, setReviewData] = useState({
        foodRating: 5,
        benefitsRating: 5,
        title: '',
        content: ''
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchRestaurantById(id));
            dispatch(fetchReviews(id));
        }
    }, [id, dispatch]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        const reviewPayload = {
            restaurant: id,
            ...reviewData
        };
        await dispatch(createReview(reviewPayload));
        setShowReviewForm(false);
        setReviewData({
            foodRating: 5,
            benefitsRating: 5,
            title: '',
            content: ''
        });
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

    const getBenefitLabel = (benefitKey) => {
        const benefitLabels = {
            health_insurance: 'Health Insurance',
            dental_insurance: 'Dental Insurance',
            vision_insurance: 'Vision Insurance',
            life_insurance: 'Life Insurance',
            retirement_plan: 'Retirement Plan',
            living_wage_no_tipping: 'Living Wage (No Tipping)',
            paid_time_off: 'Paid Time Off',
            sick_leave: 'Sick Leave',
            parental_leave: 'Parental Leave',
            flexible_schedule: 'Flexible Schedule',
            employee_discount: 'Employee Discount',
            meal_allowance: 'Meal Allowance',
            transportation_benefit: 'Transportation Benefit',
            education_assistance: 'Education Assistance',
            gym_membership: 'Gym Membership'
        };
        return benefitLabels[benefitKey] || benefitKey;
    };

    if (loading) {
        return (
            <div className="main-content">
                <Container className="py-5">
                    <div className="loading-spinner">
                        <Spinner animation="border" role="status" variant="warning">
                            <span className="visually-hidden">Loading...</span>
                        </Spinner>
                    </div>
                </Container>
            </div>
        );
    }

    if (error) {
        return (
            <div className="main-content">
                <Container className="py-5">
                    <Alert variant="danger">
                        Error: {error}
                    </Alert>
                </Container>
            </div>
        );
    }

    if (!currentRestaurant) {
        return (
            <div className="main-content">
                <Container className="py-5">
                    <Alert variant="info">
                        Restaurant not found.
                    </Alert>
                </Container>
            </div>
        );
    }

    const benefits = getRestaurantBenefits(currentRestaurant);

    return (
        <div className="main-content">
            <Container className="py-5">
                <Row className="mb-5">
                    <Col>
                        <h1 style={{ color: 'var(--text-primary)' }}>{currentRestaurant.name}</h1>
                        {currentRestaurant.address && (
                            <p style={{ color: 'var(--text-secondary)' }} className="mb-2">
                                📍 {currentRestaurant.address.street}, {currentRestaurant.address.city}, {currentRestaurant.address.state}
                            </p>
                        )}
                        <div className="d-flex align-items-center gap-3 mb-3">
                            <div className="stars">
                                {renderStars(currentRestaurant.averageBenefitsRating || 0)}
                            </div>
                            <span style={{ color: 'var(--text-secondary)' }}>
                                {currentRestaurant.averageBenefitsRating ? `${currentRestaurant.averageBenefitsRating.toFixed(1)}/5` : 'No ratings yet'} 
                                ({currentRestaurant.totalReviews || 0} reviews)
                            </span>
                        </div>
                        {currentRestaurant.cuisine && currentRestaurant.cuisine.length > 0 && (
                            <p style={{ color: 'var(--text-secondary)' }}>
                                🍽️ {currentRestaurant.cuisine.join(', ')}
                            </p>
                        )}
                    </Col>
                </Row>

                <Row>
                    <Col lg={8}>
                        <Card className="mb-4">
                            <Card.Header>
                                <h4 style={{ color: 'var(--text-primary)' }}>Employee Benefits</h4>
                            </Card.Header>
                            <Card.Body>
                                {benefits.length > 0 ? (
                                    <div className="d-flex flex-wrap gap-2">
                                        {benefits.map(benefit => (
                                            <Badge key={benefit} bg="warning" text="dark" className="fs-6 p-2">
                                                {getBenefitLabel(benefit)}
                                            </Badge>
                                        ))}
                                    </div>
                                ) : (
                                    <p style={{ color: 'var(--text-secondary)' }}>No benefits information available.</p>
                                )}
                            </Card.Body>
                        </Card>

                        <Card>
                            <Card.Header className="d-flex justify-content-between align-items-center">
                                <h4 style={{ color: 'var(--text-primary)' }}>Reviews</h4>
                                {isAuthenticated && (
                                    <Button 
                                        variant="outline-primary" 
                                        size="sm"
                                        onClick={() => setShowReviewForm(!showReviewForm)}
                                    >
                                        {showReviewForm ? 'Cancel' : 'Write a Review'}
                                    </Button>
                                )}
                            </Card.Header>
                            <Card.Body>
                                {showReviewForm && (
                                    <Card className="mb-4">
                                        <Card.Body>
                                            <h5 style={{ color: 'var(--text-primary)' }}>Write Your Review</h5>
                                            <Form onSubmit={handleReviewSubmit}>
                                                <Row>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Food Rating</Form.Label>
                                                            <Form.Select
                                                                value={reviewData.foodRating}
                                                                onChange={(e) => setReviewData(prev => ({ ...prev, foodRating: parseInt(e.target.value) }))}
                                                            >
                                                                {[5, 4, 3, 2, 1].map(rating => (
                                                                    <option key={rating} value={rating}>{rating} Stars</option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                    <Col md={6}>
                                                        <Form.Group className="mb-3">
                                                            <Form.Label>Benefits Rating</Form.Label>
                                                            <Form.Select
                                                                value={reviewData.benefitsRating}
                                                                onChange={(e) => setReviewData(prev => ({ ...prev, benefitsRating: parseInt(e.target.value) }))}
                                                            >
                                                                {[5, 4, 3, 2, 1].map(rating => (
                                                                    <option key={rating} value={rating}>{rating} Stars</option>
                                                                ))}
                                                            </Form.Select>
                                                        </Form.Group>
                                                    </Col>
                                                </Row>
                                                
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Review Title</Form.Label>
                                                    <Form.Control
                                                        type="text"
                                                        value={reviewData.title}
                                                        onChange={(e) => setReviewData(prev => ({ ...prev, title: e.target.value }))}
                                                        placeholder="Brief summary of your experience"
                                                        required
                                                    />
                                                </Form.Group>
                                                
                                                <Form.Group className="mb-3">
                                                    <Form.Label>Review Content</Form.Label>
                                                    <Form.Control
                                                        as="textarea"
                                                        rows={4}
                                                        value={reviewData.content}
                                                        onChange={(e) => setReviewData(prev => ({ ...prev, content: e.target.value }))}
                                                        placeholder="Share your experience..."
                                                        required
                                                    />
                                                </Form.Group>
                                                
                                                <div className="d-flex gap-2">
                                                    <Button type="submit" variant="primary">
                                                        Submit Review
                                                    </Button>
                                                    <Button 
                                                        variant="outline-secondary" 
                                                        onClick={() => setShowReviewForm(false)}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </Form>
                                        </Card.Body>
                                    </Card>
                                )}

                                {reviewsLoading ? (
                                    <div className="loading-spinner">
                                        <Spinner animation="border" role="status" variant="warning">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </div>
                                ) : reviews.length === 0 ? (
                                    <p style={{ color: 'var(--text-secondary)' }}>No reviews yet. Be the first to review this restaurant!</p>
                                ) : (
                                    <div>
                                        {reviews.map(review => (
                                            <Card key={review._id} className="mb-3">
                                                <Card.Body>
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <div>
                                                            <h6 className="mb-1" style={{ color: 'var(--text-primary)' }}>{review.title}</h6>
                                                            <div className="d-flex gap-3 mb-2">
                                                                <div className="stars">
                                                                    Food: {renderStars(review.foodRating)}
                                                                </div>
                                                                <div className="stars">
                                                                    Benefits: {renderStars(review.benefitsRating)}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <small style={{ color: 'var(--text-secondary)' }}>
                                                            {new Date(review.createdAt).toLocaleDateString()}
                                                        </small>
                                                    </div>
                                                    <p className="mb-0" style={{ color: 'var(--text-secondary)' }}>{review.content}</p>
                                                </Card.Body>
                                            </Card>
                                        ))}
                                    </div>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>

                    <Col lg={4}>
                        <Card className="mb-4">
                            <Card.Header>
                                <h5 style={{ color: 'var(--text-primary)' }}>Restaurant Info</h5>
                            </Card.Header>
                            <Card.Body>
                                {currentRestaurant.cuisine && currentRestaurant.cuisine.length > 0 && (
                                    <div className="mb-3">
                                        <strong style={{ color: 'var(--text-primary)' }}>Cuisine:</strong> 
                                        <span style={{ color: 'var(--text-secondary)' }}> {currentRestaurant.cuisine.join(', ')}</span>
                                    </div>
                                )}
                                {currentRestaurant.address && (
                                    <div className="mb-3">
                                        <strong style={{ color: 'var(--text-primary)' }}>Address:</strong><br />
                                        <span style={{ color: 'var(--text-secondary)' }}>
                                            {currentRestaurant.address.street}<br />
                                            {currentRestaurant.address.city}, {currentRestaurant.address.state} {currentRestaurant.address.zipCode}
                                        </span>
                                    </div>
                                )}
                                {currentRestaurant.description && (
                                    <div className="mb-3">
                                        <strong style={{ color: 'var(--text-primary)' }}>Description:</strong><br />
                                        <span style={{ color: 'var(--text-secondary)' }}>{currentRestaurant.description}</span>
                                    </div>
                                )}
                            </Card.Body>
                        </Card>

                        {!isAuthenticated && (
                            <Card>
                                <Card.Body className="text-center">
                                    <h6 style={{ color: 'var(--text-primary)' }}>Want to review this restaurant?</h6>
                                    <p style={{ color: 'var(--text-secondary)' }} className="small">
                                        Sign in to share your experience and help others make informed decisions.
                                    </p>
                                    <Button variant="outline-primary" size="sm">
                                        Sign In to Review
                                    </Button>
                                </Card.Body>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default RestaurantDetail; 