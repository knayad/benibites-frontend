import React, { useState } from 'react';
import { Card, Form, Button, Row, Col } from 'react-bootstrap';

const BusinessBenefits = () => {
  const [selectedBenefits, setSelectedBenefits] = useState([]);
  
  const availableBenefits = [
    { id: 'health_insurance', name: 'Health Insurance', icon: '🏥' },
    { id: 'dental_insurance', name: 'Dental Insurance', icon: '🦷' },
    { id: 'vision_insurance', name: 'Vision Insurance', icon: '👁️' },
    { id: 'life_insurance', name: 'Life Insurance', icon: '🛡️' },
    { id: 'retirement_plan', name: 'Retirement Plan', icon: '💰' },
    { id: 'living_wage_no_tipping', name: 'Living Wage (No Tipping)', icon: '💵' },
    { id: 'paid_time_off', name: 'Paid Time Off', icon: '🏖️' },
    { id: 'sick_leave', name: 'Sick Leave', icon: '🤒' },
    { id: 'parental_leave', name: 'Parental Leave', icon: '👶' },
    { id: 'flexible_schedule', name: 'Flexible Schedule', icon: '⏰' },
    { id: 'employee_discount', name: 'Employee Discount', icon: '🎫' },
    { id: 'meal_allowance', name: 'Meal Allowance', icon: '🍽️' },
    { id: 'transportation_benefit', name: 'Transportation Benefit', icon: '🚗' },
    { id: 'education_assistance', name: 'Education Assistance', icon: '📚' },
    { id: 'gym_membership', name: 'Gym Membership', icon: '💪' }
  ];

  const toggleBenefit = (benefitId) => {
    setSelectedBenefits(prev => 
      prev.includes(benefitId)
        ? prev.filter(id => id !== benefitId)
        : [...prev, benefitId]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement benefits update
    console.log('Selected benefits:', selectedBenefits);
  };

  return (
    <Card>
      <Card.Header>
        <h4>Employee Benefits</h4>
      </Card.Header>
      <Card.Body>
        <p className="text-muted mb-4">
          Select the benefits your restaurant offers to employees. This information will be displayed 
          to job seekers and help attract top talent.
        </p>

        <Form onSubmit={handleSubmit}>
          <div className="benefits-grid mb-4">
            {availableBenefits.map(benefit => (
              <div
                key={benefit.id}
                className={`benefit-item ${selectedBenefits.includes(benefit.id) ? 'selected' : ''}`}
                onClick={() => toggleBenefit(benefit.id)}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <div>{benefit.name}</div>
              </div>
            ))}
          </div>

          <div className="d-flex gap-2">
            <Button type="submit" className="btn-primary">
              Save Benefits
            </Button>
            <Button variant="outline-secondary">
              Add Custom Benefit
            </Button>
          </div>
        </Form>

        {selectedBenefits.length > 0 && (
          <div className="mt-4">
            <h6>Selected Benefits:</h6>
            <div className="d-flex flex-wrap gap-2">
              {selectedBenefits.map(benefitId => {
                const benefit = availableBenefits.find(b => b.id === benefitId);
                return (
                  <span key={benefitId} className="badge bg-success">
                    {benefit.icon} {benefit.name}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default BusinessBenefits; 