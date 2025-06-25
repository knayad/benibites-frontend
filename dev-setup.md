# Development Setup Guide

## Quick Start

1. **Frontend Development Server**
   ```bash
   npm run dev
   ```
   Frontend will be available at: http://localhost:5173

2. **Backend Development Server**
   ```bash
   cd bestRest
   npm run dev
   ```
   Backend API will be available at: http://localhost:5000

## Environment Variables

Create a `.env` file in the root directory:
```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=BeniBites
```

## Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd bestRest
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `bestRest` directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/bestrest
   JWT_SECRET=your-secret-key-here
   NODE_ENV=development
   PORT=5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

## Features Implemented

### ✅ Frontend
- Modern React app with Vite
- Redux Toolkit for state management
- React Router for navigation
- React Bootstrap for UI components
- Serpin Studio inspired design
- Responsive layout
- Authentication system
- Restaurant search and filtering
- Review system
- User and business dashboards

### ✅ Backend Integration
- Complete API structure
- Restaurant management endpoints
- Review system endpoints
- User authentication and verification
- Business attributes and reporting
- Payment processing endpoints
- Comprehensive data models

### ✅ Design Features
- Dark, moody theme with orange accents
- Glass morphism effects
- Smooth animations and transitions
- Responsive design
- Enhanced card styling with proper contrast
- Modern typography and spacing

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `POST /api/auth/logout` - User logout

### Restaurants
- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/search` - Search restaurants
- `GET /api/restaurants/:id` - Get restaurant details
- `POST /api/restaurants` - Create restaurant
- `PUT /api/restaurants/:id` - Update restaurant
- `DELETE /api/restaurants/:id` - Delete restaurant

### Reviews
- `GET /api/reviews/business/:id` - Get restaurant reviews
- `POST /api/reviews` - Create review
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

## Development Tips

1. **Hot Reload**: Both frontend and backend support hot reloading
2. **API Testing**: Use the Swagger UI at http://localhost:5000/api-docs
3. **Database**: MongoDB should be running locally or use MongoDB Atlas
4. **CORS**: Backend is configured to allow requests from frontend
5. **Authentication**: JWT tokens are automatically handled by the frontend

## Troubleshooting

### Common Issues

1. **CORS Errors**: Make sure backend is running on port 5000
2. **MongoDB Connection**: Ensure MongoDB is running and accessible
3. **Port Conflicts**: Check if ports 5173 (frontend) and 5000 (backend) are available
4. **Environment Variables**: Ensure `.env` files are properly configured

### Debug Mode

To enable debug logging in the backend, set:
```env
NODE_ENV=development
DEBUG=*
```

## Next Steps

1. Set up MongoDB database
2. Configure environment variables
3. Test API endpoints
4. Add sample data
5. Test frontend-backend integration 