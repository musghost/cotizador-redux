import {combineReducers} from 'redux';
import todos from './todos';
import register from './register';
import {reducer as formReducer} from 'redux-form';

const rootReducer = combineReducers({
  todos,
  register,
  form: formReducer
});

export default rootReducer;
