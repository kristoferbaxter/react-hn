import React, {Component} from 'react';
import Header from '../header/header.js';

import styles from './routedView.css';

export default class RoutedView extends Component {
  state = {};
  lazyLoadedRoutes = {};

  loader = _ => {
    const {load, path, delay=200} = this.props;
    const timeout = delay > 0 && setTimeout(_ => {
      this.setState({
        pastDelay: true
      });
    }, delay);

    load && load(file => {
      timeout && clearTimeout(timeout);
      this.setState({
        child: file.default
      }, _ => {
        this.lazyLoadedRoutes[path] = file.default;
      });
    });
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
      }, _ => {
        nextChild === undefined && this.loader();
      });
    }
  }

  render() {
    const {child, pastDelay} = this.state;

    const renderChild = this.props.child || child || null;
    return (
      <div className={styles.viewHasHeader}>
        <Header />
        <div className={styles.mainView}>
          {renderChild ? React.createElement(renderChild, this.props) : (pastDelay || this.props.delay === 0 ? this.props.children : null)}
        </div>
      </div>
    );
  }
}