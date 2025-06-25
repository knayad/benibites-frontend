import React from 'react';
import { Card, Badge, Button } from 'react-bootstrap';

const BusinessReviews = () => {
  // TODO: Fetch business reviews from Redux store
  const reviews = []; // Placeholder for business reviews

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span key={i} className={i <= rating ? 'text-warning' : 'text-muted'}>
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <Card>
      <Card.Header className="d-flex justify-content-between align-items-center">
        <h4>Customer Reviews</h4>
        <div>
          <Badge bg="primary" className="me-2">
            {reviews.length} Total Reviews
          </Badge>
          <Badge bg="success">
            {reviews.filter(r => r.rating >= 4).length} Positive
          </Badge>
        </div>
      </Card.Header>
      <Card.Body>
        {reviews.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted">No reviews yet.</p>
            <p className="text-muted">
              Encourage your employees to leave reviews to help attract new talent!
            </p>
          </div>
        ) : (
          <div>
            {reviews.map(review => (
              <Card key={review.id} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <div className="stars mb-2">
                        {renderStars(review.rating)}
                      </div>
                      <h6 className="mb-1">{review.title}</h6>
                    </div>
                    <small className="text-muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  
                  <p className="mb-3">{review.comment}</p>
                  
                  {review.businessResponse ? (
                    <div className="bg-light p-3 rounded">
                      <h6 className="text-primary mb-2">Business Response:</h6>
                      <p className="mb-0">{review.businessResponse}</p>
                    </div>
                  ) : (
                    <Button variant="outline-primary" size="sm">
                      Respond to Review
                    </Button>
                  )}
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default BusinessReviews; 