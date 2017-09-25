import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import WithData from '../../core/withData.js';
import GetItems from '../../core/api/items.js';
import LoadingView from '../../core/loadingView.js';
import Comments from './comments.js';
import Text from './text';

import styles from './item.css';

function ItemView({match, data}) {
  if (!data || data === null) {
    return <LoadingView />;
  }

  const id = parseInt(match.params.id, 10);
  const {url, title, score, by, descendants, text} = data[id];
  return (
    <div className={styles.wrapper}>
      <article className={styles.article}>
        <h1><a href={url} className={styles.outboundLink}>{title}</a></h1>
        {url && <small className={styles.hostname}>({new URL(url).hostname})</small>}
        <p className={styles.byline}>{score} points by <Link to={`/user/${by}`} className={styles.link}>{by}</Link></p>
        <Text text={text} />
      </article>
      <div className={styles.comments}>
        <h2 className={styles.numberOfComments}>{descendants} comments</h2>
        <Comments root={id} />
      </div>
    </div>
  );  
}

export default class extends Component {
  renderCallback = data => <ItemView data={data} {...this.props} />;
  
  render() {
    return <WithData 
      source={GetItems} 
      values={{keys: [this.props.match.params.id]}} 
      render={this.renderCallback}
    />;
  }
}