import LanguageSwitcher from '../../language-switcher';
import CTA from '../cta';
import styles from './hero.module.scss';
import { useTranslations } from 'next-intl';


export default function Hero() {
  const t = useTranslations('homepage.hero');
  return (
    <section className={styles.hero}>
      <div className="hero-content">
        <h1>{t('name')}</h1>
        <h2><span>{t('role_title')}</span> <LanguageSwitcher/></h2>
      </div>
    </section>
  );
}