'use client';

import { useState } from 'react';
import styles from '../page.module.scss';

export default function ExplainerWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.widget}>
      <button
        type="button"
        className={styles.widgetToggle}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        How rates are estimated?
      </button>
      {open ? (
        <div className={styles.widgetBody}>
          <p>
            My strongest stack is React, which I set at 100/100.
            <br/>
            <br/>
            Every other technology is scored
            relative to that benchmark: how deeply I know it, how many real projects I’ve shipped
            with it, and how confidently I can solve typical production tasks. A 100 does not mean
            “perfect at everything” - it just marks my personal ceiling today. 
            <br/>
            <br/>
            Lower scores show how much less experienced I am with that tech compared to my React baseline.
          </p>
        </div>
      ) : null}
    </div>
  );
}
