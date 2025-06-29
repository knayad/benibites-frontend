import React, { useState } from 'react';
import burgerSize from '../../assets/burgerSize.jpg';

const BurgerMeme = ({ 
  isMobile = false, 
  containerStyle = {}, 
  showByDefault = false 
}) => {
  const [showBurgerMeme, setShowBurgerMeme] = useState(showByDefault);

  return (
    <div
      style={{
        textAlign: 'center',
        marginTop: '3rem',
        padding: '2rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        cursor: 'pointer',
        userSelect: 'none',
        position: 'relative',
        zIndex: 1,
        minHeight: isMobile ? 220 : 300, // Reserve space for meme
        ...containerStyle
      }}
      onClick={() => setShowBurgerMeme(v => !v)}
      title={showBurgerMeme ? 'Hide burger meme' : 'Show burger meme'}
    >
      <span style={{
        fontSize: isMobile ? '3.2rem' : '4.2rem',
        filter: showBurgerMeme ? 'drop-shadow(0 2px 12px #feca57)' : 'drop-shadow(0 2px 8px #764ba2)',
        transition: 'filter 0.2s',
        animation: showBurgerMeme ? 'bounceBurger 0.7s' : 'none',
      }} role="img" aria-label="burger">🍔</span>
      <div style={{ minHeight: 0, width: '100%' }}>
        {showBurgerMeme && (
          <img
            src={burgerSize}
            alt="big burgers should be wider not taller meme"
            title="big burgers should be wider not taller meme"
            style={{
              marginTop: 16,
              maxWidth: isMobile ? 180 : 260,
              width: '100%',
              borderRadius: 18,
              boxShadow: '0 8px 32px rgba(254,202,87,0.18)',
              userSelect: 'none',
              pointerEvents: 'none',
              filter: 'saturate(1.2) drop-shadow(0 2px 8px #feca57)',
              animation: 'popBurger 0.5s',
            }}
          />
        )}
      </div>
      <style>{`
        @keyframes popBurger {
          0% { transform: scale(0.7) translateY(40px); opacity: 0; }
          60% { transform: scale(1.1) translateY(-10px); opacity: 1; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes bounceBurger {
          0% { transform: scale(1) translateY(0); }
          30% { transform: scale(1.2) translateY(-10px); }
          60% { transform: scale(0.95) translateY(4px); }
          100% { transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default BurgerMeme; 