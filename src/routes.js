import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import RoutedView from './core/routedView.js';
import LoadingView from './core/loadingView.js';
import {LIST_TYPES} from './lists/constants.js';

import ListView from './lists/views/list.js';

const ROUTE_BUNDLE_ABOUT = require('bundle-loader?lazy&name=AboutHome!./about/views/about.js');
const ROUTE_BUNDLE_ITEM = require('bundle-loader?lazy&name=ItemHome!./item/views/item.js');
const ROUTE_BUNDLE_USER = require('bundle-loader?lazy&name=UserHome!./lists/views/user.js');

export default function() {
  return (
    <Router>
      <div>
        <Route path='/new/:page' render={({match}) => <RoutedView listType={LIST_TYPES.new} match={match} child={ListView} delay={0}/>} />
        <Route path='/show/:page' render={({match}) => <RoutedView listType={LIST_TYPES.show} match={match} child={ListView} delay={0}/>} />
        <Route path='/ask/:page' render={({match}) => <RoutedView listType={LIST_TYPES.ask} child={ListView} delay={0}/>} />
        <Route path='/jobs/:page' render={({match}) => <RoutedView listType={LIST_TYPES.jobs} match={match} child={ListView} delay={0}/>} />
        <Route path='/about' render={_ => <RoutedView load={ROUTE_BUNDLE_ABOUT}><LoadingView /></RoutedView>} />
        <Route path="/item/:id" render={({match}) => <RoutedView load={ROUTE_BUNDLE_ITEM} match={match}><LoadingView /></RoutedView>} />
        <Route path="/user/:id" render={({match}) => <RoutedView load={ROUTE_BUNDLE_USER} match={match} ><LoadingView /></RoutedView>} />
        <Route path="/top/:page" render={({match}) => <RoutedView listType={LIST_TYPES.top} match={match} child={ListView} delay={0}/>} />
        <Route exact path="/" render={_ => <RoutedView listType={LIST_TYPES.top} child={ListView} delay={0}/>} />
      </div>
    </Router>
  );
}