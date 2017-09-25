import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import timeFormat from '../../core/time.js';
import GetComments from '../../core/api/comments.js';
import WithData from '../../core/withData.js';
import LoadingView from '../../core/loadingView.js';
import Text from './text.js';

import styles from './comments.css';

function Comment({root, data, kidsOnly=true}) {
  if (!data || data === null) {
    return <LoadingView />;
  }

  if (kidsOnly) {
    const {kids} = data[root];
    return kids && <div>{Object.values(kids).map(kid => <Comment root={kid} data={data} kidsOnly={false}/>)}</div>;
  }

  const {by, time, text, kids} = data[root];
  return text ? (
    <article className={styles.comment}>
      <header className={styles.header}>
        <Link to={`/user/${by}`} className={styles.userLink}>{by}</Link>
        <span className={styles.ago}>{timeFormat(time)} ago</span>
      </header>
      <Text text={text} isComment={true} />
      {kids && <div className={styles.kids}>{Object.values(kids).map(kid => <Comment root={kid} data={data} kidsOnly={false} />)}</div>}
    </article>
  ) : null;
}

export default class extends Component {
  renderCallback = data => <Comment data={data} {...this.props} />;

  render() {
    return (
      <section>
        <WithData source={GetComments} values={{root: this.props.root}} render={this.renderCallback} />
      </section>
    );
  }
}