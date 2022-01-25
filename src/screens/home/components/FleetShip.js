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
      secondaryAction={
        <IconButton>
          <AddIcon />
        </IconButton>
      }
    >
      <ListItemText primary={`Line item ${name}`} />
      </ListItem>

      {/* <Card> */}
        {/* {imageLinks
          ? <Card.Img variant="top" src={imageLinks.thumbnail} />
          : null
        } */}
       
          {/* <Card.Link href={infoLink} target="_blank" rel="noopener">Preview</Card.Link> */}
          {/* <Link className="book" to={`${starship.url}`}>View</Link> */}
      {/* </Card> */}
    </div>
  )
}

export default FleetShip;