import * as types from '../constants/ActionTypes';
import axios from 'axios';
import {config} from '../constants/Config';

export function addTodo(text) {
  return {type: types.ADD_TODO, text};
}

export function deleteTodo(id) {
  return {type: types.DELETE_TODO, id};
}

export function editTodo(id, text) {
  return {type: types.EDIT_TODO, id, text};
}

export function completeTodo(id) {
  return {type: types.COMPLETE_TODO, id};
}

export function completeAll() {
  return {type: types.COMPLETE_ALL};
}

export function clearCompleted() {
  return {type: types.CLEAR_COMPLETED};
}

export function toggleRegister(change) {
  return {type: types.TOGGLE_REGISTER, change};
}

export function addServerResponse(errors) {
  return {type: types.ADD_REGISTER_ERRORS, errors};
}

export function toggleLogin(change) {
  return {type: types.TOGGLE_LOGIN, change};
}

export function addServerResponseLogin(errors) {
  return {type: types.ADD_LOGIN_ERRORS, errors};
}

export function setUSer(user) {
  localStorage.setItem('user', JSON.stringify(user));
  return {type: types.USER_LOGGED_IN, user}
}

export function getQuotes() {
  return (dispatch, getState) => {
    const user = getState().user;
    dispatch({
      type: types.FETCH_QUOTES,
      payload: axios.get(`${config.API_BASE}/users/${user.user.id}/quotes/`, {headers: {Authorization: user.auth_token}})
    });
  }
}