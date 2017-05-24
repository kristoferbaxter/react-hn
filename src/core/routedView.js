import React, {Component} from 'react';
import Header from '../header/header.js';
import LoadingView from './loadingView.js';

import styles from './routedView.css';

export default class RoutedView extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.lazyLoadedRoutes = {};
  }

  loader() {
    const {load, path, delay=200} = this.props;
    let timeout = null;

    if (delay > 0) {
      timeout = setTimeout(() => {
        this.setState({
          pastDelay: true
        });
      }, delay);
    }

    if (load) {
      load((file) => {
        timeout && clearTimeout(timeout);
        this.setState({
          child: file.default
        }, () => {
          this.lazyLoadedRoutes[path] = file.default;
        });
      });
    }
  }
  
  componentWillMount() {
    if (BROWSER_EXECUTION) {
      this.loader();
    }
  }

  componentWillReceiveProps({path}) {
    if (this.props.path !== path) {
      let nextChild = this.lazyLoadedRoutes[path];

      this.setState({
        child: nextChild
      }, () => {
        nextChild === undefined && this.loader();
      });
    }
  }

  render() {
    const {child, pastDelay} = this.state;

    const usableChild = this.props.child || child || null;
    return (
      <div className={styles.viewHasHeader}>
        <Header />
        <div className={styles.mainView}>
          {usableChild ? React.createElement(usableChild, this.props) : (pastDelay || this.props.delay === 0 ? (this.props.children || <LoadingView />) : null)}
        </div>
      </div>
    );
  }
}