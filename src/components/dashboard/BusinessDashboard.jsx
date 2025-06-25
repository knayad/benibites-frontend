import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Nav, Tab } from 'react-bootstrap';
import { loadUser, selectIsAuthenticated, selectIsBusiness } from '../../store/slices/authSlice';
import BusinessProfile from './BusinessProfile';
import BusinessReviews from './BusinessReviews';
import BusinessBenefits from './BusinessBenefits';

const BusinessDashboard = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const isBusiness = useSelector(selectIsBusiness);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated || !isBusiness) {
    return (
      <div className="main-content">
        <Container className="py-5">
          <div className="text-center">
            <h2 style={{ color: 'var(--text-primary)' }}>Access Denied</h2>
            <p style={{ color: 'var(--text-secondary)' }}>This dashboard is only available for business accounts.</p>
            <Button href="/login" variant="primary">
              Sign In
            </Button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="main-content">
      <Container className="py-5">
        <Row className="mb-4">
          <Col>
            <h1 style={{ color: 'var(--text-primary)' }}>Business Dashboard</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage your restaurant profile, benefits, and reviews</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Tab.Container id="business-dashboard-tabs" defaultActiveKey="profile">
              <Row>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="profile">Business Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="benefits">Benefits</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="reviews">Reviews</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="profile">
                      <BusinessProfile />
                    </Tab.Pane>
                    <Tab.Pane eventKey="benefits">
                      <BusinessBenefits />
                    </Tab.Pane>
                    <Tab.Pane eventKey="reviews">
                      <BusinessReviews />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default BusinessDashboard; 