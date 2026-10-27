import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { crm } from 'onepage-kit';
import XmEyebrow from '@siteui/xm-eyebrow';
import XmTitle from '@siteui/xm-title';
import XmText from '@siteui/xm-text';
import XmButton from '@siteui/xm-button';
import XmField from '@siteui/xm-field';
import styles from './styles.module.css';

// Native OnePage CRM form id (created via the CRM form tool for this react-app).
const FORM_ID = '4284f649-6efc-417f-90ee-19c9bd1f374e';

type Props = {
  marker: string;
  headline: string;
  intro1: string;
  intro2: string;
  blockTitle: string;
  blockText: string;
  anchorId: string;
  fullHeight: boolean;
  labelName: string;
  labelOrg: string;
  labelEmail: string;
  labelPhone: string;
  labelMessage: string;
  optionalHint: string;
  submitLabel: string;
  pendingLabel: string;
  privacyTextBefore: string;
  privacyLinkLabel: string;
  privacyLinkHref: string;
  privacyTextAfter: string;
  successTitle: string;
  successText: string;
  errorText: string;
  notConnectedText: string;
  requiredError: string;
  emailError: string;
  phoneError: string;
  bgColor: string;
  headlineColor: string;
  accentColor: string;
  cardColor: string;
  ruleColor: string;
};

type Values = { name: string; organisation: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/;
const PHONE_RE = /^[+()\/.\-\s\d]{6,}$/;

export default function Kontakt({
  marker,
  headline,
  intro1,
  intro2,
  blockTitle,
  blockText,
  anchorId,
  fullHeight,
  labelName,
  labelOrg,
  labelEmail,
  labelPhone,
  labelMessage,
  optionalHint,
  submitLabel,
  pendingLabel,
  privacyTextBefore,
  privacyLinkLabel,
  privacyLinkHref,
  privacyTextAfter,
  successTitle,
  successText,
  errorText,
  notConnectedText,
  requiredError,
  emailError,
  phoneError,
  bgColor,
  headlineColor,
  accentColor,
  cardColor,
  ruleColor,
}: Props) {
  const reduce = useReducedMotion();
  const connected = Boolean(FORM_ID);

  const [values, setValues] = useState<Values>({ name: '', organisation: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const setField = (key: keyof Values) => (value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev));
    if (status === 'error') setStatus('idle');
  };

  const validate = (): Errors => {
    const next: Errors = {};
    if (!values.name.trim()) next.name = requiredError;
    if (!values.email.trim()) next.email = requiredError;
    else if (!EMAIL_RE.test(values.email.trim())) next.email = emailError;
    if (values.phone.trim() && !PHONE_RE.test(values.phone.trim())) next.phone = phoneError;
    return next;
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!connected || status === 'submitting') return;

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus('submitting');
    try {
      await crm.submitForm({
        formId: FORM_ID,
        data: {
          name: values.name.trim(),
          organisation: values.organisation.trim(),
          email: values.email.trim(),
          phone: values.phone.trim(),
          message: values.message.trim(),
        },
      });
      setStatus('success');
    } catch (error) {
      setStatus('error');
    }
  };

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, whileInView: { opacity: 1 }, transition: { duration: 0.3 } }
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.62, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  const viewport = { once: true, amount: 0.15 };
  const busy = status === 'submitting';

  return (
    <section
      id={anchorId}
      className={[styles.section, fullHeight ? styles.sectionFull : ''].join(' ')}
      style={{ background: bgColor }}
    >
      <div className={styles.inner}>
        <div className={styles.copy}>
          <motion.div {...rise(0)} viewport={viewport} className={styles.markerRow}>
            <XmEyebrow label={marker} tone="forest" />
          </motion.div>

          <motion.div {...rise(0.06)} viewport={viewport}>
            <XmTitle as="h2" size="xl" tone="forest" balance>
              <span style={{ color: headlineColor }}>{headline}</span>
            </XmTitle>
          </motion.div>

          <motion.div {...rise(0.1)} viewport={viewport} className={styles.introBlock}>
            <XmText as="p" size="lg" tone="secondary" maxWidth="52ch">
              {intro1}
            </XmText>
            <XmText as="p" size="lg" tone="secondary" maxWidth="52ch">
              {intro2}
            </XmText>
          </motion.div>

          <motion.div
            {...rise(0.14)}
            viewport={viewport}
            className={styles.block}
            style={{ borderTopColor: ruleColor }}
          >
            <h3 className={styles.blockTitle} style={{ color: headlineColor }}>
              {blockTitle}
            </h3>
            <XmText as="p" size="md" tone="secondary" maxWidth="54ch">
              {blockText}
            </XmText>
          </motion.div>
        </div>

        <motion.div {...rise(0.12)} viewport={viewport} className={styles.formWrap} style={{ background: cardColor }}>
          {status === 'success' ? (
            <div className={styles.success} role="status" aria-live="polite">
              <span className={styles.successMark} style={{ background: accentColor }} aria-hidden="true" />
              <XmTitle as="p" size="md" tone="forest" balance={false}>
                <span style={{ color: headlineColor }}>{successTitle}</span>
              </XmTitle>
              <div className={styles.successText}>
                <XmText as="p" size="md" tone="secondary" maxWidth="42ch">
                  {successText}
                </XmText>
              </div>
            </div>
          ) : (
            <form className={styles.form} onSubmit={onSubmit} noValidate>
              <XmField
                id="xm-kontakt-name"
                label={labelName}
                value={values.name}
                onChange={setField('name')}
                required
                autoComplete="name"
                error={errors.name}
                disabled={busy || !connected}
                accentColor={accentColor}
              />
              <XmField
                id="xm-kontakt-org"
                label={labelOrg}
                value={values.organisation}
                onChange={setField('organisation')}
                optionalHint={optionalHint}
                autoComplete="organization"
                disabled={busy || !connected}
                accentColor={accentColor}
              />
              <XmField
                id="xm-kontakt-email"
                label={labelEmail}
                type="email"
                inputMode="email"
                value={values.email}
                onChange={setField('email')}
                required
                autoComplete="email"
                error={errors.email}
                disabled={busy || !connected}
                accentColor={accentColor}
              />
              <XmField
                id="xm-kontakt-phone"
                label={labelPhone}
                type="tel"
                inputMode="tel"
                value={values.phone}
                onChange={setField('phone')}
                optionalHint={optionalHint}
                autoComplete="tel"
                error={errors.phone}
                disabled={busy || !connected}
                accentColor={accentColor}
              />
              <XmField
                id="xm-kontakt-message"
                label={labelMessage}
                value={values.message}
                onChange={setField('message')}
                optionalHint={optionalHint}
                multiline
                rows={5}
                disabled={busy || !connected}
                accentColor={accentColor}
              />

              <div className={styles.actions} style={{ borderTopColor: bgColor }}>
                <p className={styles.privacy}>
                  {privacyTextBefore}{' '}
                  <a
                    className={styles.privacyLink}
                    href={privacyLinkHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecorationColor: accentColor }}
                  >
                    {privacyLinkLabel}
                  </a>
                  {privacyTextAfter}
                </p>

                <XmButton
                  label={busy ? pendingLabel : submitLabel}
                  type="submit"
                  variant="primary"
                  size="lg"
                  withArrow={!busy}
                  disabled={busy || !connected}
                  loading={busy}
                />

                {!connected ? (
                  <p className={styles.notice} style={{ borderLeftColor: accentColor }}>
                    {notConnectedText}
                  </p>
                ) : null}

                {status === 'error' ? (
                  <p className={styles.formError} role="alert">
                    {errorText}
                  </p>
                ) : null}
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
