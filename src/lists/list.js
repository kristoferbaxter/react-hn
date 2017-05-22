import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import objstr from 'obj-str';
import LoadingView from '../core/loadingView.js';
import ListItem from './item.js';
import {ITEMS_PER_PAGE} from './constants.js';

import styles from './list.css';

const Pagination = ({data: {page, max, type}}) => {
  const maxPages = Math.ceil(parseInt(max, 10)/ITEMS_PER_PAGE);
  const parsedPage = parseInt(page, 10);

  return (
    <p className={styles.pagination}>
      <Link to={`/${type}/${parsedPage-1}`} className={objstr({[styles.navigate]: true, [styles.disabled]: parsedPage <= 1})}>&lt; prev</Link>
      <span className={styles.pages}>{page}/{maxPages}</span>
      <Link to={`/${type}/${parsedPage+1}`} className={objstr({[styles.navigate]: true, [styles.disabled]: parsedPage >= maxPages})}>next &gt;</Link>
    </p>
  );  
}

export default class ListView extends Component {
  render() {
    const {data} = this.props;
    if (!data || data === null) {
      return <LoadingView />;
    }

    const {items, $entities} = data;
    return (
      <main>
        <Pagination data={data} />
        {Object.keys(items).map(item => {
          const itemAsInt = parseInt(item, 10);
          return <ListItem index={itemAsInt+1} entity={$entities[items[itemAsInt]]} />;
        })}
      </main>
    );
  }  
}