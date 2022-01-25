import { Box, Button, IconButton, LinearProgress } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './shipDetail.css'
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { bindActionCreators } from 'redux'
import { editShipFleet } from '../../actions'
import { useHistory } from "react-router-dom";



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
    console.log(fleetUpdated)
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
            <LinearProgressWithLabel value={progress} />
          </Box>
          <IconButton onClick={() => { setCrew(removePassengers(passengers, crewState)) }}>
            <RemoveIcon/>
          </IconButton>
          <IconButton  onClick={() => { setCrew(addPassengers(passengers, crewState)) }}>
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


function addPassengers(passengers, crew){
  let crewNumber = crew;
  if(typeof crew === 'string'){
    crewNumber = parseFloat(crew.replace(/,/g, ''));
  }
  if(passengers < crewNumber){
    return crewNumber
  }
  crewNumber = crewNumber + 1
  return crewNumber;
}

function removePassengers(passengers, crew){
  let crewNumber = crew;
  if(typeof crew === 'string'){
    crewNumber = parseFloat(crew.replace(/,/g, ''));
  }
  if(crewNumber <= 0){
    return 0
  }

  crewNumber = crewNumber - 1
  return crewNumber;
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

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
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