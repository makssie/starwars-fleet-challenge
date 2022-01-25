import axios from 'axios'
import {
  REQUEST_SHIPS,
  RECEIVE_SHIPS,
  ADD_SHIP_FLEET,
  EDIT_SHIP_FLEET
} from './actionTypes'
import { useHistory } from "react-router-dom";


export const requestShips = (query) => ({
  type: REQUEST_SHIPS,
  query
})

export const receiveShips = ({status, payload }) => ({
  type: RECEIVE_SHIPS,
  status,
  payload
})

export const addShip = ( payload ) => ({
  type: ADD_SHIP_FLEET,
  payload
});

export const editShip = (payload, index) => ({
  type: EDIT_SHIP_FLEET,
  index,
  payload
})

export const editShipFleet = (ship, index) => {
  return function(dispatch) {
    dispatch(editShip(ship, index))
    alert("Successfully passengers saved")

  }
}

export const addShipFleet = (ship, index) => {
  return function(dispatch) {
    dispatch(addShip({ ...ship, id: index }))
  }
};

export const getShips = (query) => {
  return function (dispatch) {
  	dispatch(requestShips(query));
  	const url = `https://swapi.dev/api/starships/?search=${query}`
  	return axios.get(url)
    .then(response => {
      dispatch(receiveShips({
        status: 'success',
        payload: response.data
      }))
    })
    .catch(error => {
      dispatch(receiveShips({
        status: 'error',
        payload: error
      }))
    })
  };
}