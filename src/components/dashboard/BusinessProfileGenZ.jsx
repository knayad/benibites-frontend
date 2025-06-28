import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { genzColors, genzGradients, genzFont } from '../../genzTheme.jsx';

const BusinessProfileGenZ = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    businessName: user?.businessName || '',
    ownerName: user?.ownerName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    state: user?.state || '',
    zipCode: user?.zipCode || '',
    cuisine: user?.cuisine || '',
    website: user?.website || ''
  });

  const cuisines = [
    'American', 'Italian', 'Mexican', 'Chinese', 'Japanese', 'Thai', 
    'Indian', 'French', 'Mediterranean', 'Greek', 'Spanish', 'Korean',
    'Vietnamese', 'Middle Eastern', 'Caribbean', 'African', 'Fusion'
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement business profile update
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      businessName: user?.businessName || '',
      ownerName: user?.ownerName || '',
      email: user?.email || '',
      phone: user?.phone || '',
      address: user?.address || '',
      city: user?.city || '',
      state: user?.state || '',
      zipCode: user?.zipCode || '',
      cuisine: user?.cuisine || '',
      website: user?.website || ''
    });
    setIsEditing(false);
  };

  return (
    <div>
      <h3 style={{
        color: genzColors.accent1,
        fontWeight: 800,
        fontSize: '1.5rem',
        marginBottom: '1.5rem'
      }}>
        Business Profile 🏪
      </h3>

      {!isEditing ? (
        <div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h4 style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.3rem'
            }}>
              Restaurant Information
            </h4>
            <button
              onClick={() => setIsEditing(true)}
              style={{
                background: genzGradients.button,
                color: genzColors.black,
                border: 'none',
                borderRadius: 16,
                padding: '0.8rem 1.5rem',
                fontFamily: genzFont,
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
            >
              ✏️ Edit Profile
            </button>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '1.5rem',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h5 style={{
                color: genzColors.accent1,
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                Business Name
              </h5>
              <p style={{ color: '#fff', opacity: 0.9 }}>
                {formData.businessName || 'Not set'}
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '1.5rem',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h5 style={{
                color: genzColors.accent1,
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                Owner Name
              </h5>
              <p style={{ color: '#fff', opacity: 0.9 }}>
                {formData.ownerName || 'Not set'}
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '1.5rem',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h5 style={{
                color: genzColors.accent1,
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                Email
              </h5>
              <p style={{ color: '#fff', opacity: 0.9 }}>
                {formData.email || 'Not set'}
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '1.5rem',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h5 style={{
                color: genzColors.accent1,
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                Phone
              </h5>
              <p style={{ color: '#fff', opacity: 0.9 }}>
                {formData.phone || 'Not set'}
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '1.5rem',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h5 style={{
                color: genzColors.accent1,
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                Cuisine Type
              </h5>
              <p style={{ color: '#fff', opacity: 0.9 }}>
                {formData.cuisine || 'Not set'}
              </p>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: 20,
              padding: '1.5rem',
              border: '2px solid rgba(255, 255, 255, 0.2)'
            }}>
              <h5 style={{
                color: genzColors.accent1,
                fontWeight: 700,
                marginBottom: '0.5rem'
              }}>
                Address
              </h5>
              <p style={{ color: '#fff', opacity: 0.9 }}>
                {formData.address || 'Not set'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '2rem'
          }}>
            <h4 style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: '1.3rem'
            }}>
              Edit Business Profile
            </h4>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                type="button"
                onClick={handleCancel}
                style={{
                  background: 'rgba(255, 255, 255, 0.2)',
                  color: '#fff',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: 16,
                  padding: '0.8rem 1.5rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                style={{
                  background: genzGradients.button,
                  color: genzColors.black,
                  border: 'none',
                  borderRadius: 16,
                  padding: '0.8rem 1.5rem',
                  fontFamily: genzFont,
                  fontWeight: 700,
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Save Changes
              </button>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.5rem'
          }}>
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
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 16,
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
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 16,
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

            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 16,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="business@email.com"
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
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 16,
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
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 16,
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
                {cuisines.map(cuisine => (
                  <option key={cuisine} value={cuisine}>{cuisine}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                Website
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 16,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  fontFamily: genzFont,
                  fontSize: '1rem',
                  outline: 'none',
                  transition: 'all 0.3s ease'
                }}
                placeholder="https://yourrestaurant.com"
              />
            </div>

            <div style={{ gridColumn: '1 / -1' }}>
              <label style={{
                display: 'block',
                color: '#fff',
                fontWeight: 700,
                marginBottom: '0.5rem',
                fontSize: '1rem'
              }}>
                Address
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '1rem 1.2rem',
                  borderRadius: 16,
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
          </div>
        </form>
      )}
    </div>
  );
};

export default BusinessProfileGenZ; 