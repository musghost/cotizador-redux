import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './app/containers/App';
import Login from './app/containers/Login';
import Register from './app/containers/Register';
import Dashboard from './app/containers/Dashboard';
import configureStore from './app/store/configureStore';
import {Router, Route, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {routerReducer, syncHistoryWithStore, routerActions, routerMiddleware} from 'react-router-redux';

//import 'todomvc-app-css/index.css';
import 'flexboxgrid/css/index.css';
import 'flexboxgrid/css/flexboxgrid.css';
import './index.scss';

const store = configureStore();

injectTapEventPlugin();

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Login}/>
      <Route path="/sign-up" component={Register}/>
      <Route path="/dashboard" component={Dashboard}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);
