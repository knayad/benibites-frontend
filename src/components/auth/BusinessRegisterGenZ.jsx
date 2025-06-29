import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { registerBusiness } from '../../store/slices/authSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const BusinessRegisterGenZ = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
      width: '100vw',
      background: genzGradients.hero,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: genzFont,
      padding: '2rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Playful stroke accents */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', transform: 'rotate(25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 80, height: 24 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', transform: 'rotate(-15deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 60, height: 18 }} />
      </div>
      <div style={{ position: 'absolute', top: '60%', left: '5%', transform: 'rotate(-10deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 40, height: 12 }} />
      </div>
      
      <div style={{
        background: 'rgba(255,255,255,0.98)',
        borderRadius: 32,
        boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
        padding: '2.5rem 2rem',
        maxWidth: 600,
        width: '100%',
        border: `2px solid ${genzColors.accent1}`,
        position: 'relative',
        zIndex: 2
      }}>
        <h2 style={{
          fontWeight: 900,
          fontSize: '2rem',
          background: genzGradients.button,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '1.2rem',
          textAlign: 'center'
        }}>
          Register Your Restaurant!
        </h2>
        <p style={{
          color: genzColors.primary,
          fontSize: '1rem',
          textAlign: 'center',
          marginBottom: '2rem',
          opacity: 0.8
        }}>
          Join the community and start offering amazing perks to restaurant workers! 🍕✨
        </p>

        {error && (
          <div style={{
            background: 'rgba(255, 107, 107, 0.2)',
            border: `2px solid ${genzColors.accent2}`,
            borderRadius: 16,
            padding: '0.8rem',
            color: genzColors.accent2,
            fontWeight: 600,
            textAlign: 'center',
            marginBottom: '1.5rem'
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <input
              type="text"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              required
              placeholder="Restaurant name"
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                borderRadius: 20,
                border: `2px solid ${genzColors.accent1}`,
                background: 'rgba(255,255,255,0.9)',
                color: genzColors.black,
                fontFamily: genzFont,
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            <input
              type="text"
              name="ownerName"
              value={formData.ownerName}
              onChange={handleChange}
              required
              placeholder="Owner's full name"
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                borderRadius: 20,
                border: `2px solid ${genzColors.accent1}`,
                background: 'rgba(255,255,255,0.9)',
                color: genzColors.black,
                fontFamily: genzFont,
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Business email address"
            style={{
              width: '100%',
              padding: '1rem 1.2rem',
              borderRadius: 20,
              border: `2px solid ${genzColors.accent1}`,
              background: 'rgba(255,255,255,0.9)',
              color: genzColors.black,
              fontFamily: genzFont,
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Phone number"
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                borderRadius: 20,
                border: `2px solid ${genzColors.accent1}`,
                background: 'rgba(255,255,255,0.9)',
                color: genzColors.black,
                fontFamily: genzFont,
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            <input
              type="text"
              name="cuisine"
              value={formData.cuisine}
              onChange={handleChange}
              required
              placeholder="Cuisine type"
              style={{
                width: '100%',
                padding: '1rem 1.2rem',
                borderRadius: 20,
                border: `2px solid ${genzColors.accent1}`,
                background: 'rgba(255,255,255,0.9)',
                color: genzColors.black,
                fontFamily: genzFont,
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
          </div>

          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            placeholder="Restaurant address"
            style={{
              width: '100%',
              padding: '1rem 1.2rem',
              borderRadius: 20,
              border: `2px solid ${genzColors.accent1}`,
              background: 'rgba(255,255,255,0.9)',
              color: genzColors.black,
              fontFamily: genzFont,
              fontSize: '1rem',
              outline: 'none',
              transition: 'all 0.3s ease'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Create password"
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  paddingRight: '3rem',
                  borderRadius: 20,
                  border: `2px solid ${genzColors.accent1}`,
                  background: 'rgba(255,255,255,0.9)',
                  color: genzColors.black,
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
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
                  color: genzColors.accent1,
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>

            <div style={{ position: 'relative' }}>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm password"
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  paddingRight: '3rem',
                  borderRadius: 20,
                  border: `2px solid ${genzColors.accent1}`,
                  background: 'rgba(255,255,255,0.9)',
                  color: genzColors.black,
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
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
                  color: genzColors.accent1,
                  cursor: 'pointer',
                  fontSize: '1.2rem'
                }}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
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
              marginTop: '0.5rem',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Creating Business Account... 🔄' : 'Register Business ✨'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1rem' }}>
          <p style={{ color: genzColors.primary, marginBottom: '0.7rem' }}>
            Already have a business account?{' '}
            <Link to="/business-login" style={{ color: genzColors.accent1, fontWeight: 700, textDecoration: 'none' }}>
              Sign in here! 🔑
            </Link>
          </p>
          <p style={{ color: genzColors.primary }}>
            Not a business?{' '}
            <Link to="/register" style={{ color: genzColors.accent2, fontWeight: 700, textDecoration: 'none' }}>
              User Registration →
            </Link>
          </p>
        </div>

        {/* Benefits for Businesses */}
        <div style={{
          marginTop: '2rem',
          padding: '1.5rem',
          background: 'rgba(102, 126, 234, 0.05)',
          borderRadius: 20,
          border: `2px solid ${genzColors.accent1}`
        }}>
          <h4 style={{
            color: genzColors.primary,
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
              color: genzColors.primary,
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
              color: genzColors.primary,
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
              color: genzColors.primary,
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
              color: genzColors.primary,
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