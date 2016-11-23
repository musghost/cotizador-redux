import {
  TOGGLE_LOGIN,
  ADD_LOGIN_ERRORS
} from '../constants/ActionTypes';

const initialState = {
  login: true,
  errors: null
};

export default function login(state = initialState, action) {
  switch (action.type) {

    case TOGGLE_LOGIN:
      return {
        ...state,
        login: action.change
      };

    case ADD_LOGIN_ERRORS:
      return {
        ...state,
        errors: action.errors
      };

    default:
      return state;
  }
}
