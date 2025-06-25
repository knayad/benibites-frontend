# BeniBites - Restaurant Finder with Employee Benefits Focus

A modern React application that helps users find restaurants based on both food quality and employee benefits. Built with a focus on supporting businesses that treat their employees well.

## 🌟 Features

### For Customers
- **Advanced Search**: Find restaurants by cuisine, location, and employee benefits
- **Benefit Filtering**: Filter by specific benefits like health insurance, paid time off, flexible hours
- **Restaurant Reviews**: Read and write reviews focusing on both food quality and employee treatment
- **Employee Verification**: See reviews from verified employees for authentic insights
- **Modern UI**: Beautiful, responsive design inspired by Serpin Studio

### For Business Owners
- **Business Dashboard**: Manage restaurant profiles and employee benefits
- **Review Management**: Respond to reviews and track customer feedback
- **Employee Verification**: Verify employee status to enable employee-specific reviews
- **Analytics**: Track restaurant performance and employee satisfaction metrics

### For Employees
- **Employee Reviews**: Write reviews about work environment and management (verified employees only)
- **Benefit Ratings**: Rate specific benefits like health insurance, training programs
- **Anonymous Reviews**: Option to submit anonymous reviews for sensitive feedback

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **Redux Toolkit** for state management
- **React Router** for navigation
- **React Bootstrap** for UI components
- **Axios** for API communication
- **CSS3** with custom variables and modern styling

### Backend Integration
- **Node.js/Express** REST API
- **MongoDB** with Mongoose ODM
- **JWT Authentication** with role-based access
- **Comprehensive API** with endpoints for:
  - Restaurant management
  - Review system
  - User authentication and verification
  - Business attributes and reporting
  - Payment processing

## 🎨 Design Features

### Serpin Studio Inspired
- **Modern, Moody Aesthetic**: Dark theme with orange accents
- **Glass Morphism**: Translucent cards with backdrop blur effects
- **Smooth Animations**: Fade-in animations and hover effects
- **Gradient Backgrounds**: Subtle gradients for depth and visual interest
- **Typography**: Clean, modern font hierarchy

### Enhanced UX
- **Responsive Design**: Works perfectly on all device sizes
- **Loading States**: Smooth loading indicators and skeleton screens
- **Error Handling**: User-friendly error messages and recovery
- **Accessibility**: WCAG compliant with proper contrast ratios
- **Performance**: Optimized for fast loading and smooth interactions

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn
- MongoDB (local or cloud)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd benibites-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Start the backend server**
   ```bash
   cd bestRest
   npm install
   npm run dev
   ```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
benibites-frontend/
├── src/
│   ├── components/
│   │   ├── auth/           # Authentication components
│   │   ├── dashboard/      # Dashboard components
│   │   ├── layout/         # Layout components (Navbar, Footer)
│   │   └── pages/          # Page components
│   ├── store/
│   │   ├── slices/         # Redux slices
│   │   └── store.js        # Redux store configuration
│   ├── services/           # API services
│   └── assets/             # Static assets
├── bestRest/               # Backend API
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── middleware/         # Express middleware
│   ├── services/           # Business logic
│   └── config/             # Configuration files
└── public/                 # Public assets
```

## 🔧 API Integration

### Authentication
- JWT-based authentication with role-based access control
- Support for multiple user roles: customer, employee, business, admin
- Secure password hashing and session management

### Restaurant Management
- CRUD operations for restaurant profiles
- Employee benefits tracking and rating
- Business verification and claiming system
- Advanced search and filtering capabilities

### Review System
- Multi-faceted reviews (food quality, benefits, work environment)
- Employee verification for authentic workplace reviews
- Helpful/not helpful voting system
- Review reporting and moderation

### User Verification
- Identity verification for enhanced trust
- Employment verification for employee-specific features
- Business verification for restaurant owners
- Document upload and verification workflow

## 🎯 Key Features Implementation

### Employee Benefits Focus
- **Comprehensive Benefits Tracking**: Health, dental, vision insurance, PTO, sick leave, flexible hours, discounts, training, career growth
- **Benefit Ratings**: Employees can rate specific benefits
- **Verified Employee Reviews**: Authentic workplace insights from verified employees
- **Business Transparency**: Clear display of employee benefits to customers

### Modern UI/UX
- **Serpin Studio Design Language**: Modern, moody aesthetic with glass morphism
- **Responsive Grid System**: Adaptive layouts for all screen sizes
- **Smooth Animations**: CSS animations and transitions for enhanced user experience
- **Accessibility**: WCAG compliant with proper contrast and keyboard navigation

### Advanced Search
- **Multi-criteria Filtering**: Search by cuisine, location, benefits, ratings
- **Real-time Results**: Instant search results with loading states
- **URL State Management**: Search parameters preserved in URL for sharing
- **Smart Sorting**: Sort by rating, name, review count, distance

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Role-based Access Control**: Different permissions for different user types
- **Input Validation**: Comprehensive validation on both frontend and backend
- **Rate Limiting**: API rate limiting to prevent abuse
- **CORS Configuration**: Proper cross-origin resource sharing setup
- **Password Security**: Bcrypt hashing with salt rounds

## 🚀 Deployment

### Frontend Deployment
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

### Backend Deployment
```bash
cd bestRest
npm start
```

The backend can be deployed to any Node.js hosting platform.

## 🔮 Future Enhancements

- [ ] **Real-time Notifications**: WebSocket integration for live updates
- [ ] **Mobile App**: React Native version for mobile users
- [ ] **Advanced Analytics**: Detailed business insights and reporting
- [ ] **Social Features**: User profiles, following, and social sharing
- [ ] **Payment Integration**: Direct payment processing for premium features
- [ ] **AI Recommendations**: Machine learning-based restaurant recommendations
- [ ] **Multi-language Support**: Internationalization for global users
- [ ] **Advanced Search**: Geolocation-based search and distance calculations

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Serpin Studio** for design inspiration
- **React Bootstrap** for UI components
- **Redux Toolkit** for state management
- **Vite** for fast development experience

---

**BeniBites** - Supporting restaurants that care about their employees, one review at a time. 🍽️✨
