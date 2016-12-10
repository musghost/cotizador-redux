import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOGOUT
} from '../constants/ActionTypes';

const initialState = JSON.parse(localStorage.getItem('user') || '{}');

export default function user(state = initialState, action) {
  switch(action.type) {
    case USER_LOGGED_IN:
      return action.user;

    case USER_LOGGED_OUT:
      return {}
    case LOGOUT:
      return {}

    default:
      return state;
  }
}
