import * as types from '../constants/ActionTypes';
import axios from 'axios';
import {config} from '../constants/Config';
import uuid from 'uuid/v4';

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

export function logout() {
  return (dispatch, getState) => {
    const user = getState().user;
    dispatch({
      type: types.LOGOUT,
      payload: axios.delete(`${config.API_BASE}/users/sign_out/`, {headers: {Authorization: user.auth_token}})
    });
  }
}

export function setUSer(user) {
  localStorage.setItem('user', JSON.stringify(user));
  return {type: types.USER_LOGGED_IN, user}
}

export function getQuotes(by = '') {
  return (dispatch, getState) => {
    const user = getState().user;
    dispatch({
      type: types.FETCH_QUOTES,
      payload: axios.get(`${config.API_BASE}/users/${user.user.id}/quotes/?${by}`, {headers: {Authorization: user.auth_token}})
    });
  }
}

export function setTitle(element, newValue) {
  return (dispatch, getState) => {
    const quote = getState().quote.concat([]);
    for(let quoteElement of quote){
      if(quoteElement.id === element.id) {
        quoteElement.content.title.value = newValue;
      }
    }

    dispatch({type: types.CHANGE_QUOTE, quote});
  }
}

export function setText(element, newValue) {
  return (dispatch, getState) => {
    const quote = getState().quote.concat([]);
    for(let quoteElement of quote){
      if(quoteElement.id === element.id) {
        quoteElement.content.text.value = newValue;
      }
    }

    dispatch({type: types.CHANGE_QUOTE, quote});
  }
}

export function setBullet(type, element, listItem, newValue) {
  return (dispatch, getState) => {
    const quote = getState().quote.concat([]);
    for(let quoteElement of quote){
      if(quoteElement.id === element.id) {
        for(let item of quoteElement.content[type].value) {
          if(listItem.id === item.id) {
            item.value = newValue;
            return dispatch({type: types.CHANGE_QUOTE, quote});
          }
        }
      }
    }
  }
}

export function setCalendarItem(element, values) {
  return (dispatch, getState) => {
    const quote = getState().quote.concat([]);
    for(let quoteElement of quote) {
      if(quoteElement.id === element.id) {
        for(let item of quoteElement.content.calendar.value) {
          if(values.id === item.id) {
            item.concept = values.concept;
            item.from = values.from;
            item.to = values.to;
            return dispatch({type: types.CHANGE_QUOTE, quote});
          }
        }
      }
    }
  }
}

export function setPriceItem(element, values) {
  return (dispatch, getState) => {
    const quote = getState().quote.concat([]);
    for(let quoteElement of quote) {
      if(quoteElement.id === element.id) {
        for(let item of quoteElement.content.price.value) {
          if(values.id === item.id) {
            item.concept = values.concept;
            item.price = values.price;
            return dispatch({type: types.CHANGE_QUOTE, quote});
          }
        }
      }
    }
  }
}

export function addBullet(type, element, subElement, values, action) {
  return (dispatch, getState) => {
    const quote = getState().quote.concat([]);
    for(let quoteElement of quote) {
      if(quoteElement.id === element.id) {

        let n = 0;
        for(let item of quoteElement.content[type].value){
          if(item.id === subElement.id) {
            break;
          }
          n++;
        }
        if(type === 'calendar' || type === 'price') {
          if (action === 'down') {
            quoteElement.content[type].value.splice(n + 1, 0, {
              ...values,
              id: uuid(),
              comments: []
            });
          } else {
            quoteElement.content[type].value.splice(n, 0, {
              ...values,
              id: uuid(),
              comments: []
            });
          }
        } else {
          if (action === 'down') {
            quoteElement.content[type].value.splice(n + 1, 0, {
              value: values.value,
              id: uuid(),
              comments: []
            });
          } else {
            quoteElement.content[type].value.splice(n, 0, {
              value: values.value,
              id: uuid(),
              comments: []
            });
          }
        }
        return dispatch({type: types.CHANGE_QUOTE, quote});
      }
    }
  }
}

export function moveBullet(type, element, subElement, action) {
  return (dispatch, getState) => {
    const quote = getState().quote.concat([]);
    for(let quoteElement of quote) {
      if(quoteElement.id === element.id) {
        let n = 0;
        for(let item of quoteElement.content[type].value){
          if(item.id === subElement.id) {
            break;
          }
          n++;
        }

        if(n == 0 && action === 'up') {
          return dispatch({type: types.CHANGE_QUOTE, quote});
        } else if(n == quoteElement.content[type].value.length && action === 'down') {
          return dispatch({type: types.CHANGE_QUOTE, quote});
        }

        if(action === 'down') {
          const removed = quoteElement.content[type].value.splice(n, 1)[0];
          quoteElement.content[type].value.splice(n + 1, 0, removed);
        } else {
          const removed = quoteElement.content[type].value.splice(n, 1)[0];
          quoteElement.content[type].value.splice(n - 1, 0, removed);
        }
        return dispatch({type: types.CHANGE_QUOTE, quote});
      }
    }
  }
}

export function removeBullet(type, element, subElement) {
  return (dispatch, getState) => {
    const quote = getState().quote.concat([]);
    for(let quoteElement of quote) {
      if(quoteElement.id === element.id) {
        let n = 0;
        for(let item of quoteElement.content[type].value){
          if(item.id === subElement.id) {
            break;
          }
          n++;
        }
        quoteElement.content[type].value.splice(n, 1);
        return dispatch({type: types.CHANGE_QUOTE, quote});
      }
    }
  }
}

export function moveSection(element, direction) {
  return (dispatch, getState) => {
    const quote = getState().quote.concat([]);

  }
}