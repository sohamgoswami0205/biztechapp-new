import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';

import apiMiddleware from '../middleware/api';

import rootReducer from '../reducers';

const middlewares = [apiMiddleware];
middlewares.push(createLogger());
const store = createStore(rootReducer, applyMiddleware(...middlewares));
window.store = store;
export default store;