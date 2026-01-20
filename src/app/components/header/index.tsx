'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import styles from './header.module.scss';
import { useState } from 'react';
import ContactModal from '../contact_modal';
import LanguageSwitcher from '../language-switcher';

export default function Header({ title }: { title: string }) {
  const [open, setOpen] = useState(false);
  const t = useTranslations('header');
  
  return (
    <header className={styles.header}>
      <div className={styles.topBlock}>
        <Link href="/" className={styles.button} aria-label="Back to home">
          ← <span>{t('back')}</span>
        </Link>
        <button type="button" className={styles.button} aria-label="Get in touch" onClick={() => setOpen(true)}>
          {t('get_in_touch')}
        </button>
        <LanguageSwitcher />
      </div>
      <h1>{title}</h1>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </header>
  );
}