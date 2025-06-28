import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerBusiness } from '../../store/slices/authSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const BusinessRegisterGenZ = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    cuisine: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    const result = await dispatch(registerBusiness(formData));
    if (registerBusiness.fulfilled.match(result)) {
      navigate('/business-dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: genzGradients.hero,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
      fontFamily: genzFont,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Playful stroke accents */}
      <div style={{ position: 'absolute', top: '8%', left: '8%', transform: 'rotate(15deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 60, height: 18 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '12%', right: '10%', transform: 'rotate(-25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 80, height: 24 }} />
      </div>
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: 32,
        padding: '3rem',
        width: '100%',
        maxWidth: 600,
        border: '2px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h1 style={{
            fontWeight: 900,
            fontSize: '2.5rem',
            letterSpacing: '-2px',
            background: genzGradients.button,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem'
          }}>
            Register Your Restaurant! 🏪
          </h1>
          <p style={{
            color: '#fff',
            fontSize: '1.1rem',
            fontWeight: 500,
            opacity: 0.9
          }}>
            Join the community and start offering amazing perks to restaurant workers! 🍕✨
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div style={{
            background: 'rgba(255, 107, 107, 0.2)',
            border: '2px solid #ff6b6b',
            borderRadius: 16,
            padding: '1rem',
            marginBottom: '1.5rem',
            color: '#fff',
            fontWeight: 600
          }}>
            {error}
          </div>
        )}

        {/* Business Register Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                Business Name
              </label>
              <input
                type="text"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 20,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Restaurant name"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                Owner Name
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 20,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="Owner's full name"
              />
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              color: '#fff',
              fontWeight: 700,
              marginBottom: '0.5rem',
              fontSize: '1rem'
            }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontFamily: genzFont,
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              placeholder="business.email@example.com"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 20,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                Cuisine Type
              </label>
              <select
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                required
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 20,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                <option value="">Select cuisine type</option>
                <option value="italian">Italian 🍝</option>
                <option value="mexican">Mexican 🌮</option>
                <option value="chinese">Chinese 🥢</option>
                <option value="japanese">Japanese 🍣</option>
                <option value="indian">Indian 🍛</option>
                <option value="american">American 🍔</option>
                <option value="mediterranean">Mediterranean 🥙</option>
                <option value="thai">Thai 🍜</option>
                <option value="other">Other 🍽️</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{
              display: 'block',
              color: '#fff',
              fontWeight: 700,
              marginBottom: '0.5rem',
              fontSize: '1rem'
            }}>
              Restaurant Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                borderRadius: 20,
                border: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontFamily: genzFont,
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              placeholder="123 Restaurant St, City, State 12345"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem 1.2rem',
                    paddingRight: '3rem',
                    borderRadius: 20,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontFamily: genzFont,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Create a strong password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                Confirm Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '1rem 1.2rem',
                    paddingRight: '3rem',
                    borderRadius: 20,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                    fontFamily: genzFont,
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease'
                  }}
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  style={{
                    position: 'absolute',
                    right: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#fff',
                    cursor: 'pointer',
                    fontSize: '1.2rem'
                  }}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              background: genzGradients.button,
              color: genzColors.black,
              border: 'none',
              borderRadius: 20,
              padding: '1rem 2rem',
              fontFamily: genzFont,
              fontWeight: 800,
              fontSize: '1.1rem',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'all 0.3s ease',
              marginTop: '1rem',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Creating Business Account... 🔄' : 'Register Business ✨'}
          </button>
        </form>

        {/* Links */}
        <div style={{
          textAlign: 'center',
          marginTop: '2rem',
          paddingTop: '2rem',
          borderTop: '2px solid rgba(255, 255, 255, 0.2)'
        }}>
          <p style={{
            color: '#fff',
            fontSize: '1rem',
            marginBottom: '1rem',
            opacity: 0.9
          }}>
            Already have a business account?{' '}
            <Link to="/business-login" style={{
              color: genzColors.accent1,
              fontWeight: 700,
              textDecoration: 'none'
            }}>
              Sign in here! 🔑
            </Link>
          </p>
        </div>

        {/* Benefits for Businesses */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(254, 202, 87, 0.1)',
          borderRadius: 20,
          border: '2px solid rgba(254, 202, 87, 0.3)'
        }}>
          <h4 style={{
            color: genzColors.accent1,
            fontWeight: 800,
            fontSize: '1.1rem',
            marginBottom: '1rem',
            textAlign: 'center'
          }}>
            Why register your business? 🚀
          </h4>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              <span style={{ fontSize: '1.2rem' }}>👥</span>
              Attract top talent
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              <span style={{ fontSize: '1.2rem' }}>⭐</span>
              Build your reputation
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              <span style={{ fontSize: '1.2rem' }}>📊</span>
              Track employee satisfaction
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              color: '#fff',
              fontSize: '0.9rem',
              fontWeight: 600
            }}>
              <span style={{ fontSize: '1.2rem' }}>🎯</span>
              Stand out from competitors
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessRegisterGenZ; 