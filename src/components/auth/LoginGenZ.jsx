import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../store/slices/authSlice';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const LoginGenZ = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
        maxWidth: 480,
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
          Welcome Back!
        </h2>
        <p style={{
          color: genzColors.primary,
          fontSize: '1rem',
          textAlign: 'center',
          marginBottom: '2rem',
          opacity: 0.8
        }}>
          Ready to discover amazing restaurant perks? Let's get you back in! 🍕
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Your email address"
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
          
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Your password"
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

          {error && (
            <div style={{
              background: 'rgba(255, 107, 107, 0.2)',
              border: `2px solid ${genzColors.accent2}`,
              borderRadius: 16,
              padding: '0.8rem',
              color: genzColors.accent2,
              fontWeight: 600,
              textAlign: 'center'
            }}>{error}</div>
          )}

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
            {loading ? 'Signing In... 🔄' : 'Sign In ✨'}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1rem' }}>
          <p style={{ color: genzColors.primary, marginBottom: '0.7rem' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: genzColors.accent1, fontWeight: 700, textDecoration: 'none' }}>
              Sign up here! 🚀
            </Link>
          </p>
          <p style={{ color: genzColors.primary, marginBottom: '0.7rem' }}>
            <Link to="/forgot-password-genz" style={{ color: genzColors.accent2, fontWeight: 700, textDecoration: 'none' }}>
              Forgot your password? 🔑
            </Link>
          </p>
          <p style={{ color: genzColors.primary }}>
            Are you a restaurant owner?{' '}
            <Link to="/business-login" style={{ color: genzColors.accent1, fontWeight: 700, textDecoration: 'none' }}>
              Business Sign In →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginGenZ; 