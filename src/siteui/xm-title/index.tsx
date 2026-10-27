import React from 'react';
import styles from './styles.module.css';

type Props = {
  children?: React.ReactNode;
  text?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  tone?: 'forest' | 'deep' | 'ink' | 'cream' | 'camel';
  balance?: boolean;
};

export function XmTitle({ children, text, as = 'h2', size = 'lg', tone = 'forest', balance = true }: Props) {
  const Tag = as as any;
  return (
    <Tag
      className={[styles.title, styles[size], styles[tone], balance ? styles.balance : ''].join(' ')}
    >
      {text ?? children}
    </Tag>
  );
}

export default XmTitle;
