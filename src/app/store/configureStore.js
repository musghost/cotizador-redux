import {applyMiddleware, createStore} from 'redux';
import rootReducer from '../reducers/index';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

export default function configureStore(initialState) {
  const middleware = applyMiddleware(promise(), thunk, logger());
  const store = createStore(rootReducer, initialState, middleware);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = rootReducer;
      store.replaceReducer(nextReducer);
    });
  }
  return store;
}
