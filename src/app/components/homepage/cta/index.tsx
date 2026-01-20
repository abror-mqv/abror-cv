'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import ContactModal from '../../contact_modal';
import styles from './cta.module.scss';

export default function CTA() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('homepage.cta');

  return (
    <>
      <div className={styles.cta}>
        <button
          className={styles.ctaButton}
          type="button"
          aria-label="Get in touch"
          onClick={() => setOpen(true)}
        >
          <span className={styles.ctaWork}>{t('work')} <br /></span>
          <span className={styles.ctaMain}>{t('main')} <br /></span>
          <span className={styles.ctaContact}>{t('contact')} <br /></span>
          <span className={styles.ctaReach}>{t('reach')} <br /></span>
          <span className={styles.ctaHire}>{t('hire')} <br /></span>
        </button>
      </div>
      <ContactModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
