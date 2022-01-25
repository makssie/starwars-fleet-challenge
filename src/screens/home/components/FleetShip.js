import { Box, IconButton } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import EditIcon from "@mui/icons-material/Edit";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import './fleetShip.css';

const FleetShip = ({ starship, selectedNumber}) => {
  let {
    name,
    model,
    crew,
    passengers
  } = starship;
  console.log(crew, passengers)
  const progress = percentageOccupancy(crew, passengers);
  return (
    <div className="fleetShip">
      <div>
        <IconButton>
          <EditIcon/>
        </IconButton>
      </div>
      <div className="fleetDetail">
        <div>{name}</div>
        <div>{model}</div>
        <Box sx={{ width: '100%' }}>
           <LinearProgressWithLabel value={progress} />
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

  const crewNumber = parseFloat(crew.replace(/,/g, ''));

  const percentageOccupancy = (100 *  crewNumber) / passengersNumber;

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



export default FleetShip;