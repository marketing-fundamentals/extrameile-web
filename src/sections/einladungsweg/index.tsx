import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import XmEyebrow from '@siteui/xm-eyebrow';
import XmTitle from '@siteui/xm-title';
import XmPathStep from '@siteui/xm-path-step';
import styles from './styles.module.css';

type MediaValue = { src?: string; name?: string; width?: number; height?: number } | null;
type Step = { label: string; text: string; emphasis: boolean };

type Props = {
  image: MediaValue;
  imageAlt: string;
  marker: string;
  headline: string;
  paragraphTwo: string;
  anchorId: string;
  fullHeight: boolean;
  steps: Step[];
  bgColor: string;
  headlineColor: string;
  bodyColor: string;
  accentColor: string;
  showGrain: boolean;
};

export default function Einladungsweg({
  image,
  imageAlt,
  marker,
  headline,
  paragraphTwo,
  anchorId,
  fullHeight,
  steps,
  bgColor,
  headlineColor,
  bodyColor,
  accentColor,
  showGrain,
}: Props) {
  const reduce = useReducedMotion();
  const rows = Array.isArray(steps) ? steps : [];

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 22 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const viewport = { once: true, amount: 0.2 };

  return (
    <section
      id={anchorId}
      className={[styles.section, fullHeight ? styles.sectionFull : ''].join(' ')}
      style={{ background: bgColor }}
    >
      <div className={styles.inner}>
        <motion.div
          className={styles.media}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: reduce ? 0.3 : 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className={styles.frame} style={{ borderColor: `${accentColor}55` }} aria-hidden="true" />
          <div className={styles.imageWrap}>
            {image?.src && (
              <img className={styles.image} src={image.src} alt={imageAlt} loading="lazy" decoding="async" />
            )}
            {showGrain && <span className={styles.grain} aria-hidden="true" />}
          </div>
        </motion.div>

        <div className={styles.content}>
          <motion.div {...rise(0)} viewport={viewport} className={styles.markerRow}>
            <XmEyebrow label={marker} tone="cream" />
          </motion.div>

          <motion.div {...rise(0.07)} viewport={viewport}>
            <XmTitle as="h2" size="xl" tone="cream" balance>
              <span style={{ color: headlineColor }}>{headline}</span>
            </XmTitle>
          </motion.div>

          <ol className={styles.path}>
            {rows.map((step, i) => (
              <XmPathStep
                key={i}
                label={step.label}
                text={step.text}
                index={i}
                isLast={i === rows.length - 1}
                emphasis={!!step.emphasis}
                tone="cream"
                accentColor={accentColor}
                railColor={`${accentColor}55`}
                textColor={bodyColor}
                emphasisColor={headlineColor}
              />
            ))}
          </ol>

          <motion.div {...rise(0.2)} viewport={viewport} className={styles.copy}>
            <p className={styles.para} style={{ color: bodyColor }}>
              {paragraphTwo}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
