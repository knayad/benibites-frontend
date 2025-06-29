# Backend Integration Plan: Business Claiming Process

## Overview
Based on the [Yelp Business Claiming Process](https://biz.yelp.com/support-center/Yelp_Business_Page/Getting_Started/How-do-I-claim-a-business-page/en-US), we need to implement a comprehensive business claiming system that verifies ownership and prevents fraudulent claims.

## Database Schema

### Business Claims Table
```sql
CREATE TABLE business_claims (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id UUID REFERENCES restaurants(id),
  claimant_user_id UUID REFERENCES users(id),
  business_name VARCHAR(255) NOT NULL,
  business_phone VARCHAR(20) NOT NULL,
  business_email VARCHAR(255),
  business_address TEXT NOT NULL,
  business_city VARCHAR(100) NOT NULL,
  business_state VARCHAR(50) NOT NULL,
  business_zip VARCHAR(20) NOT NULL,
  business_website VARCHAR(255),
  owner_name VARCHAR(255) NOT NULL,
  owner_phone VARCHAR(20) NOT NULL,
  owner_email VARCHAR(255) NOT NULL,
  verification_method ENUM('phone', 'email', 'mail') NOT NULL,
  verification_code VARCHAR(10),
  verification_code_expires_at TIMESTAMP,
  verification_attempts INTEGER DEFAULT 0,
  status ENUM('pending', 'verified', 'rejected', 'expired') DEFAULT 'pending',
  admin_notes TEXT,
  admin_reviewed_by UUID REFERENCES users(id),
  admin_reviewed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Restaurant Updates
```sql
ALTER TABLE restaurants ADD COLUMN is_claimed BOOLEAN DEFAULT FALSE;
ALTER TABLE restaurants ADD COLUMN claimed_by UUID REFERENCES users(id);
ALTER TABLE restaurants ADD COLUMN claimed_at TIMESTAMP;
ALTER TABLE restaurants ADD COLUMN business_owner_id UUID REFERENCES users(id);
```

## API Endpoints

### 1. Submit Business Claim
```http
POST /api/business-claims
Content-Type: application/json
Authorization: Bearer <token>

{
  "restaurant_id": "uuid",
  "business_name": "Restaurant Name",
  "business_phone": "+1234567890",
  "business_email": "contact@restaurant.com",
  "business_address": "123 Main St",
  "business_city": "New York",
  "business_state": "NY",
  "business_zip": "10001",
  "business_website": "https://restaurant.com",
  "owner_name": "John Doe",
  "owner_phone": "+1234567890",
  "owner_email": "owner@restaurant.com",
  "verification_method": "phone"
}
```

**Response:**
```json
{
  "success": true,
  "claim_id": "uuid",
  "message": "Claim submitted successfully. Verification code sent.",
  "verification_required": true
}
```

### 2. Verify Claim Code
```http
POST /api/business-claims/{claim_id}/verify
Content-Type: application/json
Authorization: Bearer <token>

{
  "verification_code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Verification successful. Claim submitted for admin review.",
  "status": "pending"
}
```

### 3. Get Claim Status
```http
GET /api/business-claims/{claim_id}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "claim": {
    "id": "uuid",
    "restaurant_id": "uuid",
    "status": "pending",
    "business_name": "Restaurant Name",
    "verification_method": "phone",
    "created_at": "2024-01-01T00:00:00Z",
    "admin_notes": null
  }
}
```

### 4. Admin: Review Claims
```http
GET /api/admin/business-claims
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "claims": [
    {
      "id": "uuid",
      "restaurant_name": "Restaurant Name",
      "claimant_name": "John Doe",
      "claimant_email": "owner@restaurant.com",
      "status": "pending",
      "verification_method": "phone",
      "created_at": "2024-01-01T00:00:00Z",
      "business_details": { ... }
    }
  ]
}
```

### 5. Admin: Approve/Reject Claim
```http
PUT /api/admin/business-claims/{claim_id}
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "action": "approve", // or "reject"
  "notes": "Verification successful via phone call"
}
```

## Backend Implementation Steps

### 1. Claim Submission Process
```javascript
// 1. Validate claim data
// 2. Check if restaurant already claimed
// 3. Check if user already has pending claim
// 4. Generate verification code
// 5. Send verification via chosen method
// 6. Store claim in database
// 7. Send confirmation email
```

### 2. Verification Process
```javascript
// 1. Validate verification code
// 2. Check code expiration
// 3. Update claim status to verified
// 4. Send notification to admin
// 5. Send confirmation to claimant
```

### 3. Admin Review Process
```javascript
// 1. Manual verification of business details
// 2. Contact business if needed
// 3. Approve or reject claim
// 4. If approved:
//    - Update restaurant.is_claimed = true
//    - Update restaurant.claimed_by = user_id
//    - Grant business dashboard access
//    - Send approval email
// 5. If rejected:
//    - Send rejection email with reason
//    - Allow resubmission after 30 days
```

### 4. Security Measures
```javascript
// 1. Rate limiting on claim submissions
// 2. Verification code expiration (15 minutes)
// 3. Maximum verification attempts (3)
// 4. IP address tracking
// 5. Duplicate claim prevention
// 6. Business phone/email validation
```

## Email Templates

### 1. Claim Confirmation
```
Subject: Your Business Claim Request - [Restaurant Name]

Hi [Owner Name],

We've received your claim request for [Restaurant Name]. 

Verification Method: [Phone/Email/Mail]
Next Steps: [Verification instructions]

Your claim ID: [UUID]

We'll contact you within 2-3 business days to complete verification.

Best regards,
BeniBites Team
```

### 2. Verification Code
```
Subject: Your Verification Code - [Restaurant Name]

Hi [Owner Name],

Your verification code is: [CODE]

This code expires in 15 minutes.

If you didn't request this code, please ignore this email.

Best regards,
BeniBites Team
```

### 3. Claim Approval
```
Subject: Congratulations! Your Business Claim is Approved

Hi [Owner Name],

Great news! Your claim for [Restaurant Name] has been approved.

You now have access to:
- Business dashboard
- Review management
- Business profile editing
- Analytics and insights

Login to your dashboard: [URL]

Best regards,
BeniBites Team
```

### 4. Claim Rejection
```
Subject: Business Claim Update - [Restaurant Name]

Hi [Owner Name],

We've reviewed your claim for [Restaurant Name] and unfortunately cannot approve it at this time.

Reason: [Admin notes]

You may resubmit your claim after 30 days.

Best regards,
BeniBites Team
```

## Integration with Frontend

### 1. Claim Status Tracking
- Real-time status updates
- Email notifications
- Dashboard integration

### 2. Business Dashboard Access
- Conditional rendering based on claim status
- Business-specific features
- Admin panel for claimed businesses

### 3. Verification Flow
- Multi-step form with validation
- Real-time verification code input
- Progress tracking

## Monitoring & Analytics

### 1. Claim Metrics
- Total claims submitted
- Verification success rate
- Average processing time
- Rejection reasons

### 2. Fraud Prevention
- Suspicious activity detection
- IP address analysis
- Multiple claim attempts tracking

### 3. Admin Dashboard
- Claim queue management
- Processing time tracking
- Quality metrics

## Future Enhancements

### 1. Automated Verification
- Business license validation
- Domain ownership verification
- Social media verification

### 2. Advanced Security
- Two-factor authentication
- Document upload verification
- Video verification calls

### 3. Integration Features
- Google My Business sync
- Yelp business sync
- Social media integration 