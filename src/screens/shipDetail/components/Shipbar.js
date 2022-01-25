import { makeStyles } from "@material-ui/styles";
import { Box, LinearProgress } from "@mui/material";

const ShipbarPassengers = (props) => {
  const colorBar = getColor(props.value)
  
  const useStyles = makeStyles(() => ({
    root: {
        "& .MuiLinearProgress-colorPrimary": {
            backgroundColor: "#C8C8C8",
        },
        "& .MuiLinearProgress-barColorPrimary": {
            backgroundColor: colorBar,
        },
    },
}))

  const classes = useStyles();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }} className={classes.root}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
    </Box>
  );
}

function getColor(value){
  switch (true) {
    case value > 0 && value <= 40:
      return "green"
    case value > 40 && value <= 80:
      return "yellow"
    case value > 80:
     return "red"
    default:
      return null
  }
}

export default ShipbarPassengers;