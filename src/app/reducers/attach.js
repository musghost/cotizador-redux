import {
  UPLOAD_IMAGE_FULFILLED
} from '../constants/ActionTypes';
import {config} from '../constants/Config';

const initialState = {
  image: ''
};

export default function attach(state = initialState, action) {
  switch (action.type) {

    case UPLOAD_IMAGE_FULFILLED: {
      return {
        image: `${config.API_HOST}/${action.payload.data.path}`
      };
    }

    default:
      return state;
  }
}
