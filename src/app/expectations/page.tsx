import { useTranslations } from 'next-intl';
import styles from './Expectations.module.scss';
import Header from '../components/header';
import Quote from '../components/homepage/quote';
import Link from 'next/link';

export default function Expectations() {
  const t = useTranslations('expectations');

  return (
    <main className={styles.page}>
      <Header title={t('title')} />
      <div className={styles.content}>
        <article>
          <h2 className={styles.heading} tabIndex={0}>
            <span className={styles.headingMain}>{t('who_i_am.main')}</span>
            <span className={styles.headingHelp}>{t('who_i_am.help')}</span>
          </h2>
          <p>
            {t('who_i_am.content').split('\n').map((paragraph, index) => (
              <span key={index}>
                {paragraph.split('__solid_bonus__').map((part, partIndex) => (
                  <span key={partIndex}>
                    {partIndex === 1 ? (
                      <>
                        <Link href="/certificates" className={styles.link}>{t('links.solid_bonus')}</Link>
                        {part.split('__different_products__').map((subPart, subIndex) => (
                          <span key={subIndex}>
                            {subIndex === 1 ? (
                              <Link href="/projects" className={styles.link}>{t('links.different_products')}</Link>
                            ) : (
                              subPart
                            )}
                          </span>
                        ))}
                      </>
                    ) : (
                      part.split('__different_products__').map((subPart, subIndex) => (
                        <span key={subIndex}>
                          {subIndex === 1 ? (
                            <Link href="/projects" className={styles.link}>{t('links.different_products')}</Link>
                          ) : (
                            subPart
                          )}
                        </span>
                      ))
                    )}
                  </span>
                ))}
                {index < t('who_i_am.content').split('\n').length - 1 && <><br /><br /></>}
              </span>
            ))}
          </p>

        </article>
        <article>
          <h2 className={styles.heading} tabIndex={0}>
            <span className={styles.headingMain}>{t('how_i_work.main')}</span>
            <span className={styles.headingHelp}>{t('how_i_work.help')}</span>
          </h2>
          <p>
            {t('how_i_work.content').split('\n').map((paragraph, index) => (
              <span key={index}>
                {paragraph}
                {index < t('how_i_work.content').split('\n').length - 1 && <><br /><br /></>}
              </span>
            ))}
          </p>
        </article>
        <article>
          <h2 className={styles.heading} tabIndex={0}>
            <span className={styles.headingMain}>{t('what_im_open_to.main')}</span>
            <span className={styles.headingHelp}>{t('what_im_open_to.help')}</span>
          </h2>
          <p>
            {t('what_im_open_to.content').split('\n').map((paragraph, index) => (
              <span key={index}>
                {paragraph}
                {index < t('what_im_open_to.content').split('\n').length - 1 && <><br /><br /></>}
              </span>
            ))}
          </p>
        </article>
      </div>

    </main>
  );
}