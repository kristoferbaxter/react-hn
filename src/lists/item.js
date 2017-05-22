import React from 'react';
import timeFormat from '../core/time.js';

import styles from './item.css';

const Comments = ({entity: {descendants, id}}) => {
  return <span> | <a href={`/item/${id}`} className={styles.link}>{descendants > 1 ? `${descendants} comments` : 'discuss'}</a></span>;
}

export default function({index, entity}) {
  if (!entity) return null;
  
  const {url, title, score, by, time} = entity;
  return (
    <article className={styles.article}>
      <span className={styles.index}>{index}</span>
      <div className={styles.metadata}>
        <h2><a href={url} className={styles.outboundLink}>{title}</a></h2>
        <p>{score} points by <a href={`/user/${by}`} className={styles.link}>{by}</a> {timeFormat(time)} ago<Comments entity={entity} /></p>
      </div>
    </article>
  );
}

