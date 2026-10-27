import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './styles.module.css';

type Props = {
  labels: string[];
  tone?: 'cream' | 'forest';
  accentColor?: string;
  lineColor?: string;
  animate?: boolean;
};

export function XmStationLine({
  labels,
  tone = 'cream',
  accentColor = '#C89A6B',
  lineColor = '#C89A6B60',
  animate = true,
}: Props) {
  const reduce = useReducedMotion();
  const items = Array.isArray(labels) ? labels : [];

  return (
    <ol className={[styles.line, tone === 'forest' ? styles.toneForest : styles.toneCream].join(' ')}>
      {items.map((label, i) => {
        const last = i === items.length - 1;
        return (
          <motion.li
            key={i}
            className={styles.item}
            initial={animate && !reduce ? { opacity: 0, y: 8 } : { opacity: 1 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.45, delay: animate && !reduce ? i * 0.09 : 0, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className={styles.track} aria-hidden="true">
              <span className={styles.rail} style={{ background: lineColor }} />
              <span
                className={[styles.dot, last ? styles.dotLast : ''].join(' ')}
                style={last ? { background: accentColor, borderColor: accentColor } : { borderColor: accentColor }}
              />
            </span>
            <span className={styles.label}>{label}</span>
          </motion.li>
        );
      })}
    </ol>
  );
}

export default XmStationLine;
