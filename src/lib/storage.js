const handlersByName = {};
let currentStateName = null;

export const registerHandler = (name, getState, setState) => {
  if (getState) {
    handlersByName[name] = Object.assign({}, handlersByName[name], {getState});
  }
  if (setState) {
    handlersByName[name] = Object.assign({}, handlersByName[name], {setState});
  }
};

const localStorageName = handlerName => `${handlerName}__${currentStateName}`;

const callSaveHandler = handlerName => {
  const stateToSave = handlersByName[handlerName].getState();
  window.localStorage.setItem(localStorageName(handlerName), JSON.stringify(stateToSave));
};

const callLoadHandler = (handlerName) => {
  const stateToLoad = window.localStorage.getItem(localStorageName(handlerName));
  handlersByName[handlerName].setState(JSON.parse(stateToLoad));
};

export const save = (handlerName) => {
  if (!currentStateName) return;
  if (handlerName) callSaveHandler(handlerName);
  else Object.keys(handlersByName).forEach(handlerName => callSaveHandler(handlerName));
};

export const load = (stateName, handlerName) => {
  currentStateName = stateName;
  if (handlerName) callLoadHandler(handlerName);
  else Object.keys(handlersByName).forEach(handlerName => callLoadHandler(handlerName));
};
