'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { locales, type Locale } from '../../../i18n/config';
import styles from './language-switcher.module.scss';

const localeNames: Record<Locale, string> = {
  en: 'English',
  ru: 'Русский',
  fr: 'Français',
};

export default function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleLocaleChange = (locale: Locale) => {
    if (locale === currentLocale) {
      setIsOpen(false);
      return;
    }

    // Set cookie and reload page
    document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`; // 1 year
    window.location.reload();
  };

  return (
    <div className={styles.container} ref={dropdownRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Change language"
        aria-expanded={isOpen}
      >
        <Image src="/language.svg" alt="Language" width={24} height={24} />
      </button>
      {isOpen && (
        <div className={styles.dropdown}>
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              className={`${styles.option} ${locale === currentLocale ? styles.active : ''}`}
              onClick={() => handleLocaleChange(locale)}
            >
              {localeNames[locale]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

