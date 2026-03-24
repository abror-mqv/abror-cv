'use client'

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import LanguageSwitcher from '../../language-switcher';
import CTA from '../cta';
import styles from './hero.module.scss';
import { useTranslations } from 'next-intl';


export default function Hero() {
  const t = useTranslations('homepage.hero');
  const router = useRouter();
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleTitleClick = useCallback(() => {
    const now = Date.now();
    const timeDiff = now - lastClickTime;
    
    if (timeDiff < 500) { // 500ms window for triple click
      setClickCount(prev => prev + 1);
      if (clickCount >= 2) { // Third click
        router.push('/apps/meditation');
        setClickCount(0);
      }
    } else {
      setClickCount(1);
    }
    
    setLastClickTime(now);
    
    // Reset click count after 1 second
    setTimeout(() => {
      setClickCount(0);
    }, 1000);
  }, [clickCount, lastClickTime, router]);

  return (
    <section className={styles.hero}>
      <div className="hero-content">
        <h1 onClick={handleTitleClick} style={{ cursor: 'pointer' }}>{t('name')}</h1>
        <h2><span>{t('role_title')}</span> <LanguageSwitcher/></h2>
      </div>
    </section>
  );
}