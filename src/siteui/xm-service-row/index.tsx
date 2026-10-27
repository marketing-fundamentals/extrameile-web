import React, { useId } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import styles from './styles.module.css';

type Props = {
  number: string;
  title: string;
  lead: string;
  body: string;
  open?: boolean;
  onToggle?: () => void;
  accentColor?: string;
  ruleColor?: string;
  toggleLabelOpen?: string;
  toggleLabelClosed?: string;
};

export function XmServiceRow({
  number,
  title,
  lead,
  body,
  open = false,
  onToggle,
  accentColor = '#C89A6B',
  ruleColor = '#E8E1D3',
  toggleLabelOpen = 'Weniger anzeigen',
  toggleLabelClosed = 'Mehr anzeigen',
}: Props) {
  const reduce = useReducedMotion();
  const uid = useId();
  const panelId = `xmsr-panel-${uid}`;
  const buttonId = `xmsr-button-${uid}`;

  return (
    <div className={styles.row} style={{ borderTopColor: ruleColor }}>
      <button
        type="button"
        id={buttonId}
        className={styles.head}
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
      >
        <span className={styles.number} style={{ color: accentColor }}>
          {number}
        </span>
        <span className={styles.headText}>
          <span className={styles.title}>{title}</span>
          <span className={styles.lead}>{lead}</span>
        </span>
        <span className={styles.toggle} aria-hidden="true">
          <span className={styles.toggleLabel}>{open ? toggleLabelOpen : toggleLabelClosed}</span>
          <span className={[styles.sign, open ? styles.signOpen : ''].join(' ')}>
            <span className={styles.signBar} style={{ background: accentColor }} />
            <span className={[styles.signBar, styles.signBarV].join(' ')} style={{ background: accentColor }} />
          </span>
        </span>
      </button>

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
            transition={{ duration: reduce ? 0.15 : 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className={styles.body}>{body}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default XmServiceRow;
