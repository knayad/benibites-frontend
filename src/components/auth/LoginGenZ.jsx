import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const LoginGenZ = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
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
    const result = await dispatch(login(formData));
    if (login.fulfilled.match(result)) {
      navigate('/dashboard');
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: genzGradients.hero,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'calc(2rem + 64px) 2rem 2rem 2rem',
      fontFamily: genzFont,
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
      
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: 32,
        padding: '3rem',
        width: '100%',
        maxWidth: 480,
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
            Welcome Back!
          </h1>
          <p style={{
            color: '#fff',
            fontSize: '1.1rem',
            fontWeight: 500,
            opacity: 0.9
          }}>
            Ready to discover amazing restaurant perks? Let's get you back in! 🍕
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

        {/* Login Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
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
              placeholder="your.email@example.com"
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
                placeholder="Enter your password"
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
            {loading ? 'Signing In... 🔄' : 'Sign In ✨'}
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
            Don't have an account?{' '}
            <Link to="/register" style={{
              color: genzColors.accent1,
              fontWeight: 700,
              textDecoration: 'none'
            }}>
              Sign up here! 🚀
            </Link>
          </p>
          <p style={{
            color: '#fff',
            fontSize: '0.9rem',
            opacity: 0.8
          }}>
            <Link to="/forgot-password" style={{
              color: '#fff',
              textDecoration: 'none',
              fontWeight: 600
            }}>
              Forgot your password? 🔑
            </Link>
          </p>
        </div>

        {/* Business Login Link */}
        <div style={{
          textAlign: 'center',
          marginTop: '1.5rem',
          padding: '1rem',
          background: 'rgba(254, 202, 87, 0.1)',
          borderRadius: 16,
          border: '2px solid rgba(254, 202, 87, 0.3)'
        }}>
          <p style={{
            color: '#fff',
            fontSize: '0.95rem',
            marginBottom: '0.5rem',
            fontWeight: 600
          }}>
            Are you a restaurant owner? 🏪
          </p>
          <Link to="/business-login" style={{
            color: genzColors.accent1,
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '1rem'
          }}>
            Access your business dashboard →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginGenZ; 