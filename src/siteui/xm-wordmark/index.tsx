import React from 'react';
import styles from './styles.module.css';

type Props = {
  text?: string;
  tone?: 'forest' | 'cream';
  showMark?: boolean;
  href?: string;
};

export function XmWordmark({ text = 'eXtrameile', tone = 'forest', showMark = true, href }: Props) {
  const inner = (
    <span className={[styles.root, tone === 'cream' ? styles.cream : styles.forest].join(' ')}>
      {showMark && (
        <svg className={styles.mark} viewBox="0 0 34 20" aria-hidden="true" focusable="false">
          <path d="M2 17C7.5 5.5 20 2 32 5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="4.2" cy="15.6" r="2.4" fill="currentColor" />
          <circle cx="29.6" cy="5.2" r="2.9" className={styles.dot} />
        </svg>
      )}
      <span className={styles.text}>{text}</span>
    </span>
  );

  if (href) {
    return (
      <a className={styles.link} href={href} aria-label={text}>
        {inner}
      </a>
    );
  }
  return inner;
}

export default XmWordmark;
