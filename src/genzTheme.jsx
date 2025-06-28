// src/genzTheme.js

// Gen Z color palette and gradients
export const genzColors = {
  primary: '#667eea',
  secondary: '#764ba2',
  accent1: '#feca57',
  accent2: '#ff6b6b',
  accent3: '#4ecdc4',
  accent4: '#45b7d1',
  white: '#fff',
  black: '#222',
  text: '#222',
  textLight: '#fff',
  textAccent: '#ff6b6b',
};

export const genzGradients = {
  hero: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)',
  button: 'linear-gradient(120deg, #ff6b6b 0%, #feca57 60%, #4ecdc4 100%)',
  card: 'linear-gradient(120deg, #fff 60%, #feca57 100%)',
  glass: 'rgba(255,255,255,0.99)',
};

// Glassmorphism style
export const glassStyle = {
  background: 'rgba(255,255,255,0.99)',
  backdropFilter: 'blur(16px)',
  border: '2.5px solid #764ba2',
  borderRadius: '32px 24px 40px 32px',
};

// Playful stroke SVGs (as React components)
export const PlayfulStroke1 = (props) => (
  <svg width="120" height="40" viewBox="0 0 120 40" fill="none" {...props}><path d="M10 30 Q 40 5, 60 30 T 110 30" stroke="#4ecdc4" strokeWidth="5" fill="none"/></svg>
);
export const PlayfulStroke2 = (props) => (
  <svg width="80" height="30" viewBox="0 0 80 30" fill="none" {...props}><path d="M5 25 Q 20 5, 40 25 T 75 25" stroke="#764ba2" strokeWidth="4" fill="none"/></svg>
);
export const PlayfulStroke3 = (props) => (
  <svg width="100" height="36" viewBox="0 0 100 36" fill="none" {...props}><path d="M10 30 Q 40 5, 60 30 T 90 30" stroke="#feca57" strokeWidth="5" fill="none"/></svg>
);

// Font stack
export const genzFont = 'Poppins, Inter, sans-serif';

// Border radii
export const genzRadii = {
  card: '36px 18px 32px 24px',
  cardAlt: '24px 36px 18px 32px',
  button: '18px',
  input: '16px',
};

// Shadows
export const genzShadows = {
  card: '0 12px 32px rgba(255,107,107,0.18), 0 2px 12px rgba(102,126,234,0.10)',
  button: '0 6px 16px rgba(102,126,234,0.18)',
};

// Utility for glassmorphism card style
export const genzCardStyle = {
  background: 'rgba(255,255,255,0.96)',
  borderRadius: genzRadii.card,
  boxShadow: genzShadows.card,
  border: '2px solid #e0e0e0',
  padding: '32px 18px 28px 18px',
}; 