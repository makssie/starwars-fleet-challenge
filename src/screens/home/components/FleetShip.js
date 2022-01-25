import { Card, IconButton, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import AddIcon from "@mui/icons-material/Add";

const FleetShip = ({ starship }) => {
  let {
    name,
    model,
    crew,
    passengers
  } = starship;
  return (
    <div className="ship">
      <ListItem
      key={name}
      disableGutters
    >
      <ListItemText primary={`Line item ${name}`} />
      </ListItem>
    </div>
  )
}

export default FleetShip;