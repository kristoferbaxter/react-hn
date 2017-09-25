import React, {Component} from 'react';
import {GetListApi} from '../../core/api/list.js';
import WithData from '../../core/withData.js';
import ListView from '../list.js';

export default class ListHome extends Component {
  state = {
    uuid: null
  };

  handleUUIDChange = uuid => this.state.uuid = uuid;
  componentWillReceiveProps = _ => this.state.uuid = null;
  renderCallback = data => <ListView data={data} {...this.props} />;

  render() {
    const {match, listType} = this.props;
    const {uuid} = this.state;
    const values = Object.assign({
      page: parseInt(match && match.params.page || 1, 10),
      listType
    }, uuid ? {uuid} : {});

    return <WithData source={GetListApi} values={values} render={this.renderCallback} handleUUIDChange={this.handleUUIDChange} />;
  }
}