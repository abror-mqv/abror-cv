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
          Work With Me <br />
          Get in Touch <br />
          Contact Me <br />
          Reach Out <br />
          Hire Me → <br />
        </button>
      </div>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}

