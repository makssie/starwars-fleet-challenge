import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'

// Import your Module reducers here and combine them
import { ships } from './screens/home/reducers.js'

export default (history) => combineReducers({
  router: connectRouter(history),
  // rest of your reducers
  ships
});