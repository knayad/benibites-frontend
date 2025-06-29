import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { genzColors, genzGradients, genzFont, PlayfulStroke1 } from '../../genzTheme.jsx';

const ProfileGenZ = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || ''
  });

  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  return (
    <div style={{
      minHeight: '100vh',
      width: '100vw',
      background: genzGradients.hero,
      fontFamily: genzFont,
      position: 'relative',
      overflow: 'hidden',
      padding: isMobile ? '1rem' : '2rem',
      paddingTop: isMobile ? '1rem' : '2rem'
    }}>
      {/* Playful stroke accents */}
      <div style={{ position: 'absolute', top: '15%', left: '10%', transform: 'rotate(25deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: isMobile ? 60 : 80, height: isMobile ? 18 : 24 }} />
      </div>
      <div style={{ position: 'absolute', bottom: '20%', right: '15%', transform: 'rotate(-15deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: isMobile ? 40 : 60, height: isMobile ? 12 : 18 }} />
      </div>
      <div style={{ position: 'absolute', top: '60%', left: '5%', transform: 'rotate(-10deg)', zIndex: 1 }}>
        <PlayfulStroke1 style={{ width: isMobile ? 30 : 40, height: isMobile ? 9 : 12 }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
        {/* Header */}
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '1.5rem' : '2.5rem',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 2
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '1rem' : '2rem',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            flexWrap: 'wrap'
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
            <div style={{ flex: 1, minWidth: isMobile ? '200px' : 'auto' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem',
                flexWrap: 'wrap'
              }}>
                <h1 style={{
                  fontWeight: 900,
                  fontSize: isMobile ? '1.8rem' : '2.5rem',
                  background: genzGradients.button,
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0
                }}>
                  Profile Settings
                </h1>
                <div style={{ fontSize: isMobile ? '1.8rem' : '2.5rem' }}>⚙️</div>
              </div>
              <p style={{
                color: genzColors.primary,
                fontSize: isMobile ? '1rem' : '1.1rem',
                fontWeight: 500,
                opacity: 0.8
              }}>
                Keep your info fresh and up-to-date! 🔄
              </p>
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <div style={{
          background: 'rgba(255,255,255,0.98)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '1.5rem' : '2.5rem',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Header with Edit Button */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: isMobile ? '1.5rem' : '2rem',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h2 style={{
              color: genzColors.primary,
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
                color: isEditing ? genzColors.accent2 : genzColors.black,
                border: isEditing ? `2px solid ${genzColors.accent2}` : 'none',
                borderRadius: isMobile ? 12 : 16,
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
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: isMobile ? '1rem' : '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: genzColors.primary,
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
                    borderRadius: isMobile ? 12 : 16,
                    border: `2px solid ${genzColors.accent1}`,
                    background: isEditing ? 'rgba(255,255,255,0.9)' : 'rgba(102, 126, 234, 0.05)',
                    color: isEditing ? genzColors.black : genzColors.primary,
                    fontFamily: genzFont,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    opacity: isEditing ? 1 : 0.7
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: genzColors.primary,
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
                    borderRadius: isMobile ? 12 : 16,
                    border: `2px solid ${genzColors.accent1}`,
                    background: isEditing ? 'rgba(255,255,255,0.9)' : 'rgba(102, 126, 234, 0.05)',
                    color: isEditing ? genzColors.black : genzColors.primary,
                    fontFamily: genzFont,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    opacity: isEditing ? 1 : 0.7
                  }}
                />
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: isMobile ? '1rem' : '1.5rem'
            }}>
              <div>
                <label style={{
                  display: 'block',
                  color: genzColors.primary,
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
                    borderRadius: isMobile ? 12 : 16,
                    border: `2px solid ${genzColors.accent1}`,
                    background: isEditing ? 'rgba(255,255,255,0.9)' : 'rgba(102, 126, 234, 0.05)',
                    color: isEditing ? genzColors.black : genzColors.primary,
                    fontFamily: genzFont,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    opacity: isEditing ? 1 : 0.7
                  }}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  color: genzColors.primary,
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
                    borderRadius: isMobile ? 12 : 16,
                    border: `2px solid ${genzColors.accent1}`,
                    background: isEditing ? 'rgba(255,255,255,0.9)' : 'rgba(102, 126, 234, 0.05)',
                    color: isEditing ? genzColors.black : genzColors.primary,
                    fontFamily: genzFont,
                    fontSize: isMobile ? '0.9rem' : '1rem',
                    outline: 'none',
                    transition: 'all 0.3s ease',
                    opacity: isEditing ? 1 : 0.7
                  }}
                />
              </div>
            </div>

            {isEditing && (
              <div style={{
                display: 'flex',
                gap: isMobile ? '0.8rem' : '1rem',
                marginTop: '1rem',
                flexWrap: 'wrap'
              }}>
                <button
                  type="submit"
                  style={{
                    background: genzGradients.button,
                    color: genzColors.black,
                    border: 'none',
                    borderRadius: isMobile ? 12 : 16,
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
                    background: 'rgba(102, 126, 234, 0.1)',
                    color: genzColors.primary,
                    border: `2px solid ${genzColors.accent1}`,
                    borderRadius: isMobile ? 12 : 16,
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
          background: 'rgba(255,255,255,0.98)',
          borderRadius: isMobile ? 24 : 32,
          padding: isMobile ? '1.5rem' : '2.5rem',
          border: `2px solid ${genzColors.accent1}`,
          boxShadow: '0 8px 32px rgba(102,126,234,0.18)',
          position: 'relative',
          zIndex: 2
        }}>
          <h2 style={{
            color: genzColors.primary,
            fontWeight: 800,
            fontSize: isMobile ? '1.5rem' : '1.8rem',
            marginBottom: isMobile ? '1rem' : '1.5rem'
          }}>
            Documents & Files 📁
          </h2>
          
          <div style={{
            border: `2px dashed ${genzColors.accent1}`,
            borderRadius: isMobile ? 16 : 20,
            padding: isMobile ? '2rem' : '3rem',
            textAlign: 'center',
            background: 'rgba(102, 126, 234, 0.05)',
            transition: 'all 0.3s ease',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = genzColors.accent2;
            e.target.style.background = 'rgba(102, 126, 234, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = genzColors.accent1;
            e.target.style.background = 'rgba(102, 126, 234, 0.05)';
          }}
          onClick={() => document.getElementById('file-upload').click()}>
            <div style={{ fontSize: isMobile ? '3rem' : '4rem', marginBottom: '1rem' }}>📤</div>
            <h3 style={{
              color: genzColors.primary,
              fontWeight: 700,
              fontSize: isMobile ? '1.2rem' : '1.4rem',
              marginBottom: '0.5rem'
            }}>
              Upload Documents
            </h3>
            <p style={{
              color: genzColors.primary,
              opacity: 0.8,
              fontSize: isMobile ? '0.9rem' : '1rem',
              marginBottom: '1rem'
            }}>
              Drag & drop files here or click to browse
            </p>
            <p style={{
              color: genzColors.primary,
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
              color: genzColors.primary,
              fontWeight: 700,
              fontSize: isMobile ? '1.1rem' : '1.3rem',
              marginBottom: '1rem'
            }}>
              Uploaded Files 📋
            </h3>
            <div style={{
              background: 'rgba(102, 126, 234, 0.05)',
              borderRadius: isMobile ? 12 : 16,
              padding: isMobile ? '1rem' : '1.5rem',
              border: `2px solid ${genzColors.accent1}`
            }}>
              <p style={{
                color: genzColors.primary,
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