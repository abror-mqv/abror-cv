'use client';

import { useState } from 'react';
import ContactModal from '../../contact_modal';
import styles from './cta.module.scss';

export default function CTA() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className={styles.cta}>
        <button
          className={styles.ctaButton}
          type="button"
          aria-label="Get in touch"
          onClick={() => setOpen(true)}
        >
          <span className={styles.ctaWork}>Work With Me <br /></span>
          <span className={styles.ctaMain}>Get in Touch <br /></span>
          <span className={styles.ctaContact}>Contact Me <br /></span>
          <span className={styles.ctaReach}>Reach Out <br /></span>
          <span className={styles.ctaHire}>Hire Me → <br /></span>
        </button>
      </div>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
