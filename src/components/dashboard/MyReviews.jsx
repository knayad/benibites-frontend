import React from 'react';
import { Card, Badge } from 'react-bootstrap';

const MyReviews = () => {
  // TODO: Fetch user's reviews from Redux store
  const reviews = []; // Placeholder for user reviews

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
      <Card.Header>
        <h4>My Reviews</h4>
      </Card.Header>
      <Card.Body>
        {reviews.length === 0 ? (
          <div className="text-center py-4">
            <p className="text-muted">You haven't written any reviews yet.</p>
            <p className="text-muted">
              Start reviewing restaurants to help others make informed decisions!
            </p>
          </div>
        ) : (
          <div>
            {reviews.map(review => (
              <Card key={review.id} className="mb-3">
                <Card.Body>
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h6 className="mb-1">{review.restaurantName}</h6>
                      <div className="stars mb-2">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <small className="text-muted">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </small>
                  </div>
                  
                  <h6>{review.title}</h6>
                  <p className="mb-2">{review.comment}</p>
                  
                  <div className="d-flex gap-2">
                    <Badge bg="outline-secondary">Edit</Badge>
                    <Badge bg="outline-danger">Delete</Badge>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default MyReviews; 