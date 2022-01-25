import { REQUEST_SHIPS, RECEIVE_SHIPS, ADD_SHIP_FLEET, EDIT_SHIP_FLEET } from './actionTypes'

const initalState = {
  query: '',
  isFetching: false,
  data: {},
  error: '',
  fleet: []
}

export const ships = (state = initalState, action) => {
  switch (action.type) {
    case REQUEST_SHIPS:
      return Object.assign({}, state, {
        isFetching: true,
        query: action.query
      })
    case RECEIVE_SHIPS:
      return Object.assign({}, state, {
        isFetching: false,
        data: action.status === 'success' ? action.payload : initalState.data,
        error: action.status === 'error' ? action.payload : initalState.error
      })
    case ADD_SHIP_FLEET:
      return Object.assign({}, state, {
        fleet: [...state.fleet, action.payload]
      })
    case EDIT_SHIP_FLEET:
      return Object.assign({}, state, {
        fleet: [...state.fleet].map(ship => {
          if (ship.id === action.index){
            return action.payload
          }
          return ship;
        })
      })
    default:
      return state;
  }
}