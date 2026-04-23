import { MUSIC_URL, CAT_VIDEO_URL } from '../config';
import { styles } from '../styles';

export default function SidePanel({ isActive, onToggleCamera }) {
  return (
    <div style={styles.sidePanel}>
      <div style={styles.instructionCard}>
        <h3 style={styles.instructionTitle}>Cara Pakai</h3>
        <ol style={styles.instructionList}>
          <li>Klik <strong>Aktifkan Kamera</strong></li>
          <li>Izinkan akses kamera</li>
          <li><strong>Lambaikan tangan</strong> ke kamera</li>
          <li>Lihat progress bar naik</li>
          <li>Video kucing muncul!</li>
        </ol>
      </div>

     

      <div style={{
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '12px',
        padding: '12px',
        border: '1px solid rgba(255,200,100,0.2)',
        fontSize: '0.75rem',
        color: 'rgba(255,200,100,0.9)',
        lineHeight: '1.5',
      }}>
        <strong>💡 Jika tidak terdeteksi:</strong>
        <div style={{ marginTop: '4px' }}>• Pastikan cahaya cukup</div>
        <div>• Buka DevTools (F12)</div>
        <div>• Lihat Console untuk error</div>
      </div>

      <button
        onClick={onToggleCamera}
        style={{
          ...styles.btn,
          background: isActive
            ? '#FF4466'
            : 'linear-gradient(135deg, #FF6B9D, #C44DFF)',
        }}
      >
        {isActive ? '⏹ Matikan Kamera' : '▶ Aktifkan Kamera'}
      </button>
    </div>
  );
}
