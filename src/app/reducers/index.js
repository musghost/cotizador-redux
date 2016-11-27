import {combineReducers} from 'redux';
import todos from './todos';
import register from './register';
import login from './login';
import user from './user';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  todos,
  register,
  login,
  form: formReducer,
  routing: routerReducer,
  user: user
});

export default rootReducer;
