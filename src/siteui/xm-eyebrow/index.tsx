import React from 'react';
import styles from './styles.module.css';

type Props = {
  label: string;
  tone?: 'forest' | 'camel' | 'cream';
  withRule?: boolean;
};

export function XmEyebrow({ label, tone = 'forest', withRule = true }: Props) {
  return (
    <span className={[styles.root, styles[tone]].join(' ')}>
      {withRule && <span className={styles.rule} aria-hidden="true" />}
      {label}
    </span>
  );
}

export default XmEyebrow;
