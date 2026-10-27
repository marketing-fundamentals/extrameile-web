import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import XmEyebrow from '@siteui/xm-eyebrow';
import XmTitle from '@siteui/xm-title';
import XmText from '@siteui/xm-text';
import XmButton from '@siteui/xm-button';
import XmServiceRow from '@siteui/xm-service-row';
import styles from './styles.module.css';

type Service = { number: string; title: string; lead: string; body: string };

type Props = {
  marker: string;
  headline: string;
  intro: string;
  anchorId: string;
  openFirst: boolean;
  fullHeight: boolean;
  services: Service[];
  toggleLabelClosed: string;
  toggleLabelOpen: string;
  ctaLabel: string;
  ctaHref: string;
  bgColor: string;
  headlineColor: string;
  accentColor: string;
  ruleColor: string;
};

export default function Unterstuetzung({
  marker,
  headline,
  intro,
  anchorId,
  openFirst,
  fullHeight,
  services,
  toggleLabelClosed,
  toggleLabelOpen,
  ctaLabel,
  ctaHref,
  bgColor,
  headlineColor,
  accentColor,
  ruleColor,
}: Props) {
  const reduce = useReducedMotion();
  const rows = Array.isArray(services) ? services : [];
  const [openIndex, setOpenIndex] = useState<number | null>(openFirst ? 0 : null);

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
        <div className={styles.intro}>
          <motion.div {...rise(0)} viewport={viewport} className={styles.markerRow}>
            <XmEyebrow label={marker} tone="forest" />
          </motion.div>

          <motion.div {...rise(0.07)} viewport={viewport}>
            <XmTitle as="h2" size="xl" tone="forest" balance>
              <span style={{ color: headlineColor }}>{headline}</span>
            </XmTitle>
          </motion.div>

          <motion.div {...rise(0.14)} viewport={viewport} className={styles.introText}>
            <XmText as="p" size="lg" tone="secondary" maxWidth="40ch">
              {intro}
            </XmText>
          </motion.div>
        </div>

        <div className={styles.list}>
          {rows.map((service, i) => (
            <motion.div key={i} {...rise(0.06 * i)} viewport={viewport}>
              <XmServiceRow
                number={service.number}
                title={service.title}
                lead={service.lead}
                body={service.body}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
                accentColor={accentColor}
                ruleColor={ruleColor}
                toggleLabelClosed={toggleLabelClosed}
                toggleLabelOpen={toggleLabelOpen}
              />
            </motion.div>
          ))}

          <motion.div
            {...rise(0.1)}
            viewport={viewport}
            className={styles.ctaRow}
            style={{ borderTopColor: ruleColor }}
          >
            <XmButton label={ctaLabel} href={ctaHref} variant="primary" size="lg" withArrow />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
