'use client';

import certsData from './data/certs.json';
import stackData from './data/stack.json';
import Header from '../components/header';
import ExplainerWidget from './components/ExplainerWidget';
import styles from './page.module.scss';

type Certificate = {
  id: number;
  title: string;
  issuer: string;
  date: string;
  url: string;
  status?: string;
};

type StackBlock = {
  tile: string;
  mains: { name: string; level: number; color: string }[];
  subs: string[];
};

export default function CertificatesPage() {
  const certificates = (certsData as { certificates: Certificate[] }).certificates;
  const blocks = (stackData as { blocks: StackBlock[] }).blocks;

  return (
    <div className={styles.page}>
      <Header title="my Tech Stack" />
      <main className={styles.main}>
        <section className={styles.board}>
          <div className={styles.stackGrid}>
            {blocks.map((block, idx) => (
              <div key={`${block.tile}-${idx}`} className={styles.block}>
                <div className={styles.blockHeader}>{block.tile}</div>
                <div className={styles.mains}>
                  {block.mains.length === 0 ? (
                    <p className={styles.empty}>Coming soon</p>
                  ) : (
                    block.mains.map((item, idxItem) => (
                      <div key={item.name} className={styles.mainItem}>
                        <span className={styles.mainName}>{item.name}</span>
                        <div className={styles.bar}>
                          <span
                            className={styles.fill}
                            style={
                              {
                                ['--fill-target' as string]: `${item.level}%`,
                                ['--fill-delay' as string]: `${idxItem * 80}ms`,
                                backgroundColor: item.color,
                              } as React.CSSProperties
                            }
                          />
                        </div>
                        <span className={styles.level}>{item.level}%</span>
                      </div>
                    ))
                  )}
                </div>
                <div className={styles.subs}>
                  {block.subs.length === 0 ? (
                    <p className={styles.empty}>—</p>
                  ) : (
                    block.subs.map((sub) => (
                      <span key={sub} className={styles.tag}>
                        {sub}
                      </span>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.board}>
          <h1 className={styles.title}>Certifications</h1>
          <ul className={styles.certs}>
            {certificates.map((cert) => (
              <li key={cert.id} className={styles.certItem}>
                <div className={styles.certLeft}>
                  <p className={styles.certTitle}>{cert.title}</p>
                  <p className={styles.certIssuer}>{cert.issuer}</p>
                </div>
                <div className={styles.certRight}>
                  <span className={styles.certDate}>{cert.date}</span>
                  {cert.status ? <span className={styles.status}>{cert.status}</span> : null}
                  <a href={cert.url} target="_blank" rel="noreferrer" className={styles.link}>
                    View
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>
      <ExplainerWidget />
    </div>
  );
}
