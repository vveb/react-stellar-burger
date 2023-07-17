import { compose, createStore } from 'redux';
import rootReducer from './reducers';
// import { applyMiddleware } from 'redux'; потому что убрал из импорта как неиспользуемое

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers();
const store = createStore(rootReducer, enhancer);

export default store;