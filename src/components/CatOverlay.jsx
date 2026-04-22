import { useRef, useEffect } from 'react';
import { CAT_VIDEO_URL } from '../config';

export default function CatOverlay({ isVisible, onClose }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isVisible && videoRef.current) {
      // Play video when overlay becomes visible
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(e => console.log('Video play error:', e));
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: 999,
        cursor: 'pointer',
        animation: 'fadeIn 0.3s ease',
      }}
      onClick={onClose}
    >
      <video
        ref={videoRef}
        src={CAT_VIDEO_URL}
        autoPlay
        muted
        style={{
          width: '400px',
          height: '400px',
          objectFit: 'contain',
          display: 'block',
        }}
        onError={(e) => {
          console.error('Video error:', e);
        }}
      />
    </div>
  );
}
