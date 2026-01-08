import styles from "./page.module.scss";

import Hero from './components/homepage/hero';
import Links from './components/homepage/links';
import CTA from './components/homepage/cta';
import Quote from './components/homepage/quote';
import Download from './components/homepage/download';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.heroTop}>
          <Hero />
          <CTA />
          <div className={styles.heroTopDivider}></div>
        </div>
        <div className={styles.heroBottom}>
          <Links />
          <Download />
        </div>
      </main>
      <Quote />
    </div>
  );
}
