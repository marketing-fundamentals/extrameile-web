import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import XmEyebrow from '@siteui/xm-eyebrow';
import XmTitle from '@siteui/xm-title';
import XmText from '@siteui/xm-text';
import XmButton from '@siteui/xm-button';
import XmArcMotif from '@siteui/xm-arc-motif';
import styles from './styles.module.css';

type Paragraph = { text: string };
type Block = { title: string; text: string };

type Props = {
  marker: string;
  headline: string;
  motifLabel: string;
  anchorId: string;
  fullHeight: boolean;
  leadParagraphs: Paragraph[];
  leadHighlight: string;
  blocks: Block[];
  closingLine: string;
  ctaLabel: string;
  ctaHref: string;
  bgColor: string;
  headlineColor: string;
  accentColor: string;
  ruleColor: string;
  showMotif: boolean;
};

export default function UeberUns({
  marker,
  headline,
  motifLabel,
  anchorId,
  fullHeight,
  leadParagraphs,
  leadHighlight,
  blocks,
  closingLine,
  ctaLabel,
  ctaHref,
  bgColor,
  headlineColor,
  accentColor,
  ruleColor,
  showMotif,
}: Props) {
  const reduce = useReducedMotion();
  const paras = Array.isArray(leadParagraphs) ? leadParagraphs : [];
  const textBlocks = Array.isArray(blocks) ? blocks : [];

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const viewport = { once: true, amount: 0.2 };

  return (
    <section
      id={anchorId}
      className={[styles.section, fullHeight ? styles.sectionFull : ''].join(' ')}
      style={{ background: bgColor }}
    >
      <div className={styles.inner}>
        <div className={styles.aside}>
          <motion.div {...rise(0)} viewport={viewport} className={styles.markerRow}>
            <XmEyebrow label={marker} tone="forest" />
          </motion.div>

          <motion.div {...rise(0.06)} viewport={viewport}>
            <XmTitle as="h2" size="xl" tone="forest" balance>
              <span style={{ color: headlineColor }}>{headline}</span>
            </XmTitle>
          </motion.div>

          {showMotif && (
            <div className={styles.motif}>
              <XmArcMotif accentColor={accentColor} lineColor={headlineColor} label={motifLabel} />
            </div>
          )}
        </div>

        <div className={styles.copy}>
          {paras.map((para, i) => (
            <motion.p key={i} {...rise(0.06 + i * 0.06)} viewport={viewport} className={styles.para}>
              {para.text}
            </motion.p>
          ))}

          <motion.div
            {...rise(0.2)}
            viewport={viewport}
            className={styles.highlight}
            style={{ borderLeftColor: accentColor }}
          >
            <XmTitle as="p" size="md" tone="forest" balance={false}>
              <span style={{ color: headlineColor }}>{leadHighlight}</span>
            </XmTitle>
          </motion.div>

          {textBlocks.map((block, i) => (
            <motion.div
              key={i}
              {...rise(0.1 + i * 0.06)}
              viewport={viewport}
              className={styles.block}
              style={{ borderTopColor: ruleColor }}
            >
              <h3 className={styles.blockTitle} style={{ color: headlineColor }}>
                {block.title}
              </h3>
              <p className={styles.para}>{block.text}</p>
            </motion.div>
          ))}

          <motion.div {...rise(0.14)} viewport={viewport} className={styles.footer} style={{ borderTopColor: ruleColor }}>
            <XmText as="p" size="xl" weight={500} tone="forest" maxWidth="40ch">
              {closingLine}
            </XmText>
            <div className={styles.cta}>
              <XmButton label={ctaLabel} href={ctaHref} variant="primary" size="lg" withArrow />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
