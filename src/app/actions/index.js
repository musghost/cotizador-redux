import * as types from '../constants/ActionTypes';
import axios from 'axios';
import {config} from '../constants/Config';
import uuid from 'uuid/v4';
import {browserHistory} from 'react-router';
import moment from 'moment';

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
  localStorage.removeItem('user');
  browserHistory.push('/');
  return {type: types.LOGOUT}
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
    const quote = getState().quote.quote.concat([]);
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
    const quote = getState().quote.quote.concat([]);
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
    const quote = getState().quote.quote.concat([]);
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
    const quote = getState().quote.quote.concat([]);
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
    const quote = getState().quote.quote.concat([]);
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
    const quote = getState().quote.quote.concat([]);
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
    const quote = getState().quote.quote.concat([]);
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
    const quote = getState().quote.quote.concat([]);
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
    const quote = getState().quote.quote.concat([]);
    let n = 0;
    for(let quoteElement of quote) {
      if(quoteElement.id === element.id) {
        if(direction === 'up' && n > 0) {
          const removed = quote.splice(n, 1)[0];
          quote.splice(n - 1, 0, removed);
        } else if(direction === 'down' && n < (quote.length - 1)) {
          const removed = quote.splice(n, 1)[0];
          quote.splice(n + 1, 0, removed);
        }
        return dispatch({type: types.CHANGE_QUOTE, quote});
      }
      n++;
    }
  }
}

export function getUsers(by = '') {
  return (dispatch, getState) => {
    const user = getState().user;
    dispatch({
      type: types.FETCH_USERS,
      payload: axios.get(`${config.API_BASE}/users`, {headers: {Authorization: user.auth_token}})
    });
  }
}

export function getQuote(id) {
  return (dispatch, getState) => {
    const user = getState().user;
    dispatch({
      type: types.FETCH_QUOTE,
      payload: axios.get(`${config.API_BASE}/quotes/${id}`, {headers: {Authorization: user.auth_token}})
    });
  }
}

export function saveQuote(id, quote) {
  return (dispatch, getState) => {
    const user = getState().user;
    dispatch({
      type: types.SAVE_QUOTE,
      payload: axios.patch(`${config.API_BASE}/quotes/${id}/`, quote, {headers: {Authorization: user.auth_token}})
    });
  }
}

function setComments(quoteElement, element, id, dispatch) {
  const nodeTypes = {
    text: ['title', 'text'],
    list: ['title', 'text', 'list'],
    images: ['title', 'text', 'images'],
    calendar: ['title', 'calendar'],
    price: ['title', 'text', 'price']
  };

  const dispatchObj = {
    type: types.SET_CURRENT_COMMENTS,
    payload: {
      element: {
        elementId: element.id,
        type: element.type
      },
      id
    }
  };

  for(const type of nodeTypes[element.type]) {
    if(['list', 'images', 'calendar', 'price'].indexOf(type) >= 0){
      for(const item of quoteElement.content[type].value) {
        if(item.id === id) {
          dispatchObj.payload.comments = item.comments;
          return dispatch(dispatchObj);
        }
      }
    } else {
      if(quoteElement.content[type].id === id) {
        dispatchObj.payload.comments = quoteElement.content[type].comments;
        return dispatch(dispatchObj);
      }
    }
  }
}

export function setCurrentComments(element, id) {
  return (dispatch, getState) => {
     const quote = getState().quote.quote.concat([]);
     for(let quoteElement of quote) {
      if(quoteElement.id === element.id) {
        setComments(quoteElement, element, id, dispatch);
      }
     }
  }
}

export function leaveComment(idQuote, element, id, text) {
  return (dispatch, getState) => {
    const currentState = getState();
    const quote = currentState.quote.quote.concat([]);
    const user = currentState.user;
    for(let quoteElement of quote) {
      if(quoteElement.id === element.elementId) {
        const nodeTypes = {
          text: ['title', 'text'],
          list: ['title', 'text', 'list'],
          images: ['title', 'text', 'images'],
          calendar: ['title', 'calendar'],
          price: ['title', 'text', 'price']
        };

        for(const type of nodeTypes[element.type]) {
          if(['list', 'images', 'calendar', 'price'].indexOf(type) >= 0){
            for(const item of quoteElement.content[type].value) {
              if(item.id === id) {
                item.comments.push({
                  date: moment().format('YYYY-MM-DD HH:mm:ss'),
                  from: {
                    name: user.user.email,
                    userId: user.user.id
                  },
                  id: uuid(),
                  value: text
                });
                dispatch({type: types.CHANGE_QUOTE, quote});
                return dispatch({
                  type: types.SAVE_QUOTE,
                  payload: axios.patch(`${config.API_BASE}/quotes/${idQuote}/`, {content: {quote}}, {headers: {Authorization: user.auth_token}})
                });
              }
            }
          } else {
            if(quoteElement.content[type].id === id) {
              quoteElement.content[type].comments.push({
                date: moment().format('YYYY-MM-DD HH:mm:ss'),
                from: {
                  name: user.user.email,
                  userId: user.user.id
                },
                id: uuid(),
                value: text
              });
              dispatch({type: types.CHANGE_QUOTE, quote});
              return dispatch({
                type: types.SAVE_QUOTE,
                payload: axios.patch(`${config.API_BASE}/quotes/${idQuote}/`, {content: {quote}}, {headers: {Authorization: user.auth_token}})
              });
            }
          }
        }
      }
    }
  }
}

export function clearComments() {
  return {type: types.CLEAR_CURRENT_COMMENTS};
}
