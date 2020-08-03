import {createContext} from 'react';

const initialState = {
  token: null,
  setToken: () => {}
};

export default createContext(initialState);
