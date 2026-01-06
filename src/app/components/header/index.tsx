'use client';

import Link from 'next/link';
import styles from './header.module.scss';
import { useState } from 'react';
import ContactModal from '../contact_modal';

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.button} aria-label="Back to home">
        ← Back
      </Link>
      <button type="button" className={styles.button} aria-label="Get in touch" onClick={() => setOpen(true)}>
        Get in touch
      </button>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
