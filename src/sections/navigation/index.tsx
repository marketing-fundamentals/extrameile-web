import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import XmWordmark from '@siteui/xm-wordmark';
import XmNavLink from '@siteui/xm-nav-link';
import XmButton from '@siteui/xm-button';
import styles from './styles.module.css';

type NavItem = { label: string; href: string };

type Props = {
  navItems: NavItem[];
  bgColor: string;
  borderColor: string;
  accentColor: string;
  sticky: boolean;
  markActiveSection: boolean;
  fullHeight: boolean;
  brandText: string;
  brandHref: string;
  showMark: boolean;
  ctaLabel: string;
  ctaHref: string;
};

export default function Navigation({
  navItems,
  bgColor,
  borderColor,
  accentColor,
  sticky,
  markActiveSection,
  fullHeight,
  brandText,
  brandHref,
  showMark,
  ctaLabel,
  ctaHref,
}: Props) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState('');
  const [pinned, setPinned] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const items = Array.isArray(navItems) ? navItems : [];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Pin the section host to the top of the page and track the visible section.
  useEffect(() => {
    let frame: HTMLElement | null = null;
    let doc: Document | null = null;
    let win: Window | null = null;

    try {
      frame = (window.frameElement as HTMLElement) || null;
      doc = frame ? frame.ownerDocument : null;
      win = doc ? doc.defaultView : null;
    } catch {
      return; // different origin – stay a normal static header
    }
    if (!frame || !doc || !win) return;

    const touched: { el: HTMLElement; style: string | null }[] = [];
    const pin = (el: HTMLElement, zIndex: string) => {
      touched.push({ el, style: el.getAttribute('style') });
      el.style.position = 'sticky';
      el.style.top = '0px';
      el.style.zIndex = zIndex;
      el.style.overflow = 'visible';
    };

    if (sticky && !fullHeight) {
      pin(frame, '60');
      const host = frame.parentElement;
      // only pin the direct wrapper when it really wraps just this section
      if (host && host.offsetHeight <= frame.offsetHeight * 1.6 + 24) pin(host, '60');
      setPinned(true);
    }

    const ids = items
      .map((item) => (item && typeof item.href === 'string' ? item.href : ''))
      .filter((href) => href.startsWith('#') && href.length > 1)
      .map((href) => href.slice(1));

    const targets = ids
      .map((id) => ({ id, el: doc!.getElementById(id) }))
      .filter((t): t is { id: string; el: HTMLElement } => Boolean(t.el));

    const headerHeight = () => headerRef.current?.offsetHeight || 70;

    const anchorStyles = targets.map((t) => ({ el: t.el, style: t.el.getAttribute('style') }));
    const applyScrollMargin = () => {
      const value = `${headerHeight() + 18}px`;
      targets.forEach((t) => {
        t.el.style.scrollMarginTop = value;
      });
    };

    const onScroll = () => {
      applyScrollMargin();
      if (!markActiveSection || targets.length === 0) return;
      const limit = headerHeight() + 56;
      let current = '';
      targets.forEach((t) => {
        if (t.el.getBoundingClientRect().top <= limit) current = t.id;
      });
      const scroller = doc!.documentElement;
      const atBottom = win!.innerHeight + win!.scrollY >= scroller.scrollHeight - 80;
      if (atBottom) current = targets[targets.length - 1].id;
      setActiveId(current);
    };

    applyScrollMargin();
    onScroll();
    win.addEventListener('scroll', onScroll, { passive: true });
    win.addEventListener('resize', onScroll);

    return () => {
      win!.removeEventListener('scroll', onScroll);
      win!.removeEventListener('resize', onScroll);
      touched.forEach(({ el, style }) => {
        if (style === null) el.removeAttribute('style');
        else el.setAttribute('style', style);
      });
      anchorStyles.forEach(({ el, style }) => {
        if (style === null) el.removeAttribute('style');
        else el.setAttribute('style', style);
      });
      setPinned(false);
    };
  }, [sticky, fullHeight, markActiveSection, JSON.stringify(items)]);

  const isActive = (href: string) =>
    markActiveSection && href.startsWith('#') && href.slice(1) === activeId && activeId !== '';

  return (
    <header
      id="top"
      ref={headerRef as any}
      className={[styles.nav, fullHeight ? styles.navFull : '', pinned ? styles.navPinned : ''].join(' ')}
      style={{ background: bgColor, borderBottomColor: borderColor }}
    >
      <div className={styles.inner}>
        <XmWordmark text={brandText} href={brandHref} showMark={showMark} tone="forest" />

        <nav className={styles.links} aria-label="Hauptnavigation">
          {items.map((item, i) => (
            <XmNavLink key={i} label={item.label} href={item.href} active={isActive(item.href)} />
          ))}
        </nav>

        <div className={styles.desktopCta}>
          <XmButton label={ctaLabel} href={ctaHref} variant="primary" size="sm" withArrow />
        </div>

        <button
          type="button"
          className={styles.burger}
          aria-expanded={open}
          aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={[styles.bar, open ? styles.barTopOpen : ''].join(' ')} />
          <span className={[styles.bar, open ? styles.barBottomOpen : ''].join(' ')} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.panel}
            style={{ background: bgColor }}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.panelInner}>
              {items.map((item, i) => (
                <div key={i} className={styles.panelRow} style={{ borderTopColor: borderColor }}>
                  <XmNavLink
                    label={item.label}
                    href={item.href}
                    size="lg"
                    active={isActive(item.href)}
                    onClick={() => setOpen(false)}
                  />
                </div>
              ))}
              <div className={styles.panelCta}>
                <XmButton
                  label={ctaLabel}
                  href={ctaHref}
                  variant="primary"
                  size="md"
                  withArrow
                  fullWidth
                  onClick={() => setOpen(false)}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {pinned ? <span className={styles.pinRule} style={{ background: `${accentColor}33` }} aria-hidden="true" /> : null}
    </header>
  );
}
