import { configureStore } from '@reduxjs/toolkit';

import { rootReducer } from './reducers';

const configureReduxStore = (preloadedState) => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState,
  });
  return store;
};

export default configureReduxStore;
import { routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import { createRootReducer } from './reducers';

export const history = createBrowserHistory();

const rootReducer = createRootReducer(history);

const enhancer = composeWithDevTools(applyMiddleware(thunk, routerMiddleware(history)));

const configureStore = (preloadedState) => {
  const store = createStore(rootReducer, preloadedState, enhancer);
  return store;
};

export default configureStore;
