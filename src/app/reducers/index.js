import {combineReducers} from 'redux';
import register from './register';
import login from './login';
import user from './user';
import quotes from './quotes';
import quote from './quote';
import users from './users';
import attach from './attach';
import {reducer as formReducer} from 'redux-form';
import {routerReducer} from 'react-router-redux';

const rootReducer = combineReducers({
  register,
  login,
  form: formReducer,
  routing: routerReducer,
  user,
  quotes,
  quote,
  users,
  attach
});

export default rootReducer;
