import {
  TOGGLE_REGISTER,
  ADD_REGISTER_ERRORS
} from '../constants/ActionTypes';

const initialState = {
  register: true,
  errors: null
};

export default function register(state = initialState, action) {
  switch (action.type) {

    case TOGGLE_REGISTER:
      console.log(action);
      return {
        ...state,
        register: action.change
      };

    case ADD_REGISTER_ERRORS:
      return {
        ...state,
        errors: action.errors
      };

    default:
      return state;
  }
}
