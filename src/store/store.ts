import { createStore, applyMiddleware } from 'redux';
import reducer from './reducers/reducers';
import loggerMiddleware from './loggerMiddleware';

const store = createStore(reducer, applyMiddleware(loggerMiddleware));

export default store;
