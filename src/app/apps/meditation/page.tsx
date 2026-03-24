'use client';

import Header from '../../components/header';
import styles from './page.module.scss';
import Meditation from './components/Meditation';

export default function MeditationPage() {


  return (
    <div className={styles.page}>
      <Header title="Meditation" />
      <main className={styles.main}>
        <Meditation />
       
      </main>
    </div>
  );
}
