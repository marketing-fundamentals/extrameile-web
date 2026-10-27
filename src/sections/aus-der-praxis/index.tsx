import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import XmEyebrow from '@siteui/xm-eyebrow';
import XmTitle from '@siteui/xm-title';
import XmText from '@siteui/xm-text';
import XmButton from '@siteui/xm-button';
import XmCaseRow from '@siteui/xm-case-row';
import styles from './styles.module.css';

type Metric = { value: string; label: string };

type CaseItem = {
  number: string;
  title: string;
  subline: string;
  tags: string;
  body: string;
  contributionLabel: string;
  contribution: string;
  resultsLabel: string;
  resultsPeriod: string;
  note: string;
  metrics: Metric[];
  showArc: boolean;
};

type Props = {
  marker: string;
  headline: string;
  intro: string;
  anchorId: string;
  fullHeight: boolean;
  cases: CaseItem[];
  closingTitle: string;
  closingText: string;
  ctaLabel: string;
  ctaHref: string;
  bgColor: string;
  headlineColor: string;
  accentColor: string;
  ruleColor: string;
};

export default function AusDerPraxis({
  marker,
  headline,
  intro,
  anchorId,
  fullHeight,
  cases,
  closingTitle,
  closingText,
  ctaLabel,
  ctaHref,
  bgColor,
  headlineColor,
  accentColor,
  ruleColor,
}: Props) {
  const reduce = useReducedMotion();
  const rows = Array.isArray(cases) ? cases : [];

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 20 },
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
        <header className={styles.head}>
          <motion.div {...rise(0)} viewport={viewport} className={styles.markerRow}>
            <XmEyebrow label={marker} tone="forest" />
          </motion.div>

          <div className={styles.headGrid}>
            <motion.div {...rise(0.06)} viewport={viewport}>
              <XmTitle as="h2" size="xl" tone="forest" balance>
                <span style={{ color: headlineColor }}>{headline}</span>
              </XmTitle>
            </motion.div>

            <motion.div {...rise(0.12)} viewport={viewport} className={styles.intro}>
              <XmText as="p" size="lg" tone="secondary" maxWidth="52ch">
                {intro}
              </XmText>
            </motion.div>
          </div>
        </header>

        <div className={styles.cases}>
          {rows.map((item, i) => (
            <XmCaseRow
              key={i}
              number={item.number}
              title={item.title}
              subline={item.subline}
              tags={item.tags}
              body={item.body}
              contributionLabel={item.contributionLabel}
              contribution={item.contribution}
              resultsLabel={item.resultsLabel}
              resultsPeriod={item.resultsPeriod}
              metrics={item.metrics}
              note={item.note}
              accentColor={accentColor}
              ruleColor={ruleColor}
              showArc={item.showArc}
            />
          ))}
        </div>

        <motion.div
          {...rise(0.05)}
          viewport={viewport}
          className={styles.closing}
          style={{ borderTopColor: ruleColor }}
        >
          <div className={styles.closingText}>
            <XmTitle as="p" size="md" tone="forest" balance={false}>
              <span style={{ color: headlineColor }}>{closingTitle}</span>
            </XmTitle>
            <div className={styles.closingBody}>
              <XmText as="p" size="lg" tone="secondary" maxWidth="58ch">
                {closingText}
              </XmText>
            </div>
          </div>

          <div className={styles.closingCta}>
            <XmButton label={ctaLabel} href={ctaHref} variant="primary" size="lg" withArrow />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
