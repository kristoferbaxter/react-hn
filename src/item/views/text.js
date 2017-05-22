import React from 'react';
import objstr from 'obj-str';

import styles from './text.css';

export default function({text, isComment=false}) {
  if (text === undefined || text === null) return null;

  return <div className={objstr({[styles.text]: true, [styles.comment]: isComment})} dangerouslySetInnerHTML={{__html: text}} />;
}