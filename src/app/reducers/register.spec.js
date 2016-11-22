import register from './register';
import * as types from '../constants/ActionTypes';

describe('register reducer', () => {
  it('should handle initial state', () => {
    expect(
      register(undefined, {})
    ).toEqual({
      register: true,
      errors: null
    });
  });

  it('should handle TOGGLE_REGISTER', () => {
    expect(
      register({
        errors: {
          error1: 1,
          error2: 2
        },
        register: true
      }, {
        type: types.TOGGLE_REGISTER,
        change: false
      })
    ).toEqual({
      errors: {
        error1: 1,
        error2: 2
      },
      register: false
    });

    expect(
      register({
        errors: {
          error1: 1,
          error2: 2
        },
        register: false
      }, {
        type: types.TOGGLE_REGISTER,
        change: true
      })
    ).toEqual({
      errors: {
        error1: 1,
        error2: 2
      },
      register: true
    });
  });

  it('should handle ADD_REGISTER_ERRORS', () => {
    expect(
      register({
        errors: null,
        register: false
      }, {
        type: types.ADD_REGISTER_ERRORS,
        errors: {
          error1: 'Error 1',
          error2: 'Error 2'
        }
      })
    ).toEqual({
      errors: {
        error1: 'Error 1',
        error2: 'Error 2'
      },
      register: false
    });
  });
});
