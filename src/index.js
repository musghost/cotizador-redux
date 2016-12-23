import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';

import Login from './app/containers/Login';
import Register from './app/containers/Register';
import Dashboard from './app/containers/Dashboard';
import Quote from './app/containers/Quote';
import Confirm from './app/containers/Confirm';

import configureStore from './app/store/configureStore';
import {Router, Route, browserHistory, hashHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {syncHistoryWithStore, routerActions} from 'react-router-redux';
import {UserAuthWrapper} from 'redux-auth-wrapper';

//import 'todomvc-app-css/index.css';
import 'flexboxgrid/css/index.css';
import 'flexboxgrid/css/flexboxgrid.css';
import './index.scss';

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

injectTapEventPlugin();

const UserIsAuthenticated = UserAuthWrapper({
  authSelector: state => state.user,
  redirectAction: routerActions.replace,
  failureRedirectPath: '/',
  wrapperDisplayName: 'UserIsAuthenticated'
});

render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Login}/>
      <Route path="/sign-up" component={Register}/>
      <Route path="/dashboard" component={UserIsAuthenticated(Dashboard)}/>
      <Route path="/confirm" component={Confirm}/>
      <Route path="/quote">
        <Route path=":id" component={UserIsAuthenticated(Quote)}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
