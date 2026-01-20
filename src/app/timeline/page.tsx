'use client'

import { useTranslations } from 'next-intl';
import Header from '../components/header';
import { useMemo, useState } from 'react';
import styles from './Timeline.module.scss';
import Card from './components/Card';

export default function TimelinePage() {
  const t = useTranslations('timeline');
  const timelineData = useTranslations('timeline_content');
  const items = useMemo(() => [...timelineData.raw('timeline')].reverse(), []);
  const [showAll, setShowAll] = useState(false);
  const initialCount = 2;
  const visible = showAll ? items : items.slice(0, initialCount);
  const hasMore = items.length > initialCount && !showAll;

  return (
    <main className={styles.page}>
      <Header title={t('title')} />
      <div className={styles.container}>
        <div className={styles.explainer}>
          <div className={styles.axis}>
            <span className={styles.axisLabel}>{t('recent')}</span>
            <div className={styles.axisLine} />
            <span className={styles.axisLabelMuted}>{t('earlier')}</span>
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
                {t('show_all')}
              </button>
            </div>
          ) : null}
        </div>

      </div>


    </main>
  );
}
