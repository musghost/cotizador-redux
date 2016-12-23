import {
  TOGGLE_LOGIN,
  ADD_LOGIN_ERRORS,
  CONFIRM_ACCOUNT_FULFILLED,
  CONFIRM_ACCOUNT_PENDING,
  CONFIRM_ACCOUNT_REJECTED
} from '../constants/ActionTypes';

const initialState = {
  login: true,
  errors: null,
  confirm: {
    loading: false,
    errors: null,
    done: false
  }
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

    case CONFIRM_ACCOUNT_REJECTED: {
      console.log(action.payload);
      return {
        ...state,
        confirm: {
          loading: false,
          errors: null,
          done: true
        }
      };
    }

    case CONFIRM_ACCOUNT_FULFILLED: {
      console.log(action.payload);
      return {
        ...state,
        confirm: {
          loading: false,
          errors: null,
          done: true
        }
      };
    }

    default:
      return state;
  }
}
