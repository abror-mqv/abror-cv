'use client';

import { useEffect, useMemo, useState } from 'react';
import checks from './data/check.json';
import styles from './contact_modal.module.scss';
import Image from 'next/image';

type Props = {
    open: boolean;
    onClose: () => void;
};

export default function ContactModal({ open, onClose }: Props) {
    const [checked, setChecked] = useState<boolean[]>(() => checks.map(() => false));
    const [showContacts, setShowContacts] = useState(false);
    const [copied, setCopied] = useState(false);

    const allChecked = useMemo(() => checked.every(Boolean), [checked]);
    const headerLabel = showContacts ? "You're welcome" : 'Before we talk';

    useEffect(() => {
        if (!open) {
            setChecked(checks.map(() => false));
            setShowContacts(false);
            setCopied(false);
        }
    }, [open]);

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
                        <p className={styles.title}>a quick sanity check</p>
                        <ul className={styles.checklist}>
                            {checks.map((item, idx) => (
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
                            Proceed
                        </button>
                        <p className={styles.subtitle}>This helps filter serious opportunities and saves time on both sides.</p>

                    </div>
                ) : (
                    <div className={`${styles.content} ${styles.contacts}`}>
                        <p className={styles.title}>my direct lines</p>
                        <div className={styles.links}>
                            <div className={styles.rowSingle}>
                                <a className={styles.contactCard} href="https://t.me/abror_mqv" target="_blank" rel="noreferrer" >
                                    <Image src="/telegram.png" alt="Telegram" width={24} height={24} />
                                    <span className={styles.cardTitle}>Telegram</span>
                                    <p>Direct me</p>
                                </a>
                                <div className={styles.contactCard}>
                                    <div className={styles.mailLine}>
                                        <Image src="/mail.png" alt="Email" width={24} height={24} />
                                        <span className={styles.cardTitle}>Email</span>
                                    </div>
                                    <p>mmtklvabrr@gmail.com</p>
                                    <div className={styles.copyRow}>
                                        <a href={`mailto:mmtklvabrr@gmail.com`}>Open mail app</a>
                                        <button
                                            type="button"
                                            className={styles.copyBtn}
                                            onClick={() => handleCopy('mmtklvabrr@gmail.com')}
                                        >
                                            {copied ? 'Copied' : 'Copy'}
                                        </button>
                                    </div>
                                    <span className={styles.copyStatus} aria-live="polite">
                                        {copied ? 'Email copied to clipboard' : ''}
                                    </span>
                                </div>
                                <a className={styles.contactCard} href="https://www.linkedin.com/in/abror-mqv" target="_blank" rel="noreferrer">
                                    <Image src="/linkedin.png" alt="LinkedIn" width={24} height={24} />
                                    <span className={styles.cardTitle}>LinkedIn</span>
                                    <p>Let’s connect</p>
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}