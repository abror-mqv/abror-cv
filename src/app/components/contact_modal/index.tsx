'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import styles from './contact_modal.module.scss';
import Image from 'next/image';

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function ContactModal({ open, onClose }: Props) {
    const [showContacts, setShowContacts] = useState(false);
    const [copied, setCopied] = useState(false);
    const t = useTranslations('contact_modal');
    const checks = t.raw('checks');
    const [checked, setChecked] = useState<boolean[]>(() => checks.map(() => false));


    const allChecked = useMemo(() => checked.every(Boolean), [checked]);
    const headerLabel = showContacts ? t('youre_welcome') : t('before_we_talk');

    useEffect(() => {
        if (!open) {
            setChecked(checks.map(() => false));
            setShowContacts(false);
            setCopied(false);
        }
    }, [open, checks]);

    const toggle = (idx: number) => {
        setChecked((prev) => {
            const next = [...prev];
            next[idx] = !next[idx];
            return next;
        });
    };

    const handleCopy = async (text: string) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1400);
        } catch {
            setCopied(false);
        }
    };

    return (
        <div className={`${styles.overlay} ${open ? styles.visible : ''}`} aria-hidden={!open}>
            <div className={`${styles.modal} ${open ? styles.modalOpen : ''}`}>
                <div className={styles.header}>
                    <span className={styles.label}>{headerLabel}</span>
                    <button className={styles.close} onClick={onClose} aria-label="Close modal">
                        ×
                    </button>
                </div>

                {!showContacts ? (
                    <div className={styles.content}>
                        <p className={styles.title}>{t('quick_sanity_check')}</p>
                        <ul className={styles.checklist}>
                            {checks.map((item: string, idx: number) => (
                                <li key={item} onClick={() => toggle(idx)}>
                                    <label className={styles.checkbox}>
                                        <input
                                            type="checkbox"
                                            checked={checked[idx]}
                                            onChange={() => toggle(idx)}
                                        />
                                        <span className={styles.box} />
                                        <span className={styles.text}>{item}</span>
                                    </label>
                                </li>
                            ))}
                        </ul>
                        <button
                            className={styles.proceed}
                            type="button"
                            disabled={!allChecked}
                            onClick={() => setShowContacts(true)}
                        >
                            {t('proceed')}
                        </button>
                        <p className={styles.subtitle}>{t('subtitle')}</p>

                    </div>
                ) : (
                    <div className={`${styles.content} ${styles.contacts}`}>
                        <p className={styles.title}>{t('my_direct_lines')}</p>
                        <div className={styles.links}>
                            <div className={styles.rowSingle}>
                                <a className={styles.contactCard} href="https://t.me/abror_mqv" target="_blank" rel="noreferrer" >
                                    <Image src="/telegram.png" alt="Telegram" width={24} height={24} />
                                    <span className={styles.cardTitle}>{t('telegram')}</span>
                                    <p>{t('direct_me')}</p>
                                </a>
                                <div className={styles.contactCard}>
                                    <div className={styles.mailLine}>
                                        <Image src="/mail.png" alt="Email" width={24} height={24} />
                                        <span className={styles.cardTitle}>{t('email')}</span>
                                    </div>
                                    <p>mmtklvabrr@gmail.com</p>
                                    <div className={styles.copyRow}>
                                        <a href={`mailto:mmtklvabrr@gmail.com`}>{t('open_mail_app')}</a>
                                        <button
                                            type="button"
                                            className={styles.copyBtn}
                                            onClick={() => handleCopy('mmtklvabrr@gmail.com')}
                                        >
                                            {copied ? t('copied') : t('copy')}
                                        </button>
                                    </div>
                                    <span className={styles.copyStatus} aria-live="polite">
                                        {copied ? t('email_copied') : ''}
                                    </span>
                                </div>
                                <a className={styles.contactCard} href="https://www.linkedin.com/in/abror-mqv" target="_blank" rel="noreferrer">
                                    <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
                                    <span className={styles.cardTitle}>{t('linkedin')}</span>
                                    <p>{t('lets_connect')}</p>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}