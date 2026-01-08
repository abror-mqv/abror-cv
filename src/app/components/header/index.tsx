'use client';

import Image from 'next/image';
import Link from 'next/link';
import styles from './header.module.scss';
import { useState } from 'react';
import ContactModal from '../contact_modal';

export default function Header({title}: {title: string}) {
  const [open, setOpen] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.button} aria-label="Back to home">
        ← Back
      </Link>
      <button type="button" className={styles.button} aria-label="Get in touch" onClick={() => setOpen(true)}>
        Get in touch
      </button>
      <button type="button" className={styles.buttonLanguage} aria-label="Get in touch" onClick={() => setOpenLanguage(true)}>
        <Image src="/language.svg" alt="Russian" width={24} height={24}/>
      </button>
      <h1>{title}</h1>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}
