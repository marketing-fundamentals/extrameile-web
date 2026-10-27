import React from 'react';
import styles from './styles.module.css';

type Props = {
  label: string;
  href: string;
  size?: 'sm' | 'lg';
  active?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
};

export function XmNavLink({ label, href, size = 'sm', active = false, onClick }: Props) {
  return (
    <a
      className={[styles.link, size === 'lg' ? styles.lg : styles.sm, active ? styles.active : ''].join(' ')}
      href={href}
      aria-current={active ? 'true' : undefined}
      onClick={onClick}
    >
      <span className={styles.label}>{label}</span>
      {active ? <span className={styles.srOnly}> (aktueller Abschnitt)</span> : null}
    </a>
  );
}

export default XmNavLink;
