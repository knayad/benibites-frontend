import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const ProfileGenZ = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement profile update
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || ''
    });
    setIsEditing(false);
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div style={{
      minHeight: '100vh',
      background: genzGradients.hero,
      fontFamily: genzFont,
      position: 'relative',
      overflow: 'hidden',
      paddingTop: '64px'
    }}>
      {/* Playful stroke accents */}
      <div style={{ position: 'absolute', top: '10%', left: '8%', transform: 'rotate(25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 80, height: 24 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '10%', transform: 'rotate(-15deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: 60, height: 18 }} />
      </div>

      <div className="container" style={{ padding: isMobile ? '1rem' : '2rem' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '2rem' : '3rem',
          marginBottom: isMobile ? '2rem' : '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '1rem' : '2rem',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left'
          }}>
            <div style={{
              width: isMobile ? 80 : 100,
              height: isMobile ? 80 : 100,
              borderRadius: '50%',
              background: genzGradients.button,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: isMobile ? '2.5rem' : '3rem',
              boxShadow: '0 10px 30px rgba(102, 126, 234, 0.3)'
            }}>
              👤
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                flexWrap: 'nowrap'
              }}>
                <h1 style={{
                  fontWeight: 900,
                  fontSize: isMobile ? '2rem' : '2.5rem',
                  letterSpacing: '-2px',
                  background: genzGradients.button,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0
                }}>
                  Profile Settings
                </h1>
                <div style={{ fontSize: isMobile ? '2rem' : '2.5rem' }}>⚙️</div>
              </div>
              <p style={{
                color: '#fff',
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 500,
                opacity: 0.9
              }}>
                Keep your info fresh and up-to-date! 🔄
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '2rem' : '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Header with Edit Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            flexDirection: isMobile ? 'column' : 'row',
            gap: isMobile ? '1rem' : '0'
          }}>
            <h2 style={{
              color: genzColors.accent1,
              fontWeight: 800,
              fontSize: isMobile ? '1.5rem' : '1.8rem',
              margin: 0
            }}>
              Personal Information 📝
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                background: isEditing ? 'rgba(255, 107, 107, 0.2)' : genzGradients.button,
                color: isEditing ? '#ff6b6b' : genzColors.black,
                border: isEditing ? '2px solid #ff6b6b' : 'none',
                borderRadius: 16,
                padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                fontFamily: genzFont,
                fontWeight: 700,
                fontSize: isMobile ? '0.9rem' : '1rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              {isEditing ? '❌ Cancel' : '✏️ Edit Profile'}
            </button>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '1rem' : '1.5rem' }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
              gap: isMobile ? '1rem' : '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: '#fff',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: isMobile ? '0.8rem 1rem' : '1rem 1.2rem',
                    borderRadius: 16,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: isEditing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontFamily: genzFont,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    opacity: isEditing ? 1 : 0.7
                  }}
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: '#fff',
                  fontWeight: 700,
                  marginBottom: '0.5rem',
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: isMobile ? '0.8rem 1rem' : '1rem 1.2rem',
                    borderRadius: 16,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: isEditing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontFamily: genzFont,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    opacity: isEditing ? 1 : 0.7
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
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: isMobile ? '0.8rem 1rem' : '1rem 1.2rem',
                    borderRadius: 16,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: isEditing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontFamily: genzFont,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    opacity: isEditing ? 1 : 0.7
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
                  fontSize: isMobile ? '0.9rem' : '1rem'
                }}>
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: isMobile ? '0.8rem 1rem' : '1rem 1.2rem',
                    borderRadius: 16,
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    background: isEditing ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                    color: '#fff',
                    fontFamily: genzFont,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    opacity: isEditing ? 1 : 0.7
                  }}
                  placeholder="City, State"
                />
              </div>
            </div>

            {isEditing && (
              <div style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginTop: isMobile ? '1rem' : '1.5rem'
              }}>
                <button
                  type="submit"
                  style={{
                    background: genzGradients.button,
                    color: genzColors.black,
                    border: 'none',
                    borderRadius: 16,
                    padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                    fontFamily: genzFont,
                    fontWeight: 700,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  💾 Save Changes
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    border: '2px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: 16,
                    padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
                    fontFamily: genzFont,
                    fontWeight: 700,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }}
                >
                  ❌ Cancel
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Document Upload Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '2rem' : '3rem',
          marginTop: isMobile ? '2rem' : '3rem',
          border: '2px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(102, 126, 234, 0.15)',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 style={{
            color: genzColors.accent1,
            fontWeight: 800,
            fontSize: isMobile ? '1.5rem' : '1.8rem',
            marginBottom: isMobile ? '1rem' : '1.5rem'
          }}>
            Documents & Files 📁
          </h2>
          
          <div style={{
            border: '2px dashed rgba(255, 255, 255, 0.3)',
            borderRadius: 20,
            padding: isMobile ? '2rem' : '3rem',
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.6)';
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)';
            e.target.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
          onClick={() => document.getElementById('file-upload').click()}>
            <div style={{ fontSize: isMobile ? '3rem' : '4rem', marginBottom: '1rem' }}>📤</div>
            <h3 style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: isMobile ? '1.2rem' : '1.4rem',
              marginBottom: '0.5rem'
            }}>
              Upload Documents
            </h3>
            <p style={{
              color: '#fff',
              opacity: 0.8,
              fontSize: isMobile ? '0.9rem' : '1rem',
              marginBottom: '1rem'
            }}>
              Drag & drop files here or click to browse
            </p>
            <p style={{
              color: '#fff',
              opacity: 0.6,
              fontSize: isMobile ? '0.8rem' : '0.9rem'
            }}>
              Supports PDF, DOC, JPG, PNG (Max 10MB)
            </p>
            <input
              id="file-upload"
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
              style={{ display: 'none' }}
              onChange={(e) => {
                // Handle file upload logic here
                console.log('Files selected:', e.target.files);
              }}
            />
          </div>

          {/* Uploaded Files List */}
          <div style={{ marginTop: isMobile ? '1.5rem' : '2rem' }}>
            <h3 style={{
              color: '#fff',
              fontWeight: 700,
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              marginBottom: '1rem'
            }}>
              Uploaded Files 📋
            </h3>
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: 16,
              padding: isMobile ? '1rem' : '1.5rem',
              border: '2px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{
                color: '#fff',
                opacity: 0.7,
                fontSize: isMobile ? '0.9rem' : '1rem',
                textAlign: 'center',
                fontStyle: 'italic'
              }}>
                No files uploaded yet. Upload your first document above! 📄
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileGenZ; 