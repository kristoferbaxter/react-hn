import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RoutedView from './core/routedView.js';
import LoadingView from './core/loadingView.js';
import {LIST_TYPES} from './lists/constants.js';

import ListView from './lists/views/list.js';

const ROUTE_BUNDLE_LIST = require('bundle-loader?lazy&name=ListHome!./lists/views/list.js');
const ROUTE_BUNDLE_ABOUT = require('bundle-loader?lazy&name=AboutHome!./about/views/about.js');
const ROUTE_BUNDLE_ITEM = require('bundle-loader?lazy&name=ItemHome!./item/views/item.js');
const ROUTE_BUNDLE_USER = require('bundle-loader?lazy&name=UserHome!./lists/views/user.js');

export default function() {
  return (
    <Router>
      <div>
        <Route path='/new' render={_ => <RoutedView load={ROUTE_BUNDLE_LIST} listType={LIST_TYPES.new} />} />
        <Route path='/new/:page' render={({match}) => <RoutedView load={ROUTE_BUNDLE_LIST} listType={LIST_TYPES.new} match={match} />} />
        <Route path='/show' render={_ => <RoutedView load={ROUTE_BUNDLE_LIST} listType={LIST_TYPES.show} />} />
        <Route path='/show/:page' render={({match}) => <RoutedView load={ROUTE_BUNDLE_LIST} listType={LIST_TYPES.show} match={match} />} />
        <Route path='/ask' render={_ => <RoutedView load={ROUTE_BUNDLE_LIST} listType={LIST_TYPES.ask} />} />
        <Route path='/ask/:page' render={({match}) => <RoutedView load={ROUTE_BUNDLE_LIST} listType={LIST_TYPES.ask} />} />
        <Route path='/jobs' render={_ => <RoutedView load={ROUTE_BUNDLE_LIST} listType={LIST_TYPES.jobs} />} />
        <Route path='/jobs/:page' render={({match}) => <RoutedView load={ROUTE_BUNDLE_LIST} listType={LIST_TYPES.jobs} match={match} />} />
        <Route path='/about' render={_ => <RoutedView load={ROUTE_BUNDLE_ABOUT} />} />
        <Route path="/item/:id" render={({match}) => <RoutedView load={ROUTE_BUNDLE_ITEM} match={match} />} />
        <Route path="/user/:id" render={({match}) => <RoutedView load={ROUTE_BUNDLE_USER} match={match} />} />
        <Route path="/top/:page" render={({match}) => <RoutedView load={ROUTE_BUNDLE_LIST} listType={LIST_TYPES.top} match={match} />} />
        <Route exact path="/" render={_ => <RoutedView load={ROUTE_BUNDLE_LIST} listType={LIST_TYPES.top} />} />
      </div>
    </Router>
  );
}