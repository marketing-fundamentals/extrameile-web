import React from 'react';
import styles from './styles.module.css';

type Props = {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'tel';
  multiline?: boolean;
  rows?: number;
  required?: boolean;
  optionalHint?: string;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'tel';
  pattern?: string;
  error?: string;
  disabled?: boolean;
  accentColor?: string;
};

export function XmField({
  id,
  label,
  value,
  onChange,
  type = 'text',
  multiline = false,
  rows = 5,
  required = false,
  optionalHint,
  autoComplete,
  inputMode,
  pattern,
  error,
  disabled = false,
  accentColor = '#C89A6B',
}: Props) {
  const errorId = `${id}-error`;
  const hasError = Boolean(error);

  const shared = {
    id,
    name: id,
    value,
    disabled,
    required,
    'aria-invalid': hasError || undefined,
    'aria-describedby': hasError ? errorId : undefined,
    className: [styles.control, hasError ? styles.controlError : ''].join(' '),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    style: { ['--xm-field-accent' as any]: accentColor },
  };

  return (
    <div className={styles.field}>
      <label className={styles.label} htmlFor={id}>
        <span>{label}</span>
        {!required && optionalHint ? <span className={styles.hint}>{optionalHint}</span> : null}
        {required ? (
          <span className={styles.req} style={{ color: accentColor }} aria-hidden="true">
            *
          </span>
        ) : null}
      </label>

      {multiline ? (
        <textarea {...shared} rows={rows} autoComplete={autoComplete} />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} inputMode={inputMode} pattern={pattern} />
      )}

      {hasError ? (
        <p className={styles.error} id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default XmField;
