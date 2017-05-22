import React, {Component} from 'react';
import {GetListApi} from '../../core/api/list.js';
import withData from '../../core/withData.hoc.js';
import ListView from '../list.js';

export default class ListHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uuid: null
    };
    
    this.handleUUIDChange = this.handleUUIDChange.bind(this);
  }

  handleUUIDChange(uuid) {
    this.state.uuid = uuid;
  }
  componentWillReceiveProps() {
    this.state.uuid = null;
  }
  
  render() {
    const {match, listType} = this.props;
    const page = match && match.params.page || 1;
    const {uuid} = this.state;

    const ViewWithData = withData(ListView, {
      fetchDataFunction: GetListApi,
      properties: Object.assign({
        page: page,
        listType: listType
      }, uuid ? {uuid: uuid} : {})
    });

    return <ViewWithData handleUUIDChange={this.handleUUIDChange} />
  }
}