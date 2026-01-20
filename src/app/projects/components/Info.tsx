import { useTranslations } from 'next-intl';
import styles from '../projects.module.scss';

const Info = ({ data }: { data: any }) => {
    const t = useTranslations('projects.info');
    
    return (
        <div className={styles.info}>
            <div className={styles.infoHeader}>
                <p className={styles.infoKicker}>{t('kicker')}</p>
                <h2 className={styles.infoTitle}>{data.title}</h2>
                
            </div>
            <div className={styles.infoMeta}>
                    <span className={styles.pill}>{data.role}</span>
                    {data.is_open_source ? <span className={styles.badge}>{t('open_source')}</span> : null}
                </div>
            <div className={styles.infoBottom}>
                <p className={styles.infoDesc}>{data.description}</p>

                <div className={styles.infoActions}>
                    {data.liveUrl ? (
                        <a className={styles.linkBtn} href={data.liveUrl} target="_blank" rel="noreferrer">
                            {t('live_demo')}
                        </a>
                    ) : null}
                    {data.githubUrl ? (
                        <a className={styles.linkGhost} href={data.githubUrl} target="_blank" rel="noreferrer">
                            {t('github')}
                        </a>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default Info;