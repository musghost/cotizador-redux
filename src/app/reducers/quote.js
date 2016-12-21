import {
  CHANGE_QUOTE,
  FETCH_QUOTE_PENDING,
  FETCH_QUOTE_FULFILLED,
  FETCH_QUOTE_REJECTED,
  SAVE_QUOTE_PENDING,
  SAVE_QUOTE_FULFILLED,
  SAVE_QUOTE_REJECTED,
  SET_CURRENT_COMMENTS,
  CLEAR_CURRENT_COMMENTS
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  quote: [],
  errors: null,
  currentComments: {
    comments: []
  }
};

export default function quote(state = initialState, action) {
  switch (action.type) {

    case CHANGE_QUOTE: {
      return {
        ...state,
        quote: action.quote
      };
    }

    case FETCH_QUOTE_PENDING: {
      return {
        ...state,
        loading: true,
        errors: null
      };
    }

    case FETCH_QUOTE_FULFILLED: {
      return {
        ...state,
        loading: false,
        errors: null,
        quote: action.payload.data.content.quote
      };
    }

    case FETCH_QUOTE_REJECTED: {
      return {
        ...state,
        loading: false,
        errors: action.payload.response.data
      };
    }

    case SAVE_QUOTE_PENDING: {
      return {
        ...state,
        loading: true
      };
    }

    case SAVE_QUOTE_FULFILLED: {
      return {
        ...state,
        loading: false
      };
    }

    case SAVE_QUOTE_REJECTED: {
      return {
        ...state,
        loading: false,
        errors: {
          error: 'Error en el servidor'
        }
      };
    }

    case SET_CURRENT_COMMENTS: {
      return {
        ...state,
        currentComments: action.payload
      };
    }

    case CLEAR_CURRENT_COMMENTS: {
      return {
        ...state,
        currentComments: {
          comments: []
        }
      };
    }



    default:
      return state;
  }
}
