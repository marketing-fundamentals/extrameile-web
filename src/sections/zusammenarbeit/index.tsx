import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import XmEyebrow from '@siteui/xm-eyebrow';
import XmTitle from '@siteui/xm-title';
import XmStage from '@siteui/xm-stage';
import XmButton from '@siteui/xm-button';
import styles from './styles.module.css';

type Stage = { number: string; title: string; text: string };

type Props = {
  marker: string;
  headline: string;
  note: string;
  ctaLabel: string;
  ctaHref: string;
  anchorId: string;
  fullHeight: boolean;
  stages: Stage[];
  bgColor: string;
  headlineColor: string;
  accentColor: string;
  ruleColor: string;
};

export default function Zusammenarbeit({
  marker,
  headline,
  note,
  ctaLabel,
  ctaHref,
  anchorId,
  fullHeight,
  stages,
  bgColor,
  headlineColor,
  accentColor,
  ruleColor,
}: Props) {
  const reduce = useReducedMotion();
  const list = Array.isArray(stages) ? stages : [];

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const viewport = { once: true, amount: 0.2 };

  return (
    <section
      id={anchorId}
      className={[styles.section, fullHeight ? styles.sectionFull : ''].join(' ')}
      style={{ background: bgColor }}
    >
      <div className={styles.inner}>
        <header className={styles.head} style={{ borderBottomColor: ruleColor }}>
          <motion.div {...rise(0)} viewport={viewport} className={styles.markerRow}>
            <XmEyebrow label={marker} tone="forest" />
          </motion.div>
          <motion.div {...rise(0.06)} viewport={viewport}>
            <XmTitle as="h2" size="xl" tone="forest" balance>
              <span style={{ color: headlineColor }}>{headline}</span>
            </XmTitle>
          </motion.div>
        </header>

        <ol className={styles.track}>
          {list.map((stage, i) => (
            <XmStage
              key={i}
              number={stage.number}
              title={stage.title}
              text={stage.text}
              index={i}
              isLast={i === list.length - 1}
              accentColor={accentColor}
              railColor={`${accentColor}59`}
            />
          ))}
        </ol>

        <motion.div
          {...rise(0.1)}
          viewport={viewport}
          className={styles.footerRow}
          style={{ borderTopColor: ruleColor }}
        >
          <p className={styles.note}>{note}</p>
          <div className={styles.cta}>
            <XmButton label={ctaLabel} href={ctaHref} variant="primary" size="lg" withArrow />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
