import { useTranslations } from 'next-intl';
import styles from './links.module.scss';

export default function Links() {
  const t = useTranslations('homepage.links');

  return (
    <ul className={styles.links}>
      <li>
        <a href="/projects">
          {t.rich('projects', {
            accent: (chunks) => <span className={styles.accent}>{chunks}</span>,
          })}
        </a>
      </li>
      <li>
        <a href="/timeline">
          {t.rich('timeline', {
            accent: (chunks) => <span className={styles.accent}>{chunks}</span>,
          })}
        </a>
      </li>
      <li>
        <a href="/certificates">
          {t.rich('certificates', {
            accent: (chunks) => <span className={styles.accent}>{chunks}</span>,
          })}
        </a>
      </li>
      <li>
        <a href="/expectations">
          {t.rich('expectations', {
            accent: (chunks) => <span className={styles.accent}>{chunks}</span>,
          })}
        </a>
      </li>
    </ul>
  );
}
