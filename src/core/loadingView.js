import React from 'react';
import Logo from '../icons/logo.js';
import styles from './routeLoading.css';

export default function() {
  return <div className={styles.routeLoading}><Logo width={60} height={60} /></div>;
}