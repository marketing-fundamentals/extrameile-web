import React, { useId } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import styles from './styles.module.css';

type Props = {
  number: string;
  question: string;
  answer: string;
  open?: boolean;
  onToggle?: () => void;
  accentColor?: string;
  ruleColor?: string;
  titleColor?: string;
};

export function XmFaqItem({
  number,
  question,
  answer,
  open = false,
  onToggle,
  accentColor = '#C89A6B',
  ruleColor = '#F1ECE1',
  titleColor = '#1E3B30',
}: Props) {
  const reduce = useReducedMotion();
  const uid = useId();
  const panelId = `xmfaq-panel-${uid}`;
  const buttonId = `xmfaq-button-${uid}`;

  return (
    <div className={styles.item} style={{ borderTopColor: ruleColor }}>
      <h3 className={styles.heading}>
        <button
          type="button"
          id={buttonId}
          className={styles.button}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          {number ? (
            <span className={styles.number} style={{ color: accentColor }}>
              {number}
            </span>
          ) : null}
          <span className={styles.question} style={{ color: titleColor }}>
            {question}
          </span>
          <span className={[styles.sign, open ? styles.signOpen : ''].join(' ')} aria-hidden="true">
            <span className={styles.bar} style={{ background: accentColor }} />
            <span className={[styles.bar, styles.barV].join(' ')} style={{ background: accentColor }} />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className={styles.panel}
            initial={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduce ? { opacity: 1 } : { height: 'auto', opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0.15 : 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.answer}>{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default XmFaqItem;
