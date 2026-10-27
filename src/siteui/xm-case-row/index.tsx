import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import XmMetric from '@siteui/xm-metric';
import styles from './styles.module.css';

type Metric = { value: string; label: string };

type Props = {
  number: string;
  title: string;
  subline: string;
  tags?: string;
  body: string;
  contributionLabel?: string;
  contribution?: string;
  resultsLabel?: string;
  resultsPeriod?: string;
  metrics?: Metric[];
  note?: string;
  accentColor?: string;
  ruleColor?: string;
  showArc?: boolean;
};

export function XmCaseRow({
  number,
  title,
  subline,
  tags,
  body,
  contributionLabel,
  contribution,
  resultsLabel,
  resultsPeriod,
  metrics,
  note,
  accentColor = '#C89A6B',
  ruleColor = '#E8E1D3',
  showArc = true,
}: Props) {
  const reduce = useReducedMotion();
  const list = Array.isArray(metrics) ? metrics.filter((m) => m && m.value) : [];

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const viewport = { once: true, amount: 0.15 };

  return (
    <article className={styles.row} style={{ borderTopColor: ruleColor }}>
      <div className={styles.aside}>
        <motion.div {...rise(0)} viewport={viewport}>
          <span className={styles.number} style={{ color: accentColor }}>
            {number}
          </span>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.subline}>{subline}</p>
          {tags ? (
            <p className={styles.tags} style={{ borderTopColor: `${accentColor}4d` }}>
              {tags}
            </p>
          ) : null}
        </motion.div>

        {showArc && (
          <svg className={styles.arc} viewBox="0 0 120 54" aria-hidden="true" focusable="false">
            <motion.path
              d="M3 50C18 16 62 4 117 7"
              fill="none"
              stroke={accentColor}
              strokeOpacity="0.55"
              strokeWidth="1"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: reduce ? 0 : 1 , ease: 'easeInOut' }}
            />
            <circle cx="3" cy="50" r="2.4" fill={accentColor} fillOpacity="0.5" />
            <circle cx="116" cy="7" r="3" fill={accentColor} />
          </svg>
        )}
      </div>

      <div className={styles.main}>
        <motion.p {...rise(0.05)} viewport={viewport} className={styles.body}>
          {body}
        </motion.p>

        {contribution ? (
          <motion.div {...rise(0.1)} viewport={viewport} className={styles.block} style={{ borderTopColor: ruleColor }}>
            {contributionLabel && (
              <span className={styles.blockLabel} style={{ color: accentColor }}>
                {contributionLabel}
              </span>
            )}
            <p className={styles.blockText}>{contribution}</p>
          </motion.div>
        ) : null}

        {list.length > 0 || note ? (
          <motion.div {...rise(0.15)} viewport={viewport} className={styles.block} style={{ borderTopColor: ruleColor }}>
            {(resultsLabel || resultsPeriod) && (
              <span className={styles.blockLabel} style={{ color: accentColor }}>
                {resultsLabel}
                {resultsPeriod ? <span className={styles.period}>{resultsPeriod}</span> : null}
              </span>
            )}

            {list.length > 0 && (
              <div className={styles.metrics}>
                {list.map((metric, i) => (
                  <XmMetric key={i} value={metric.value} label={metric.label} size="lg" tone="forest" accentColor={accentColor} />
                ))}
              </div>
            )}

            {note ? (
              <p className={styles.note} style={{ borderLeftColor: `${accentColor}80` }}>
                {note}
              </p>
            ) : null}
          </motion.div>
        ) : null}
      </div>
    </article>
  );
}

export default XmCaseRow;
