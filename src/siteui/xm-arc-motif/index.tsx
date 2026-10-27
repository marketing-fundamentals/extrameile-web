import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import styles from './styles.module.css';

type Props = {
  accentColor?: string;
  lineColor?: string;
  showSecondArc?: boolean;
  label?: string;
};

export function XmArcMotif({
  accentColor = '#C89A6B',
  lineColor = '#1E3B30',
  showSecondArc = true,
  label,
}: Props) {
  const reduce = useReducedMotion();

  const draw = (delay: number) => ({
    initial: reduce ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0.9 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, amount: 0.4 },
    transition: { duration: reduce ? 0 : 1.6, delay: reduce ? 0 : delay, ease: 'easeInOut' as const },
  });

  return (
    <figure className={styles.wrap}>
      <svg className={styles.svg} viewBox="0 0 320 230" fill="none" aria-hidden="true" focusable="false">
        {showSecondArc && (
          <motion.path
            d="M10 214C44 128 134 74 262 86"
            stroke={lineColor}
            strokeOpacity="0.18"
            strokeWidth="1"
            strokeLinecap="round"
            {...draw(0)}
          />
        )}
        <motion.path
          d="M10 214C58 92 160 28 308 40"
          stroke={lineColor}
          strokeOpacity="0.5"
          strokeWidth="1.4"
          strokeLinecap="round"
          {...draw(0.15)}
        />
        <circle cx="10" cy="214" r="5" fill={lineColor} fillOpacity="0.55" />
        <circle cx="305" cy="40" r="8" fill={accentColor} />
      </svg>
      {label ? <figcaption className={styles.caption}>{label}</figcaption> : null}
    </figure>
  );
}

export default XmArcMotif;
