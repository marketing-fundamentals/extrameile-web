import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './styles.module.css';

type Props = {
  number: string;
  title: string;
  text: string;
  index?: number;
  isLast?: boolean;
  accentColor?: string;
  railColor?: string;
};

export function XmStage({
  number,
  title,
  text,
  index = 0,
  isLast = false,
  accentColor = '#C89A6B',
  railColor = '#C89A6B55',
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.li
      className={[styles.stage, isLast ? styles.last : ''].join(' ')}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: reduce ? 0.3 : 0.6, delay: reduce ? 0 : index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.rail} style={{ background: railColor }} />
        <span className={styles.dot} style={{ borderColor: accentColor, background: isLast ? accentColor : 'transparent' }} />
      </span>

      <span className={styles.number} style={{ color: accentColor }}>
        {number}
      </span>
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.text}>{text}</p>
    </motion.li>
  );
}

export default XmStage;
