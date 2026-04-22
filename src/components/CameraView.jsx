import { forwardRef } from 'react';
import { styles } from '../styles';

const CameraView = forwardRef(
  (
    {
      videoRef,
      canvasRef,
      isActive,
      statusText,
      gestureDebug,
      progressPct,
    },
    ref
  ) => {
    return (
      <div style={styles.cameraBox}>
        <video ref={videoRef} style={styles.hiddenVideo} playsInline muted />
        <canvas ref={canvasRef} style={styles.canvas} />
        
        {!isActive && (
          <div style={styles.cameraOverlay}>
            <div style={styles.cameraIconBig}>📷</div>
            <p style={styles.cameraOverlayText}>Kamera belum aktif</p>
          </div>
        )}

        {/* Progress bar overlay */}
        {isActive && progressPct > 0 && (
          <div style={styles.progressBarWrapper}>
            <div style={{ ...styles.progressBar, width: `${progressPct}%` }} />
          </div>
        )}

        {/* Status label */}
        <div style={styles.statusBadge}>{statusText}</div>

        {/* Debug badges */}
        {isActive && (
          <div style={styles.debugRow}>
            <span
              style={{
                ...styles.debugBadge,
                background: gestureDebug.fist ? '#FF6B9D' : '#333',
              }}
            >
              ✊ Tutup Mulut
            </span>
            <span
              style={{
                ...styles.debugBadge,
                background: gestureDebug.wave ? '#4DFFEE' : '#333',
                color: gestureDebug.wave ? '#000' : '#fff',
              }}
            >
              👋 Melambai
            </span>
          </div>
        )}
      </div>
    );
  }
);

CameraView.displayName = 'CameraView';

export default CameraView;
