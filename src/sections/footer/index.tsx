import React from 'react';
import XmWordmark from '@siteui/xm-wordmark';
import styles from './styles.module.css';

type Link = { label: string; href: string };

type Props = {
  claim: string;
  navTitle: string;
  legalTitle: string;
  copyright: string;
  fullHeight: boolean;
  navLinks: Link[];
  legalLinks: Link[];
  bgColor: string;
  textColor: string;
  mutedColor: string;
  accentColor: string;
};

export default function Footer({
  claim,
  navTitle,
  legalTitle,
  copyright,
  fullHeight,
  navLinks,
  legalLinks,
  bgColor,
  textColor,
  mutedColor,
  accentColor,
}: Props) {
  const nav = Array.isArray(navLinks) ? navLinks.filter((l) => l && l.label) : [];
  const legal = Array.isArray(legalLinks) ? legalLinks.filter((l) => l && l.label) : [];

  return (
    <footer
      className={[styles.footer, fullHeight ? styles.footerFull : ''].join(' ')}
      style={{ background: bgColor }}
    >
      <div className={styles.inner}>
        <div className={styles.brand}>
          <XmWordmark tone="cream" size="md" accentColor={accentColor} />
          <p className={styles.claim} style={{ color: mutedColor }}>
            {claim}
          </p>
        </div>

        <nav className={styles.col} aria-label={navTitle}>
          <h2 className={styles.colTitle} style={{ color: accentColor }}>
            {navTitle}
          </h2>
          <ul className={styles.list}>
            {nav.map((link, i) => (
              <li key={i}>
                <a className={styles.link} href={link.href} style={{ color: textColor }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <nav className={styles.col} aria-label={legalTitle}>
          <h2 className={styles.colTitle} style={{ color: accentColor }}>
            {legalTitle}
          </h2>
          <ul className={styles.list}>
            {legal.map((link, i) => (
              <li key={i}>
                <a
                  className={styles.link}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: textColor }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className={styles.baseline}>
        <div className={styles.baselineInner}>
          <span className={styles.copy} style={{ color: mutedColor }}>
            {copyright}
          </span>
          <span className={styles.dots} aria-hidden="true">
            <span className={styles.dot} style={{ background: `${mutedColor}66` }} />
            <span className={styles.dot} style={{ background: accentColor }} />
          </span>
        </div>
      </div>
    </footer>
  );
}
