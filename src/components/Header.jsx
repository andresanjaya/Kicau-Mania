import { styles } from '../styles';

export default function Header({ isMobile }) {
  return (
    <div style={{ ...styles.header, ...(isMobile ? styles.headerMobile : {}) }}>
      <span style={{ ...styles.headerTitle, ...(isMobile ? styles.headerTitleMobile : {}) }}>
        Kicau Mania
      </span>
      <span style={{ ...styles.headerSub, ...(isMobile ? styles.headerSubMobile : {}) }}>
        Tutup mulut + Lambaikan tangan = Kucing joget!
      </span>
    </div>
  );
}
