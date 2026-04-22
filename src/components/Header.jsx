import { styles } from '../styles';

export default function Header() {
  return (
    <div style={styles.header}>
      <span style={styles.headerTitle}>🐱 Dancing Cat Gesture</span>
      <span style={styles.headerSub}>Tutup mulut + Lambaikan tangan = Kucing joget!</span>
    </div>
  );
}
