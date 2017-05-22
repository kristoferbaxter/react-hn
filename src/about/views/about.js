import React from 'react';

import styles from './about.css';

export default function() {
  return (
    <article className={styles.about}>
      <h1 className={styles.header}>Simple Hacker News Clone</h1>
      <p>This is an example of a PWA built using React, Webpack, and some opinionated tools.</p>
      <p><strong>Please do not build an application this way</strong>. Instead view this as an example of some concepts used in modern web applications (sw, h2, h2push).</p>
      <p>Made with kindness in California.</p>
    </article>
  );
}