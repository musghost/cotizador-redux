import {browserHistory} from 'react-router';
import {
  FETCH_QUOTES_PENDING,
  FETCH_QUOTES_FULFILLED,
  FETCH_QUOTES_REJECTED
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  quotes: [],
  errors: null
};

export default function quotes(state = initialState, action) {
  switch (action.type) {

    case FETCH_QUOTES_PENDING:
      return {
        ...state,
        loading: true
      };

    case FETCH_QUOTES_FULFILLED:
      return {
        ...state,
        loading: false,
        quotes: action.payload.data
      };

    case FETCH_QUOTES_REJECTED:
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
