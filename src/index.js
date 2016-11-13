import 'babel-polyfill';

import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import App from './app/containers/App';
import Login from './app/containers/Login';
import configureStore from './app/store/configureStore';
import {Router, Route, browserHistory} from 'react-router';

import injectTapEventPlugin from 'react-tap-event-plugin';

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
    </Router>
  </Provider>,
  document.getElementById('root')
);
