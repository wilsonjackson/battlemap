import {createContext} from 'react';

const subscribers = new Set();

export function sub(fn) {
  subscribers.add(fn);
}

export function unsub(fn) {
  subscribers.delete(fn);
}

export function pub(event, ...data) {
  subscribers.forEach(s => s[event] && s[event](data));
}

const initialState = {
  token: null,
  setToken: () => {}
};

export default createContext(initialState);
