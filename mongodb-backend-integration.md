# MongoDB Backend Integration: Business Claiming Process

## Overview
This document outlines the complete MongoDB backend implementation for the business claiming process, based on the [Yelp Business Claiming Process](https://biz.yelp.com/support-center/Yelp_Business_Page/Getting_Started/How-do-I-claim-a-business-page/en-US) and adapted for our Gen Z restaurant platform.

## Database Schema (MongoDB)

### 1. Business Claims Collection
```javascript
// Collection: business_claims
{
  _id: ObjectId,
  restaurantId: ObjectId, // Reference to restaurants collection
  claimantUserId: ObjectId, // Reference to users collection
  businessName: String,
  businessPhone: String,
  businessEmail: String,
  businessAddress: String,
  businessCity: String,
  businessState: String,
  businessZip: String,
  businessWebsite: String,
  ownerName: String,
  ownerPhone: String,
  ownerEmail: String,
  verificationMethod: {
    type: String,
    enum: ['phone', 'email', 'mail'],
    required: true
  },
  verificationCode: String,
  verificationCodeExpiresAt: Date,
  verificationAttempts: {
    type: Number,
    default: 0,
    max: 3
  },
  status: {
    type: String,
    enum: ['pending', 'verified', 'rejected', 'expired'],
    default: 'pending'
  },
  adminNotes: String,
  adminReviewedBy: ObjectId, // Reference to users collection
  adminReviewedAt: Date,
  ipAddress: String,
  userAgent: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}
```

### 2. Updated Restaurants Collection
```javascript
// Collection: restaurants
{
  _id: ObjectId,
  name: String,
  cuisine: String,
  location: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  phone: String,
  website: String,
  description: String,
  rating: Number,
  reviewCount: Number,
  benefits: [String],
  isHiring: Boolean,
  // NEW FIELDS FOR CLAIMING
  isClaimed: {
    type: Boolean,
    default: false
  },
  claimedBy: ObjectId, // Reference to users collection
  claimedAt: Date,
  businessOwnerId: ObjectId, // Reference to users collection
  claimStatus: {
    type: String,
    enum: ['unclaimed', 'pending', 'claimed'],
    default: 'unclaimed'
  }
}
```

### 3. Updated Users Collection
```javascript
// Collection: users
{
  _id: ObjectId,
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  phone: String,
  userType: {
    type: String,
    enum: ['user', 'employee', 'business', 'admin'],
    default: 'user'
  },
  verificationStatus: {
    type: String,
    enum: ['unverified', 'pending', 'verified_employee', 'verified_business'],
    default: 'unverified'
  },
  // NEW FIELDS FOR BUSINESS OWNERS
  ownedBusinesses: [ObjectId], // Array of restaurant IDs
  pendingClaims: [ObjectId], // Array of claim IDs
  claimHistory: [{
    claimId: ObjectId,
    restaurantId: ObjectId,
    status: String,
    submittedAt: Date
  }],
  createdAt: Date,
  updatedAt: Date
}
```

### 4. Verification Codes Collection (Optional - for better security)
```javascript
// Collection: verification_codes
{
  _id: ObjectId,
  claimId: ObjectId,
  code: String,
  expiresAt: Date,
  attempts: {
    type: Number,
    default: 0
  },
  isUsed: {
    type: Boolean,
    default: false
  },
  createdAt: Date
}
```

## API Endpoints

### 1. Business Claims API

#### Submit Business Claim
```http
POST /api/business-claims
Content-Type: application/json
Authorization: Bearer <token>

{
  "restaurantId": "507f1f77bcf86cd799439011",
  "businessName": "Restaurant Name",
  "businessPhone": "+1234567890",
  "businessEmail": "contact@restaurant.com",
  "businessAddress": "123 Main St",
  "businessCity": "New York",
  "businessState": "NY",
  "businessZip": "10001",
  "businessWebsite": "https://restaurant.com",
  "ownerName": "John Doe",
  "ownerPhone": "+1234567890",
  "ownerEmail": "owner@restaurant.com",
  "verificationMethod": "phone"
}
```

**Response:**
```json
{
  "success": true,
  "claimId": "507f1f77bcf86cd799439012",
  "message": "Claim submitted successfully. Verification code sent.",
  "verificationRequired": true,
  "verificationMethod": "phone"
}
```

#### Verify Claim Code
```http
POST /api/business-claims/{claimId}/verify
Content-Type: application/json
Authorization: Bearer <token>

{
  "verificationCode": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Verification successful. Claim submitted for admin review.",
  "status": "pending",
  "nextSteps": "Admin will review your claim within 2-3 business days"
}
```

#### Get Claim Status
```http
GET /api/business-claims/{claimId}
Authorization: Bearer <token>
```

**Response:**
```json
{
  "claim": {
    "id": "507f1f77bcf86cd799439012",
    "restaurantId": "507f1f77bcf86cd799439011",
    "restaurantName": "Restaurant Name",
    "status": "pending",
    "businessName": "Restaurant Name",
    "verificationMethod": "phone",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "adminNotes": null,
    "estimatedReviewTime": "2-3 business days"
  }
}
```

#### Get User's Claims
```http
GET /api/business-claims/user/me
Authorization: Bearer <token>
```

**Response:**
```json
{
  "claims": [
    {
      "id": "507f1f77bcf86cd799439012",
      "restaurantName": "Restaurant Name",
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "verificationMethod": "phone"
    }
  ]
}
```

### 2. Admin API

#### Get All Claims (Admin)
```http
GET /api/admin/business-claims?status=pending&page=1&limit=10
Authorization: Bearer <admin_token>
```

**Response:**
```json
{
  "claims": [
    {
      "id": "507f1f77bcf86cd799439012",
      "restaurantName": "Restaurant Name",
      "claimantName": "John Doe",
      "claimantEmail": "owner@restaurant.com",
      "status": "pending",
      "verificationMethod": "phone",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "businessDetails": {
        "businessPhone": "+1234567890",
        "businessAddress": "123 Main St",
        "businessCity": "New York"
      },
      "verificationStatus": "verified"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 25,
    "pages": 3
  }
}
```

#### Approve/Reject Claim (Admin)
```http
PUT /api/admin/business-claims/{claimId}
Content-Type: application/json
Authorization: Bearer <admin_token>

{
  "action": "approve", // or "reject"
  "notes": "Verification successful via phone call",
  "adminNotes": "Business owner confirmed ownership"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Claim approved successfully",
  "restaurantId": "507f1f77bcf86cd799439011",
  "businessOwnerId": "507f1f77bcf86cd799439013"
}
```

### 3. Restaurant API Updates

#### Get Restaurant with Claim Status
```http
GET /api/restaurants/{restaurantId}
```

**Response:**
```json
{
  "restaurant": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Restaurant Name",
    "cuisine": "italian",
    "location": "New York",
    "rating": 4.5,
    "reviewCount": 150,
    "isClaimed": false,
    "claimStatus": "unclaimed",
    "benefits": ["health_insurance", "flexible_hours"],
    "isHiring": true
  }
}
```

## Backend Implementation (Node.js/Express)

### 1. Business Claims Service
```javascript
// services/businessClaimService.js
const BusinessClaim = require('../models/BusinessClaim');
const Restaurant = require('../models/Restaurant');
const User = require('../models/User');
const VerificationCode = require('../models/VerificationCode');
const { sendEmail, sendSMS } = require('../utils/notifications');
const { rateLimit } = require('../utils/security');

class BusinessClaimService {
  // Submit new claim
  async submitClaim(claimData, userId, ipAddress, userAgent) {
    // Rate limiting
    await rateLimit.checkRateLimit(`claim_${userId}`, 5, 3600); // 5 claims per hour
    
    // Validate restaurant exists and is unclaimed
    const restaurant = await Restaurant.findById(claimData.restaurantId);
    if (!restaurant) {
      throw new Error('Restaurant not found');
    }
    if (restaurant.isClaimed) {
      throw new Error('Restaurant is already claimed');
    }
    
    // Check for existing pending claims
    const existingClaim = await BusinessClaim.findOne({
      restaurantId: claimData.restaurantId,
      status: { $in: ['pending', 'verified'] }
    });
    if (existingClaim) {
      throw new Error('Restaurant already has a pending claim');
    }
    
    // Generate verification code
    const verificationCode = this.generateVerificationCode();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes
    
    // Create claim
    const claim = new BusinessClaim({
      ...claimData,
      claimantUserId: userId,
      verificationCode,
      verificationCodeExpiresAt: expiresAt,
      ipAddress,
      userAgent
    });
    
    await claim.save();
    
    // Send verification code
    await this.sendVerificationCode(claim, verificationCode);
    
    // Update user's claim history
    await User.findByIdAndUpdate(userId, {
      $push: {
        pendingClaims: claim._id,
        claimHistory: {
          claimId: claim._id,
          restaurantId: claim.restaurantId,
          status: 'pending',
          submittedAt: new Date()
        }
      }
    });
    
    return claim;
  }
  
  // Verify claim code
  async verifyClaim(claimId, verificationCode, userId) {
    const claim = await BusinessClaim.findById(claimId);
    if (!claim) {
      throw new Error('Claim not found');
    }
    
    if (claim.claimantUserId.toString() !== userId) {
      throw new Error('Unauthorized');
    }
    
    if (claim.status !== 'pending') {
      throw new Error('Claim is not pending verification');
    }
    
    if (claim.verificationAttempts >= 3) {
      throw new Error('Maximum verification attempts exceeded');
    }
    
    if (new Date() > claim.verificationCodeExpiresAt) {
      throw new Error('Verification code has expired');
    }
    
    if (claim.verificationCode !== verificationCode) {
      // Increment attempts
      claim.verificationAttempts += 1;
      await claim.save();
      throw new Error('Invalid verification code');
    }
    
    // Mark as verified
    claim.status = 'verified';
    claim.verificationAttempts = 0;
    await claim.save();
    
    // Send notification to admin
    await this.notifyAdminOfVerifiedClaim(claim);
    
    return claim;
  }
  
  // Admin: Approve claim
  async approveClaim(claimId, adminId, notes) {
    const claim = await BusinessClaim.findById(claimId);
    if (!claim) {
      throw new Error('Claim not found');
    }
    
    if (claim.status !== 'verified') {
      throw new Error('Claim must be verified before approval');
    }
    
    // Update claim status
    claim.status = 'approved';
    claim.adminReviewedBy = adminId;
    claim.adminReviewedAt = new Date();
    claim.adminNotes = notes;
    await claim.save();
    
    // Update restaurant
    await Restaurant.findByIdAndUpdate(claim.restaurantId, {
      isClaimed: true,
      claimedBy: claim.claimantUserId,
      claimedAt: new Date(),
      businessOwnerId: claim.claimantUserId,
      claimStatus: 'claimed'
    });
    
    // Update user
    await User.findByIdAndUpdate(claim.claimantUserId, {
      userType: 'business',
      verificationStatus: 'verified_business',
      $push: { ownedBusinesses: claim.restaurantId },
      $pull: { pendingClaims: claim._id }
    });
    
    // Send approval email
    await this.sendApprovalEmail(claim);
    
    return claim;
  }
  
  // Admin: Reject claim
  async rejectClaim(claimId, adminId, notes) {
    const claim = await BusinessClaim.findById(claimId);
    if (!claim) {
      throw new Error('Claim not found');
    }
    
    claim.status = 'rejected';
    claim.adminReviewedBy = adminId;
    claim.adminReviewedAt = new Date();
    claim.adminNotes = notes;
    await claim.save();
    
    // Update user's claim history
    await User.findByIdAndUpdate(claim.claimantUserId, {
      $pull: { pendingClaims: claim._id },
      $set: {
        'claimHistory.$[elem].status': 'rejected'
      }
    }, {
      arrayFilters: [{ 'elem.claimId': claim._id }]
    });
    
    // Send rejection email
    await this.sendRejectionEmail(claim, notes);
    
    return claim;
  }
  
  // Helper methods
  generateVerificationCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
  
  async sendVerificationCode(claim, code) {
    const user = await User.findById(claim.claimantUserId);
    
    switch (claim.verificationMethod) {
      case 'email':
        await sendEmail({
          to: claim.ownerEmail,
          subject: `Your Verification Code - ${claim.businessName}`,
          template: 'verification-code',
          data: { code, businessName: claim.businessName }
        });
        break;
      case 'phone':
        await sendSMS({
          to: claim.ownerPhone,
          message: `Your BeniBites verification code is: ${code}. Expires in 15 minutes.`
        });
        break;
      case 'mail':
        // Queue mail verification (postcard)
        await this.queueMailVerification(claim);
        break;
    }
  }
  
  async sendApprovalEmail(claim) {
    await sendEmail({
      to: claim.ownerEmail,
      subject: `Congratulations! Your Business Claim is Approved`,
      template: 'claim-approved',
      data: { businessName: claim.businessName }
    });
  }
  
  async sendRejectionEmail(claim, notes) {
    await sendEmail({
      to: claim.ownerEmail,
      subject: `Business Claim Update - ${claim.businessName}`,
      template: 'claim-rejected',
      data: { businessName: claim.businessName, notes }
    });
  }
  
  async notifyAdminOfVerifiedClaim(claim) {
    // Send notification to admin dashboard
    // Could be WebSocket, email, or in-app notification
  }
}

module.exports = new BusinessClaimService();
```

### 2. Security Middleware
```javascript
// middleware/security.js
const rateLimit = require('express-rate-limit');
const { RateLimiterMongo } = require('rate-limiter-flexible');

// Rate limiting for claim submissions
const claimRateLimit = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // 5 claims per hour
  message: 'Too many claim submissions, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// Rate limiting for verification attempts
const verificationRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // 3 attempts per 15 minutes
  message: 'Too many verification attempts, please try again later',
  standardHeaders: true,
  legacyHeaders: false,
});

// IP tracking middleware
const trackIP = (req, res, next) => {
  req.ipAddress = req.ip || req.connection.remoteAddress;
  req.userAgent = req.get('User-Agent');
  next();
};

module.exports = {
  claimRateLimit,
  verificationRateLimit,
  trackIP
};
```

### 3. API Routes
```javascript
// routes/businessClaims.js
const express = require('express');
const router = express.Router();
const businessClaimService = require('../services/businessClaimService');
const { authenticate, requireAdmin } = require('../middleware/auth');
const { claimRateLimit, verificationRateLimit, trackIP } = require('../middleware/security');

// Submit claim
router.post('/', 
  authenticate, 
  trackIP, 
  claimRateLimit, 
  async (req, res) => {
    try {
      const claim = await businessClaimService.submitClaim(
        req.body, 
        req.user.id, 
        req.ipAddress, 
        req.userAgent
      );
      res.json({
        success: true,
        claimId: claim._id,
        message: 'Claim submitted successfully. Verification code sent.',
        verificationRequired: true,
        verificationMethod: claim.verificationMethod
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Verify claim
router.post('/:claimId/verify',
  authenticate,
  verificationRateLimit,
  async (req, res) => {
    try {
      const claim = await businessClaimService.verifyClaim(
        req.params.claimId,
        req.body.verificationCode,
        req.user.id
      );
      res.json({
        success: true,
        message: 'Verification successful. Claim submitted for admin review.',
        status: claim.status
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get claim status
router.get('/:claimId',
  authenticate,
  async (req, res) => {
    try {
      const claim = await businessClaimService.getClaimStatus(
        req.params.claimId,
        req.user.id
      );
      res.json({ claim });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Get user's claims
router.get('/user/me',
  authenticate,
  async (req, res) => {
    try {
      const claims = await businessClaimService.getUserClaims(req.user.id);
      res.json({ claims });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
```

### 4. Admin Routes
```javascript
// routes/admin/businessClaims.js
const express = require('express');
const router = express.Router();
const businessClaimService = require('../../services/businessClaimService');
const { authenticate, requireAdmin } = require('../../middleware/auth');

// Get all claims (admin)
router.get('/',
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      const claims = await businessClaimService.getAdminClaims(status, page, limit);
      res.json(claims);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

// Approve/reject claim (admin)
router.put('/:claimId',
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      const { action, notes } = req.body;
      let claim;
      
      if (action === 'approve') {
        claim = await businessClaimService.approveClaim(
          req.params.claimId,
          req.user.id,
          notes
        );
      } else if (action === 'reject') {
        claim = await businessClaimService.rejectClaim(
          req.params.claimId,
          req.user.id,
          notes
        );
      } else {
        throw new Error('Invalid action');
      }
      
      res.json({
        success: true,
        message: `Claim ${action}d successfully`,
        claim
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

module.exports = router;
```

## Business Flow Implementation

### 1. Claim Submission Flow
```javascript
// 1. User clicks "Claim This Business" on unclaimed restaurant
// 2. Frontend navigates to /business-claim/{restaurantId}
// 3. User fills out multi-step form
// 4. Frontend submits claim data to POST /api/business-claims
// 5. Backend validates data and creates claim
// 6. Backend generates verification code and sends via chosen method
// 7. Frontend shows verification step
```

### 2. Verification Flow
```javascript
// 1. User receives verification code (email/SMS/mail)
// 2. User enters code in frontend modal
// 3. Frontend submits to POST /api/business-claims/{id}/verify
// 4. Backend validates code and marks claim as verified
// 5. Backend notifies admin of verified claim
// 6. Frontend shows confirmation and next steps
```

### 3. Admin Review Flow
```javascript
// 1. Admin receives notification of verified claim
// 2. Admin reviews claim details in admin dashboard
// 3. Admin may contact business for additional verification
// 4. Admin approves or rejects claim via PUT /api/admin/business-claims/{id}
// 5. Backend updates restaurant and user records
// 6. Backend sends approval/rejection email to claimant
// 7. If approved, user gains business dashboard access
```

## Security & Verification Measures

### 1. Rate Limiting
- **Claim submissions**: 5 per hour per user
- **Verification attempts**: 3 per 15 minutes per claim
- **Admin actions**: 100 per hour per admin

### 2. Verification Code Security
- **Expiration**: 15 minutes
- **Format**: 6-digit numeric
- **Attempts**: Maximum 3 per code
- **Regeneration**: New code invalidates previous

### 3. Data Validation
```javascript
// Validation schema example
const claimValidation = {
  restaurantId: { type: 'ObjectId', required: true },
  businessName: { type: 'String', required: true, minLength: 2, maxLength: 255 },
  businessPhone: { type: 'String', required: true, pattern: /^\+?[\d\s\-\(\)]+$/ },
  businessEmail: { type: 'String', required: false, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ },
  verificationMethod: { type: 'String', required: true, enum: ['phone', 'email', 'mail'] }
};
```

### 4. Fraud Prevention
- **IP tracking**: Log IP addresses for suspicious activity
- **Duplicate prevention**: One pending claim per restaurant
- **User history**: Track claim history and patterns
- **Business validation**: Verify business details against public records

## Email Templates (Node.js/Handlebars)

### 1. Verification Code Email
```handlebars
<!-- templates/verification-code.hbs -->
<h2>Your Verification Code - {{businessName}}</h2>
<p>Hi {{ownerName}},</p>
<p>Your verification code is: <strong>{{code}}</strong></p>
<p>This code expires in 15 minutes.</p>
<p>If you didn't request this code, please ignore this email.</p>
<p>Best regards,<br>BeniBites Team</p>
```

### 2. Claim Approval Email
```handlebars
<!-- templates/claim-approved.hbs -->
<h2>Congratulations! Your Business Claim is Approved</h2>
<p>Hi {{ownerName}},</p>
<p>Great news! Your claim for {{businessName}} has been approved.</p>
<p>You now have access to:</p>
<ul>
  <li>Business dashboard</li>
  <li>Review management</li>
  <li>Business profile editing</li>
  <li>Analytics and insights</li>
</ul>
<p><a href="{{dashboardUrl}}">Login to your dashboard</a></p>
<p>Best regards,<br>BeniBites Team</p>
```

## Monitoring & Analytics

### 1. Claim Metrics
```javascript
// Analytics service
class ClaimAnalytics {
  async getClaimMetrics() {
    const metrics = await BusinessClaim.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 },
          avgProcessingTime: {
            $avg: {
              $subtract: ['$adminReviewedAt', '$createdAt']
            }
          }
        }
      }
    ]);
    return metrics;
  }
  
  async getVerificationSuccessRate() {
    const stats = await BusinessClaim.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          verified: {
            $sum: { $cond: [{ $eq: ['$status', 'verified'] }, 1, 0] }
          }
        }
      }
    ]);
    return stats[0];
  }
}
```

### 2. Fraud Detection
```javascript
// Fraud detection service
class FraudDetection {
  async detectSuspiciousActivity(userId, ipAddress) {
    const recentClaims = await BusinessClaim.find({
      $or: [
        { claimantUserId: userId },
        { ipAddress: ipAddress }
      ],
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });
    
    if (recentClaims.length > 10) {
      return { suspicious: true, reason: 'Too many claims in 24 hours' };
    }
    
    return { suspicious: false };
  }
}
```

## Testing Strategy

### 1. Unit Tests
```javascript
// tests/businessClaimService.test.js
describe('BusinessClaimService', () => {
  test('should submit claim successfully', async () => {
    const claimData = { /* test data */ };
    const claim = await businessClaimService.submitClaim(claimData, userId);
    expect(claim.status).toBe('pending');
    expect(claim.verificationCode).toBeDefined();
  });
  
  test('should reject duplicate claims', async () => {
    // Test duplicate claim prevention
  });
  
  test('should handle verification code expiration', async () => {
    // Test code expiration logic
  });
});
```

### 2. Integration Tests
```javascript
// tests/api/businessClaims.test.js
describe('Business Claims API', () => {
  test('POST /api/business-claims should create claim', async () => {
    const response = await request(app)
      .post('/api/business-claims')
      .set('Authorization', `Bearer ${token}`)
      .send(claimData);
    
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

## Deployment Considerations

### 1. Environment Variables
```bash
# .env
MONGODB_URI=mongodb://localhost:27017/benibites
JWT_SECRET=your-secret-key
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
TWILIO_ACCOUNT_SID=your-twilio-sid
TWILIO_AUTH_TOKEN=your-twilio-token
REDIS_URL=redis://localhost:6379
```

### 2. Database Indexes
```javascript
// Create indexes for performance
db.business_claims.createIndex({ "restaurantId": 1, "status": 1 });
db.business_claims.createIndex({ "claimantUserId": 1 });
db.business_claims.createIndex({ "status": 1, "createdAt": -1 });
db.restaurants.createIndex({ "isClaimed": 1 });
db.users.createIndex({ "userType": 1, "verificationStatus": 1 });
```

### 3. Caching Strategy
```javascript
// Redis caching for frequently accessed data
const cacheClaimStatus = async (claimId, status) => {
  await redis.setex(`claim:${claimId}:status`, 300, status); // 5 minutes
};

const getCachedClaimStatus = async (claimId) => {
  return await redis.get(`claim:${claimId}:status`);
};
```

This comprehensive MongoDB backend integration provides a robust, scalable, and secure business claiming system that follows industry best practices and maintains the Gen Z aesthetic and user experience of the frontend application.
