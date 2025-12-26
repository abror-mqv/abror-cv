import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.button} aria-label="Back to home">
        ← Back
      </Link>
      <button type="button" className={styles.button} aria-label="Get in touch">
        Get in touch
      </button>
    </header>
  );
}
