import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './styles.module.css';

type Props = {
  label: string;
  text: string;
  index?: number;
  isLast?: boolean;
  emphasis?: boolean;
  tone?: 'cream' | 'forest';
  accentColor?: string;
  railColor?: string;
  textColor?: string;
  emphasisColor?: string;
};

export function XmPathStep({
  label,
  text,
  index = 0,
  isLast = false,
  emphasis = false,
  tone = 'cream',
  accentColor = '#C89A6B',
  railColor = '#C89A6B55',
  textColor,
  emphasisColor,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      className={[
        styles.step,
        tone === 'forest' ? styles.toneForest : styles.toneCream,
        emphasis ? styles.emphasis : '',
        isLast ? styles.last : '',
      ].join(' ')}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: reduce ? 0.3 : 0.55, delay: reduce ? 0 : index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={styles.rail} style={{ background: railColor }} aria-hidden="true" />
      <span
        className={[styles.dot, emphasis ? styles.dotStrong : ''].join(' ')}
        style={emphasis ? { background: accentColor, borderColor: accentColor } : { borderColor: accentColor }}
        aria-hidden="true"
      />
      <span className={styles.body}>
        <span className={styles.label} style={{ color: accentColor }}>
          {label}
        </span>
        <span
          className={styles.text}
          style={{ color: emphasis ? emphasisColor : textColor }}
        >
          {text}
        </span>
      </span>
    </motion.li>
  );
}

export default XmPathStep;
