import { styles } from '../styles';

export default function Header({ isMobile }) {
  return (
    <div style={{ ...styles.header, ...(isMobile ? styles.headerMobile : {}) }}>
      <span style={{ ...styles.headerTitle, ...(isMobile ? styles.headerTitleMobile : {}) }}>
        Kicau Mania
      </span>
    </div>
  );
}
