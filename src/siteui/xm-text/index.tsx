import React from 'react';
import styles from './styles.module.css';

type Props = {
  children?: React.ReactNode;
  text?: string;
  as?: 'p' | 'span' | 'div' | 'li';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 400 | 500 | 600;
  tone?: 'ink' | 'secondary' | 'forest' | 'cream' | 'camel';
  maxWidth?: string;
};

export function XmText({
  children,
  text,
  as = 'p',
  size = 'md',
  weight = 400,
  tone = 'secondary',
  maxWidth,
}: Props) {
  const Tag = as as any;
  return (
    <Tag
      className={[styles.text, styles[size], styles[tone], styles['w' + weight]].join(' ')}
      style={maxWidth ? { maxWidth } : undefined}
    >
      {text ?? children}
    </Tag>
  );
}

export default XmText;
