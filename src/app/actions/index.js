import * as types from '../constants/ActionTypes';
import axios from 'axios';

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

export function doLogin(email, password) {
  return {
    type: types.DO_LOGIN,
    payload: axios.post('http://192.168.99.100:3000/auth/login', {
      email: email,
      password: password
    })
  }
}