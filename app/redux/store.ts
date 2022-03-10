import {applyMiddleware, compose, createStore} from 'redux';
import {rootReducer} from './reducers/rootReducer';

// Redux doesn't have any types for this extension
const composeEnhancers = compose;

const Store = createStore(
  rootReducer,
  compose(applyMiddleware(thunk), composeEnhancers && composeEnhancers()),
);

export default Store;
