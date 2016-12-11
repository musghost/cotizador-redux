import {
  FETCH_USERS_PENDING,
  FETCH_USERS_FULFILLED,
  FETCH_USERS_REJECTED
} from '../constants/ActionTypes';

const initialState = {
  users: [],
  loading: false
};

export default function users(state = initialState, action) {
  switch (action.type) {

    case FETCH_USERS_PENDING:
      return {
        ...state,
        loading: true
      };

    case FETCH_USERS_FULFILLED:
      return {
        ...state,
        loading: false,
        users: action.payload.data
      };

    case FETCH_USERS_REJECTED:
      if(action.payload.response.status == 401) {
        return browserHistory.push('/');
      }
      return {
        ...state,
        loading: false,
        errors: action.error
      };

    default:
      return state;
  }
}
