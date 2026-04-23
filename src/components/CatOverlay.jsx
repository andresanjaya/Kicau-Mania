import { useEffect, useState } from 'react';
import { CAT_VIDEO_URL } from '../config';

export default function CatOverlay({ isVisible, onClose }) {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isVisible) return null;

  const catSize = isMobile ? 108 : 190;
  const sideOffset = isMobile ? 10 : 170;
  const catStyleBase = {
    width: `${catSize}px`,
    height: `${catSize}px`,
    objectFit: 'contain',
    display: 'block',
    filter: 'drop-shadow(0 8px 18px rgba(0,0,0,0.28))',
    animation: 'subtleFloat 2.2s ease-in-out infinite',
    pointerEvents: 'none',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        cursor: 'pointer',
        animation: 'fadeIn 0.3s ease',
        overflow: 'hidden',
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: isMobile ? '54%' : '52%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '0 10px' : '0 22px',
          boxSizing: 'border-box',
        }}
      >
        <img
          src={CAT_VIDEO_URL}
          alt="Dancing cat left"
          style={{
            ...catStyleBase,
            transform: `translateX(-${sideOffset}px)`,
            animationDelay: '0s',
          }}
          onError={(e) => {
            console.error('GIF error:', e);
          }}
        />

        <img
          src={CAT_VIDEO_URL}
          alt="Dancing cat right"
          style={{
            ...catStyleBase,
            transform: `translateX(${sideOffset}px) scaleX(-1)`,
            animationDelay: '0.2s',
          }}
          onError={(e) => {
            console.error('GIF error:', e);
          }}
        />
      </div>
    </div>
  );
}
