import React, {Component} from 'react';

import timeFormat from '../../core/time.js';
import GetComments from '../../core/api/comments.js';
import withData from '../../core/withData.hoc.js';
import LoadingView from '../../core/loadingView.js';
import Text from './text.js';

import styles from './comments.css';

class Comment extends Component {
  render() {
    const {root, data, kidsOnly} = this.props;
    if (!data || data === null) {
      return <LoadingView />;
    }

    if (kidsOnly) {
      const {kids} = data[root];
      return kids && <div>{Object.values(kids).map((kid) => <Comment root={kid} data={data} />)}</div>;
    }

    const {by, time, text, kids} = data[root];
    return text ? (
      <article className={styles.comment}>
        <header className={styles.header}>
          <a href={`/user/${by}`} className={styles.userLink}>{by}</a>
          <span className={styles.ago}>{timeFormat(time)} ago</span>
        </header>
        <Text text={text} isComment={true} />
        {kids && <div className={styles.kids}>{Object.values(kids).map((kid) => <Comment root={kid} data={data} kidsOnly={false} />)}</div>}
      </article>
    ) : null;
  }
}

export default class extends Component {
  render() {
    const {root} = this.props;
    const CommentWithData = withData(Comment, {fetchDataFunction: GetComments, properties: {root: root}});

    return (
      <section>
        <CommentWithData root={root} kidsOnly={true} />  
      </section>
    );
  }
}