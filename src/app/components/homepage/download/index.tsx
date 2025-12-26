import styles from './download.module.scss';

export default function Download() {
  return (
    <div className={styles.download}>
      <button className={styles.downloadButton} type="button" aria-label="Download résumé PDF (coming soon)" disabled>
        <span className={styles.label}>abror_cv.pdf</span>
        <span className={styles.soon}>download</span>
      </button>
    </div>
  );
}