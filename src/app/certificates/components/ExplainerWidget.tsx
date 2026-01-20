'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from '../page.module.scss';

export default function ExplainerWidget() {
  const [open, setOpen] = useState(false);
  const t = useTranslations('certificates.widget');

  return (
    <div className={styles.widget}>
      <button
        type="button"
        className={styles.widgetToggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        {t('toggle')}
      </button>
      {open ? (
        <div className={styles.widgetBody}>
          <p>
            {t('explanation').split('\n').map((paragraph, index) => (
              <span key={index}>
                {paragraph}
                {index < t('explanation').split('\n').length - 1 && (
                  <>
                    <br />
                    <br />
                  </>
                )}
              </span>
            ))}
          </p>
        </div>
      ) : null}
    </div>
  );
}
