import {combineReducers} from 'redux';
import todos from './todos';
import register from './register';
import login from './login';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  todos,
  register,
  login,
  form: formReducer
});

export default rootReducer;
