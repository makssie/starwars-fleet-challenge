import { Box, Button, IconButton, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './shipDetail.css'
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { bindActionCreators } from 'redux'
import { editShipFleet } from '../../actions'
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/styles';
import ShipbarPassengers from './components/Shipbar';



const ShipDetail = ({ match: { params }, fleet , editShipFleet}) => 
{ 
  let history = useHistory();

  let { name, model, crew, passengers } = fleet[params.ID];

  let [progress, setProgress] = useState(0);
  let [crewState, setCrew] = useState(crew);


  useEffect(() => {
    const passengersNumber = transformPassengersNumber(passengers)
    setProgress(percentageOccupancy(crewState, passengersNumber))
  }, [crew, passengers, progress, crewState])

  const editCrewShip = (fleet, crewUpdated, index) => {
    const fleetUpdated = Object.assign(fleet, {
      crew: crewUpdated
    })
    editShipFleet(fleetUpdated, index)
  }

  return(
  <div id="shipDetail">
    <h1>Detail view</h1>
    <div className="shipDetail-container">
        <h3>{name}</h3>
        <h3>{model}</h3>
        <h4>Passengers: {crewState} </h4>
        <div>
          <Box sx={{ width: '50%', marginTop: 2 }}>
            <ShipbarPassengers value={progress} />
          </Box>
          <IconButton onClick={() => { setCrew(editPassengers(passengers, crewState, 'remove')) }}>
            <RemoveIcon/>
          </IconButton>
          <IconButton  onClick={() => { setCrew(editPassengers(passengers, crewState, 'add')) }}>
              <AddIcon/>
          </IconButton>
        </div>
        <div className="actionButtons">
          <Button onClick={() => { history.goBack() }}>Cancel</Button>
          <Button onClick={() => { editCrewShip(fleet[params.ID], crewState, params.ID)}}>Save</Button>
        </div>
    </div>
  </div>
)
}


function editPassengers(passengers, crew, action){
  let crewNumber = crew;
  if(typeof crew === 'string'){
    crewNumber = parseFloat(crew.replace(/,/g, ''));
  }
  if(passengers < crewNumber){
    return crewNumber
  }

  return action === 'add' ? crewNumber + 1 : crewNumber - 1
}


function transformPassengersNumber(passengers){
  let passengersNumber = Number(passengers);
  if(isNaN(passengers)) {
    passengersNumber = 0
  }

  if(passengersNumber === 0){
    return 100;
  }

  return passengersNumber;
};


function percentageOccupancy(crew, passengers){
  let crewNumber = crew;
  if(typeof crew === 'string'){
    crewNumber = parseFloat(crew.replace(/,/g, ''));
  }
  const percentageOccupancy = (100 *  crewNumber) / passengers;

  return percentageOccupancy > 100 ? 100 : percentageOccupancy
}


const mapStateToProps = (state) => {
  return {
    fleet: state.ships.fleet
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    editShipFleet,
  }, dispatch)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShipDetail);