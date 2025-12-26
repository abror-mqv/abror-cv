import styles from './links.module.scss';

export default function Links() {
  return (
    <ul className={styles.links}>
      <li><a href="/projects">What I've <span className={styles.accent}>Built</span></a></li>
      <li><a href="/timeline">Where I've <span className={styles.accent}>Worked</span></a></li>
      <li><a href="/certificates">My <span className={styles.accent}>Tech Stack</span> and Certifications</a></li>
      <li><a href="/expectations">What I <span className={styles.accent}>Expect</span></a></li>
    </ul>
  );
}
