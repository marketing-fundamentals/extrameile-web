import React from 'react';
import styles from './styles.module.css';

type Props = {
  label: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'camel' | 'quiet';
  size?: 'sm' | 'md' | 'lg';
  withArrow?: boolean;
  fullWidth?: boolean;
  onClick?: (e: React.MouseEvent) => void;
};

export function XmButton({
  label,
  href,
  variant = 'primary',
  size = 'md',
  withArrow = false,
  fullWidth = false,
  onClick,
}: Props) {
  const cls = [
    styles.btn,
    styles[variant],
    styles[size],
    fullWidth ? styles.full : '',
  ].join(' ');

  const content = (
    <>
      <span>{label}</span>
      {withArrow && (
        <svg className={styles.arrow} viewBox="0 0 18 12" aria-hidden="true" focusable="false">
          <path d="M1 6h15M11.5 1.2 16.6 6l-5.1 4.8" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </>
  );

  if (href) {
    return (
      <a className={cls} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" className={cls} onClick={onClick}>
      {content}
    </button>
  );
}

export default XmButton;
