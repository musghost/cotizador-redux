import {browserHistory} from 'react-router';
import {
  FETCH_QUOTES_PENDING,
  FETCH_QUOTES_FULFILLED,
  FETCH_QUOTES_REJECTED,
  CREATE_QUOTE_PENDING,
  CREATE_QUOTE_FULFILLED,
  CREATE_QUOTE_REJECTED,
  DELETE_QUOTE_FULFILLED,
  DELETE_QUOTE_PENDING,
  DELETE_QUOTE_REJECTED,
  REMOME_ERRORS,
  SET_SELECTED_QUOTE
} from '../constants/ActionTypes';

const initialState = {
  loading: false,
  quotes: [],
  errors: null,
  quoteSelected: null,
  newQuoteStatus: {
    loading: false,
    errors: null
  },
  removeQuoteStatus: {
    loading: false,
    errors: null
  }
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

    case CREATE_QUOTE_PENDING: {
      return {
        ...state,
        newQuoteStatus: {
          loading: true,
          errors: null
        }
      };
    }
    case CREATE_QUOTE_FULFILLED: {
      const data = action.payload.data;
      return {
        ...state,
        newQuoteStatus: {
          loading: false,
          errors: null
        },
        quotes: state.quotes.concat([data])
      };
    }
    case CREATE_QUOTE_REJECTED: {
      return {
        ...state,
        newQuoteStatus: {
          loading: false,
          errors: {
            error: 'Hubo un error al eliminar la cotización'
          }
        },
      };
    }

    case DELETE_QUOTE_PENDING: {
      return {
        ...state,
        removeQuoteStatus: {
          loading: true,
          errors: null
        }
      };
    }
    case DELETE_QUOTE_FULFILLED: {
      const {quoteSelected} = state;
      const quotes = state.quotes.reduce((quotes, currentQuote) => {
        if(quoteSelected.id !== currentQuote.id) {
          quotes.push(currentQuote);
        }
        return quotes;
      }, []);
      return {
        ...state,
        quotes,
        quoteSelected: null,
        removeQuoteStatus: {
          loading: false,
          errors: null
        }
      };
    }
    case DELETE_QUOTE_REJECTED: {
      return {
        ...state,
        removeQuoteStatus: {
          loading: false,
          errors: {
            error: 'Hubo un error al eliminar la cotización'
          }
        },
      };
    }

    case REMOME_ERRORS: {
      return {
        ...state,
        removeQuoteStatus: {
          loading: false,
          errors: null
        }
      };
    }

    case SET_SELECTED_QUOTE: {
      return {
        ...state,
        quoteSelected: action.payload
      };
    }

    default:
      return state;
  }
}
