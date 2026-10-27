import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import XmEyebrow from '@siteui/xm-eyebrow';
import XmTitle from '@siteui/xm-title';
import XmText from '@siteui/xm-text';
import styles from './styles.module.css';

type Situation = { text: string };

type Props = {
  marker: string;
  headline: string;
  situations: Situation[];
  pressureLine: string;
  paragraphTwo: string;
  closingLine: string;
  anchorId: string;
  bgColor: string;
  headlineColor: string;
  accentColor: string;
  ruleColor: string;
  showPathLine: boolean;
  fullHeight: boolean;
};

export default function Entlastungsbedarf({
  marker,
  headline,
  situations,
  pressureLine,
  paragraphTwo,
  closingLine,
  anchorId,
  bgColor,
  headlineColor,
  accentColor,
  ruleColor,
  showPathLine,
  fullHeight,
}: Props) {
  const reduce = useReducedMotion();
  const rows = Array.isArray(situations) ? situations : [];

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const viewport = { once: true, amount: 0.25 };

  return (
    <section
      id={anchorId}
      className={[styles.section, fullHeight ? styles.sectionFull : ''].join(' ')}
      style={{ background: bgColor }}
    >
      <div className={styles.inner}>
        {showPathLine && (
          <svg className={styles.path} viewBox="0 0 420 220" preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <motion.path
              d="M4 8C4 120 110 206 416 212"
              fill="none"
              stroke={accentColor}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: reduce ? 0 : 1.3, ease: 'easeInOut' }}
            />
            <circle cx="4" cy="8" r="3" fill={accentColor} />
          </svg>
        )}

        <div className={styles.left}>
          <motion.div {...rise(0)} viewport={viewport} className={styles.markerRow}>
            <XmEyebrow label={marker} tone="forest" />
          </motion.div>

          <motion.div {...rise(0.08)} viewport={viewport}>
            <XmTitle as="h2" size="xl" tone="forest" balance>
              <span style={{ color: headlineColor }}>{headline}</span>
            </XmTitle>
          </motion.div>
        </div>

        <div className={styles.right}>
          <ul className={styles.situations}>
            {rows.map((row, i) => (
              <motion.li
                key={i}
                className={styles.situation}
                style={{ borderTopColor: ruleColor }}
                {...rise(0.1 + i * 0.07)}
                viewport={viewport}
              >
                <XmText as="span" size="xl" weight={400} tone="forest">
                  {row.text}
                </XmText>
              </motion.li>
            ))}
          </ul>

          <motion.div {...rise(0.3)} viewport={viewport} className={styles.paras}>
            <XmText as="p" size="lg" tone="secondary" maxWidth="65ch">
              {pressureLine}
            </XmText>
            <XmText as="p" size="lg" tone="secondary" maxWidth="65ch">
              {paragraphTwo}
            </XmText>
          </motion.div>

          <motion.div
            {...rise(0.38)}
            viewport={viewport}
            className={styles.closing}
            style={{ borderLeftColor: accentColor }}
          >
            <XmTitle as="p" size="md" tone="forest" balance={false}>
              {closingLine}
            </XmTitle>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
