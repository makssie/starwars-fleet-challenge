import { Card, IconButton, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";
import { addShipFleet } from '../actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';

const Ship = ({ addShipFleet, ship, fleet }) => {
  let {
    name,
    model,
    crew,
    passengers
  } = ship;

  const addShip = (starShipSelected) => {
    console.log("starShipSelected", starShipSelected)
    addShipFleet(starShipSelected, fleet.length +1)  
  }

  return (
    <div className="ship">
      <ListItem
      key={name}
      disableGutters
      secondaryAction={
        <IconButton onClick={() => { addShip(ship) }}>
          <AddIcon/>
        </IconButton>
      }
    >
      <ListItemText primary={`${name} - ${model}`} />
      </ListItem>

    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    fleet: state.ships.fleet
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addShipFleet,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Ship);