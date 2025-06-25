import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Card, Button, Nav, Tab } from 'react-bootstrap';
import { loadUser, selectUser, selectIsAuthenticated } from '../../store/slices/authSlice';
import Profile from './Profile';
import MyReviews from './MyReviews';

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUser());
    }
  }, [dispatch, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="main-content">
        <Container className="py-5">
          <div className="text-center">
            <h2 style={{ color: 'var(--text-primary)' }}>Please sign in to access your dashboard</h2>
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
            <h1 style={{ color: 'var(--text-primary)' }}>Welcome back, {user?.name || 'User'}!</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Manage your profile and reviews</p>
          </Col>
        </Row>

        <Row>
          <Col>
            <Tab.Container id="dashboard-tabs" defaultActiveKey="profile">
              <Row>
                <Col md={3}>
                  <Card>
                    <Card.Body>
                      <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                          <Nav.Link eventKey="profile">Profile</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                          <Nav.Link eventKey="reviews">My Reviews</Nav.Link>
                        </Nav.Item>
                      </Nav>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={9}>
                  <Tab.Content>
                    <Tab.Pane eventKey="profile">
                      <Profile />
                    </Tab.Pane>
                    <Tab.Pane eventKey="reviews">
                      <MyReviews />
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

export default Dashboard; 