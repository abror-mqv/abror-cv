'use client'

import Header from '../components/header';
import { useMemo, useState } from 'react';
import styles from './Timeline.module.scss';
import Card from './components/Card';
import timeline from './data/timeline.json';

export default function TimelinePage() {
  const items = useMemo(() => [...timeline].reverse(), []);
  const [showAll, setShowAll] = useState(false);
  const initialCount = 2;
  const visible = showAll ? items : items.slice(0, initialCount);
  const hasMore = items.length > initialCount && !showAll;

  return (
    <main className={styles.page}>
      <Header />
      <header className={styles.header}>
        <p className={styles.title}>Experience Timeline</p>
      </header>
      <div className={styles.container}>
        <div className={styles.explainer}>
          <div className={styles.axis}>
            <span className={styles.axisLabel}>Recent</span>
            <div className={styles.axisLine} />
            <span className={styles.axisLabelMuted}>Earlier</span>
          </div>

        </div>
        <div className={styles.content}>
          <ol className={styles.list}>
            {visible.map((item, idx) => (
              <Card key={idx} data={item} />
            ))}
          </ol>
          {hasMore ? (
            <div className={styles.controls}>
              <button className={styles.showMore} onClick={() => setShowAll(true)}>
                Show all
              </button>
            </div>
          ) : null}
        </div>

      </div>


    </main>
  );
}
