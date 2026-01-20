'use client';

import Link from 'next/link';
import styles from './header.module.scss';
import { useState } from 'react';
import ContactModal from '../contact_modal';
import LanguageSwitcher from '../language-switcher';

export default function Header({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className={styles.header}>
      <div className={styles.topBlock}>
        <Link href="/" className={styles.button} aria-label="Back to home">
          ← <span>Back</span>
        </Link>
        <button type="button" className={styles.button} aria-label="Get in touch" onClick={() => setOpen(true)}>
          Get in touch
        </button>
        <LanguageSwitcher />
      </div>
      <h1>{title}</h1>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}