import { Box, IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import './fleetShip.css';
import ShipbarPassengers from '../../shipDetail/components/Shipbar';

const FleetShip = ({ starship, selectedNumber}) => {
  let {
    name,
    model,
    crew,
    passengers
  } = starship;
  const progress = percentageOccupancy(crew, passengers);
  return (
    <div className="fleetShip">
      <div>
        <IconButton>
          <Link className="book" to={`shipDetail/${selectedNumber}`}>
            <EditIcon/>
          </Link>
        </IconButton>
      </div>
      <div className="fleetDetail">
        <div>{name}</div>
        <div>{model}</div>
        <Box sx={{ width: '100%' }}>
           <ShipbarPassengers value={progress} />
        </Box>
      </div>
    </div>
  )
}

function percentageOccupancy(crew, passengers){
  let passengersNumber = passengers;

  
  if(isNaN(passengers)) {
    passengersNumber = 0
  }

  if(passengersNumber === 0){
    return 100;
  }

  let crewNumber = crew;
  if(typeof crew === 'string'){
    crewNumber = parseFloat(crew.replace(/,/g, ''));
  }
  
  const percentageOccupancy = (100 *  crewNumber) / passengersNumber;

  return percentageOccupancy > 100 ? 100 : percentageOccupancy
}



export default FleetShip;