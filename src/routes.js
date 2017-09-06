import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import SearchIndex from './components/search_index';
import Register from './components/register';
import CompareShow from './components/compare_show';

export default (
  <Route path="/" component={App} >
    <IndexRoute component={SearchIndex} />
    <Route path="/register" component={Register} />
    <Route path="/search" component={CompareShow} />
  </Route>
);
//this.props.params.id
