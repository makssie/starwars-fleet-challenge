import { createHashHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { routerMiddleware } from 'connected-react-router'
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReducer from './rootReducer'
import thunk from 'redux-thunk';
// Create history
export const history = createHashHistory();

const localStorageMiddleware = ({getState}) => {
  return (next) => (action) => {
      const result = next(action);
      localStorage.setItem('applicationState', JSON.stringify(
          getState()
      ));
      return result;
  };
};

const preloadedState = () => {
  const data = localStorage.getItem('applicationState');
  if (data) {
      return JSON.parse(data);
  }
  return undefined;
};

const store = createStore(
  createRootReducer(history), // Root reducer with router state
  preloadedState(),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunk,
      localStorageMiddleware
    ),
  )
)
export default store;
