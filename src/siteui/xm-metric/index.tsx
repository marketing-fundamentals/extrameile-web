import React from 'react';
import styles from './styles.module.css';

type Props = {
  value: string;
  label: string;
  size?: 'md' | 'lg';
  tone?: 'forest' | 'cream';
  accentColor?: string;
  valueColor?: string;
};

export function XmMetric({
  value,
  label,
  size = 'lg',
  tone = 'forest',
  accentColor = '#C89A6B',
  valueColor,
}: Props) {
  return (
    <div className={[styles.metric, styles[size], tone === 'cream' ? styles.cream : styles.forest].join(' ')}>
      <span className={styles.rule} style={{ background: accentColor }} aria-hidden="true" />
      <span className={styles.value} style={valueColor ? { color: valueColor } : undefined}>
        {value}
      </span>
      <span className={styles.label}>{label}</span>
    </div>
  );
}

export default XmMetric;
