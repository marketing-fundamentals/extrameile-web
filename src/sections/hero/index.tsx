import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import XmEyebrow from '@siteui/xm-eyebrow';
import XmTitle from '@siteui/xm-title';
import XmText from '@siteui/xm-text';
import XmButton from '@siteui/xm-button';
import styles from './styles.module.css';

type Media = { src?: string; name?: string; width?: number; height?: number } | null;

type Props = {
  eyebrow: string;
  headlineLineOne: string;
  headlineLineTwo: string;
  subline: string;
  paragraphOne: string;
  paragraphTwo: string;
  bgColor: string;
  headlineColor: string;
  accentColor: string;
  fullHeight: boolean;
  image: Media;
  imageAlt: string;
  imageCaption: string;
  showFrameLine: boolean;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export default function Hero({
  eyebrow,
  headlineLineOne,
  headlineLineTwo,
  subline,
  paragraphOne,
  paragraphTwo,
  bgColor,
  headlineColor,
  accentColor,
  fullHeight,
  image,
  imageAlt,
  imageCaption,
  showFrameLine,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: Props) {
  const reduce = useReducedMotion();

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section
      className={[styles.hero, fullHeight ? styles.heroFull : ''].join(' ')}
      style={{ background: bgColor }}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <motion.div {...rise(0)} className={styles.eyebrowRow}>
            <XmEyebrow label={eyebrow} tone="forest" />
          </motion.div>

          <motion.div {...rise(0.08)}>
            <XmTitle as="h1" size="hero" balance={false}>
              <span className={styles.headLine} style={{ color: headlineColor }}>
                {headlineLineOne}
              </span>
              <span className={styles.headLine} style={{ color: headlineColor }}>
                {headlineLineTwo}
                <span className={styles.underline} style={{ background: accentColor }} aria-hidden="true" />
              </span>
            </XmTitle>
          </motion.div>

          <motion.div {...rise(0.16)} className={styles.sublineRow}>
            <XmText as="p" size="xl" weight={500} tone="forest">
              {subline}
            </XmText>
          </motion.div>

          <motion.div {...rise(0.24)} className={styles.paras}>
            <XmText as="p" size="md" tone="secondary" maxWidth="52ch">
              {paragraphOne}
            </XmText>
            <XmText as="p" size="md" tone="secondary" maxWidth="52ch">
              {paragraphTwo}
            </XmText>
          </motion.div>

          <motion.div {...rise(0.32)} className={styles.ctas}>
            <XmButton label={primaryLabel} href={primaryHref} variant="primary" size="lg" withArrow />
            <XmButton label={secondaryLabel} href={secondaryHref} variant="quiet" size="lg" withArrow />
          </motion.div>
        </div>

        <motion.div
          className={styles.mediaCol}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
        >
          {image?.src && (
            <figure className={styles.figure}>
              {showFrameLine && (
                <span className={styles.frameLine} style={{ borderColor: accentColor }} aria-hidden="true" />
              )}
              <div className={styles.imageWrap}>
                <img className={styles.image} src={image.src} alt={imageAlt} loading="eager" />
                <span className={styles.grain} aria-hidden="true" />
              </div>
              {imageCaption && (
                <figcaption className={styles.caption}>
                  <span className={styles.captionDot} style={{ background: accentColor }} aria-hidden="true" />
                  {imageCaption}
                </figcaption>
              )}
            </figure>
          )}
        </motion.div>
      </div>
    </section>
  );
}
