import { Box, Button, IconButton, LinearProgress } from '@mui/material';
import React from 'react';
import { connect } from 'react-redux';
import './shipDetail.css'
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";



const ShipDetail = ({ match: { params }, fleet }) => 
{ 
  let { name, model, crew, passengers } = fleet[params.ID];

  const progress = percentageOccupancy(crew, passengers)
  return(
  <div id="shipDetail">
    <h1>Detail view</h1>
    <div className="shipDetail-container">
        <h3>{name}</h3>
        <h3>{model}</h3>
        <div>
          <Box sx={{ width: '50%', marginTop: 15 }}>
            <LinearProgressWithLabel value={progress} />
          </Box>
          <IconButton>
            <RemoveIcon/>
          </IconButton>
          <IconButton>
              <AddIcon/>
          </IconButton>
        </div>
        <div className="actionButtons">
          <Button>Cancel</Button>
          <Button>Save</Button>
        </div>
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

const mapStateToProps = (state) => {
  return {
    fleet: state.ships.fleet
  }
}

export default connect(
  mapStateToProps,
  null
)(ShipDetail);