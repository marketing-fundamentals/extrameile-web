import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import XmEyebrow from '@siteui/xm-eyebrow';
import XmTitle from '@siteui/xm-title';
import XmFaqItem from '@siteui/xm-faq-item';
import styles from './styles.module.css';

type Item = { number: string; question: string; answer: string };

type Props = {
  marker: string;
  headline: string;
  anchorId: string;
  openFirst: boolean;
  fullHeight: boolean;
  items: Item[];
  bgColor: string;
  headlineColor: string;
  accentColor: string;
  ruleColor: string;
};

export default function HaeufigeFragen({
  marker,
  headline,
  anchorId,
  openFirst,
  fullHeight,
  items,
  bgColor,
  headlineColor,
  accentColor,
  ruleColor,
}: Props) {
  const reduce = useReducedMotion();
  const list = Array.isArray(items) ? items : [];
  const [openIndex, setOpenIndex] = useState<number | null>(openFirst ? 0 : null);

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
        <div className={styles.aside}>
          <motion.div {...rise(0)} viewport={viewport} className={styles.markerRow}>
            <XmEyebrow label={marker} tone="forest" />
          </motion.div>
          <motion.div {...rise(0.06)} viewport={viewport}>
            <XmTitle as="h2" size="lg" tone="forest" balance>
              <span style={{ color: headlineColor }}>{headline}</span>
            </XmTitle>
          </motion.div>
        </div>

        <motion.div {...rise(0.1)} viewport={viewport} className={styles.list}>
          {list.map((item, i) => (
            <XmFaqItem
              key={i}
              number={item.number}
              question={item.question}
              answer={item.answer}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              accentColor={accentColor}
              ruleColor={ruleColor}
              titleColor={headlineColor}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
